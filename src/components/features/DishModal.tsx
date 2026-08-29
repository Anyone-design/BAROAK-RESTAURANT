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
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      className="p-0 overflow-hidden border-gold-500/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column: Image with overlays */}
        <div className="relative h-64 md:h-full min-h-[280px] bg-charcoal-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/40" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.badge && (
              <span className="bg-gold-500 text-obsidian-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {item.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-2xl font-bold font-display text-gold-300">
              {formatCurrency(item.price)}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-300 bg-black/50 px-2.5 py-1 rounded backdrop-blur-md">
              Freshly Prepared
            </span>
          </div>
        </div>

        {/* Right Column: Dish Details & Story */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-charcoal-900">
          <div className="space-y-4">
            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {item.dietary.map((tag) => (
                <DietaryBadge key={tag} type={tag} size="sm" />
              ))}
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                {item.name}
              </h2>
              <p className="text-xs uppercase tracking-widest text-gold-400/80 font-semibold mt-1">
                BAROAK Signature Selection
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-gold-500/40 pl-3 italic">
              "{item.description}"
            </p>

            {/* Flavor Profile */}
            {item.flavorProfile && item.flavorProfile.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Flavor Profile
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.flavorProfile.map((note) => (
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
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Artisanal Ingredients
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.ingredients.join(' • ')}
                </p>
              </div>
            )}

            {/* Sommelier / Cocktail Pairing Recommendation */}
            {item.pairing && (
              <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300 flex items-start gap-2.5">
                <Wine className="h-4 w-4 shrink-0 mt-0.5 text-gold-400" />
                <div>
                  <span className="font-semibold block text-gold-200">Recommended Pairing</span>
                  <span className="text-slate-300">{item.pairing}</span>
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
                onClick={() => onToggleSave(item)}
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
