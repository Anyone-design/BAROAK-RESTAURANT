import React from 'react';
import { MenuItem } from '@/types/menu';
import { Modal } from '@/components/ui/Modal';
import { DietaryBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Heart, Check, Wine } from 'lucide-react';

interface DishModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (item: MenuItem) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  item,
  isOpen,
  onClose,
  isSaved = false,
  onToggleSave,
}) => {
  const [displayItem, setDisplayItem] = React.useState<MenuItem | null>(item);

  React.useEffect(() => {
    if (item) {
      setDisplayItem(item);
    }
  }, [item]);

  if (!displayItem) return null;

  const currentItem = displayItem;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      noPadding
      className="p-0 overflow-hidden border-gold-500/30 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column: Image with overlays */}
        <div className="relative h-64 md:h-full min-h-[300px] bg-charcoal-950 overflow-hidden">
          <img
            src={currentItem.image}
            alt={currentItem.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-black/30" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {currentItem.badge && (
              <span className="bg-gold-500 text-obsidian-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {currentItem.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-2xl font-bold font-display text-gold-300">
              {formatCurrency(currentItem.price)}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-300 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
              Freshly Prepared
            </span>
          </div>
        </div>

        {/* Right Column: Dish Details & Story */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-charcoal-900">
          <div className="space-y-4">
            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {currentItem.dietary.map((tag) => (
                <DietaryBadge key={tag} type={tag} size="sm" />
              ))}
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                {currentItem.name}
              </h2>
              <p className="text-xs uppercase tracking-widest text-gold-400/80 font-semibold mt-1">
                BAROAK Signature Selection
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-gold-500/40 pl-3 italic">
              "{currentItem.description}"
            </p>

            {/* Flavor Profile */}
            {currentItem.flavorProfile && currentItem.flavorProfile.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Flavor Profile
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentItem.flavorProfile.map((note) => (
                    <span
                      key={note}
                      className="text-xs bg-white/5 border border-white/10 text-slate-200 px-2.5 py-1 rounded-lg"
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Ingredients */}
            {currentItem.ingredients && currentItem.ingredients.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Artisanal Ingredients
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {currentItem.ingredients.join(' • ')}
                </p>
              </div>
            )}

            {/* Sommelier / Cocktail Pairing Recommendation */}
            {currentItem.pairing && (
              <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300 flex items-start gap-2.5">
                <Wine className="h-4 w-4 shrink-0 mt-0.5 text-gold-400" />
                <div>
                  <span className="font-semibold block text-gold-200">Recommended Pairing</span>
                  <span className="text-slate-300">{currentItem.pairing}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            {onToggleSave && (
              <Button
                variant={isSaved ? 'gold' : 'outline'}
                size="md"
                className="w-full flex-1"
                onClick={() => onToggleSave(currentItem)}
              >
                {isSaved ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    In Your Tasting List
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-1.5" />
                    Add to Tasting List
                  </>
                )}
              </Button>
            )}
            <Button
              variant="glass"
              size="md"
              onClick={onClose}
              className="px-5"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
