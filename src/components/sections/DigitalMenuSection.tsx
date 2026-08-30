import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuData, MenuItem, DietaryType } from '@/types/menu';
import { DietaryBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  Search,
  X,
  Sparkles,
  Flame,
  Wine,
  Utensils,
  Pizza,
  Soup,
  Heart,
  Eye,
} from 'lucide-react';

interface DigitalMenuSectionProps {
  menuData: MenuData;
  onOpenDishModal: (item: MenuItem) => void;
  savedItemIds: Set<string>;
  onToggleSaveItem: (item: MenuItem) => void;
}

export const DigitalMenuSection: React.FC<DigitalMenuSectionProps> = ({
  menuData,
  onOpenDishModal,
  savedItemIds,
  onToggleSaveItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const PREVIEW_LIMIT = 3;

  // Category Icon Mapping
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'cocktails':
        return Wine;
      case 'starters':
        return Utensils;
      case 'woodfired':
        return Pizza;
      case 'dimsum':
        return Soup;
      case 'mains':
        return Flame;
      case 'desserts':
        return Sparkles;
      default:
        return Utensils;
    }
  };

  // Reset expansion when category or filter changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setIsExpanded(false);
  };

  const handleDietaryChange = (dietId: DietaryType | 'all') => {
    setDietaryFilter(dietId);
    setIsExpanded(false);
  };

  // Filter items based on Category, Dietary tag, and Search Query
  const filteredItems = useMemo(() => {
    return menuData.items.filter((item) => {
      // Category check
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      // Dietary tag check
      const matchesDietary =
        dietaryFilter === 'all' || item.dietary.includes(dietaryFilter);

      // Search Query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.flavorProfile &&
          item.flavorProfile.some((f) => f.toLowerCase().includes(q))) ||
        (item.ingredients &&
          item.ingredients.some((ing) => ing.toLowerCase().includes(q)));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [menuData.items, activeCategory, dietaryFilter, searchQuery]);

  // Determine items to display based on preview vs expanded
  const isSearching = searchQuery.trim().length > 0;
  const displayedItems = useMemo(() => {
    if (isSearching || isExpanded || filteredItems.length <= PREVIEW_LIMIT) {
      return filteredItems;
    }
    return filteredItems.slice(0, PREVIEW_LIMIT);
  }, [filteredItems, isExpanded, isSearching]);

  const hasMoreItems = !isSearching && !isExpanded && filteredItems.length > PREVIEW_LIMIT;
  const remainingCount = filteredItems.length - PREVIEW_LIMIT;

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title & Description */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs uppercase tracking-widest text-gold-400 font-bold">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive Culinary Repertoire
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          Crafted with Passion & Charcoal Hearth
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From oak-smoked bourbon concoctions to 48-hour fermented sourdough pizzas and slow-braised Awadhi curries. Click any creation to view its flavor profile and pairings.
        </p>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/10 mb-8">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all shrink-0 ${
            activeCategory === 'all'
              ? 'bg-gold-500 text-obsidian-950 shadow-lg shadow-gold-500/20'
              : 'bg-charcoal-900/80 text-slate-300 hover:text-white hover:bg-charcoal-800 border border-white/5'
          }`}
        >
          <span>All Creations</span>
          <span className="text-[10px] opacity-75">({menuData.items.length})</span>
        </button>

        {menuData.categories.map((cat) => {
          const Icon = getCategoryIcon(cat.id);
          const count = menuData.items.filter((i) => i.category === cat.id).length;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-gold-500 text-obsidian-950 shadow-lg shadow-gold-500/20'
                  : 'bg-charcoal-900/80 text-slate-300 hover:text-white hover:bg-charcoal-800 border border-white/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search & Dietary Filter Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Dietary Preference Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Diets' },
            { id: 'veg', label: 'Vegetarian Only' },
            { id: 'non-veg', label: 'Non-Vegetarian' },
            { id: 'chef-special', label: "Chef's Specials ⭐" },
            { id: 'spicy', label: 'Spicy 🔥' },
          ].map((filter) => {
            const isSelected = dietaryFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => handleDietaryChange(filter.id as any)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-white/20 border-gold-400 text-gold-300 font-bold shadow-sm'
                    : 'bg-charcoal-900/60 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search dish, flavor, ingredient..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full bg-charcoal-900/80 border border-white/10 rounded-full pl-9 pr-9 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dish Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 px-4 bg-charcoal-900/40 rounded-3xl border border-white/5">
          <Utensils className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No creations match your filters</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try resetting your dietary tags or search terms to discover our full menu.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveCategory('all');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="mt-4"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedItems.map((dish) => {
                const isSaved = savedItemIds.has(dish.id);

                return (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="group relative rounded-3xl bg-charcoal-900/90 border border-white/10 dish-card-hover active:scale-[0.98] flex flex-col justify-between overflow-hidden cursor-pointer gpu-layer transition-transform duration-150"
                    onClick={() => onOpenDishModal(dish)}
                  >
                    {/* Top Image Container */}
                    <div className="relative h-52 w-full overflow-hidden bg-charcoal-950">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover object-center sm:group-hover:scale-105 transition-transform duration-500 brightness-90 sm:group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />

                      {/* Badge */}
                      {dish.badge && (
                        <div className="absolute top-3.5 left-3.5">
                          <span className="bg-obsidian-950/80 backdrop-blur-md text-gold-300 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            {dish.badge}
                          </span>
                        </div>
                      )}

                      {/* Heart Save Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSaveItem(dish);
                        }}
                        className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md border transition-colors ${
                          isSaved
                            ? 'bg-gold-500 text-obsidian-950 border-gold-400'
                            : 'bg-black/50 text-white/80 border-white/10 hover:text-gold-300 hover:bg-black/70 active:scale-90'
                        }`}
                        title={isSaved ? 'Remove from Tasting List' : 'Add to Tasting List'}
                      >
                        <Heart className={`h-4 w-4 ${isSaved ? 'fill-obsidian-950' : ''}`} />
                      </button>

                      {/* Price Overlay */}
                      <div className="absolute bottom-3 right-3.5 bg-obsidian-950/85 backdrop-blur-md border border-white/10 px-3 py-1 rounded-xl">
                        <span className="text-sm font-bold font-display text-gold-300">
                          {formatCurrency(dish.price)}
                        </span>
                      </div>
                    </div>

                    {/* Card Details Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Dietary Badges */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {dish.dietary.map((tag) => (
                            <DietaryBadge key={tag} type={tag} size="sm" />
                          ))}
                        </div>

                        {/* Name */}
                        <h3 className="text-base font-display font-bold text-white sm:group-hover:text-gold-300 transition-colors leading-snug line-clamp-1">
                          {dish.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Flavor notes & View Action */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        {dish.flavorProfile && dish.flavorProfile.length > 0 ? (
                          <span className="text-[11px] text-gold-400/90 font-medium truncate max-w-[70%]">
                            ✦ {dish.flavorProfile[0]}
                          </span>
                        ) : (
                          <span />
                        )}

                        <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 sm:group-hover:text-gold-300 transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                          Details
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Explore More / Show Less Controls */}
          {hasMoreItems && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-2"
            >
              <div className="relative inline-flex flex-col items-center">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-gold-500/40 hover:border-gold-400 text-white hover:text-gold-300 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-black/60 hover:shadow-gold-500/10 transition-all duration-300 active:scale-95"
                >
                  <span className="h-2 w-2 rounded-full bg-gold-400 animate-ping inline-block" />
                  <span>Explore More Creations ({remainingCount} more)</span>
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-[11px]">
                    +{remainingCount}
                  </span>
                  <Eye className="h-4 w-4 text-gold-400 group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-[11px] text-slate-400 mt-2.5">
                  Showing 3 of {filteredItems.length} dishes in this selection
                </p>
              </div>
            </motion.div>
          )}

          {!hasMoreItems && !isSearching && filteredItems.length > PREVIEW_LIMIT && isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center pt-4"
            >
              <button
                onClick={() => {
                  setIsExpanded(false);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) {
                    const top = menuEl.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all font-medium"
              >
                <span>Show Fewer Dishes (Collapse)</span>
                <span className="text-gold-400">↑</span>
              </button>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
};
