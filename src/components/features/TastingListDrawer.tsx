import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { X, Trash2, Heart, Utensils, Calendar } from 'lucide-react';

interface TastingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onOpenDishModal: (item: MenuItem) => void;
  onScrollToReservation: () => void;
}

export const TastingListDrawer: React.FC<TastingListDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onOpenDishModal,
  onScrollToReservation,
}) => {
  const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-charcoal-900 border-l border-gold-500/20 shadow-2xl h-full flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gold-500/10 text-gold-400">
                  <Heart className="h-5 w-5 fill-gold-400" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Your Curated Tasting List
                  </h3>
                  <p className="text-xs text-slate-400">
                    {items.length} {items.length === 1 ? 'selection' : 'selections'} saved
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                  <Utensils className="h-12 w-12 text-slate-600 stroke-[1.5]" />
                  <p className="text-sm text-slate-300 font-medium">
                    Your Tasting Tray is Empty
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Explore our digital menu and tap "Add to Tasting List" to curate your personalized culinary journey.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
                    <span>Saved Dishes & Cocktails</span>
                    <button
                      onClick={onClearAll}
                      className="text-rose-400 hover:underline text-[11px]"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map((dish) => (
                    <div
                      key={dish.id}
                      className="flex items-start gap-3.5 p-3 rounded-2xl bg-charcoal-800/60 border border-white/5 hover:border-gold-500/30 transition-all group"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        onClick={() => {
                          onClose();
                          onOpenDishModal(dish);
                        }}
                        className="h-16 w-16 rounded-xl object-cover cursor-pointer shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            onClose();
                            onOpenDishModal(dish);
                          }}
                          className="text-xs sm:text-sm font-bold text-white truncate cursor-pointer hover:text-gold-300 transition-colors"
                        >
                          {dish.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-gold-400">
                            {formatCurrency(dish.price)}
                          </span>
                        </div>
                        {dish.flavorProfile && dish.flavorProfile.length > 0 && (
                          <div className="text-[10px] text-slate-400 truncate mt-1">
                            ✦ {dish.flavorProfile.slice(0, 2).join(' • ')}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(dish.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-charcoal-950 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Estimated Tasting Bill</span>
                  <span className="text-xl font-bold font-display text-gold-300">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  💡 Present this curated list to your BAROAK host or server when seated for bespoke table sequencing.
                </p>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onClose();
                    onScrollToReservation();
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reserve Table for this Tasting
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
