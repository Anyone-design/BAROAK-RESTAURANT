import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Flame, Wine, Leaf } from 'lucide-react';
import { DietaryType } from '@/types/menu';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'veg' | 'non-veg' | 'chef' | 'spicy' | 'alcohol' | 'glass';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full tracking-wide transition-all';
  
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1',
  };

  const variants = {
    default: 'bg-charcoal-800 text-slate-300 border border-white/10',
    gold: 'bg-gold-500/15 text-gold-400 border border-gold-500/30',
    veg: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30',
    'non-veg': 'bg-rose-950/60 text-rose-400 border border-rose-500/30',
    chef: 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10',
    spicy: 'bg-red-950/60 text-red-400 border border-red-500/30',
    alcohol: 'bg-purple-950/60 text-purple-300 border border-purple-500/30',
    glass: 'bg-white/10 text-white/90 border border-white/15 backdrop-blur-md',
  };

  return (
    <span className={cn(baseStyles, sizes[size], variants[variant], className)} {...props}>
      {children}
    </span>
  );
};

export const DietaryBadge: React.FC<{ type: DietaryType; size?: 'sm' | 'md' }> = ({ type, size = 'sm' }) => {
  switch (type) {
    case 'veg':
      return (
        <Badge variant="veg" size={size} title="Vegetarian">
          <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block ring-2 ring-emerald-900" />
          <span>Veg</span>
        </Badge>
      );
    case 'non-veg':
      return (
        <Badge variant="non-veg" size={size} title="Non-Vegetarian">
          <span className="h-2 w-2 rounded-full bg-rose-500 inline-block ring-2 ring-rose-900" />
          <span>Non-Veg</span>
        </Badge>
      );
    case 'chef-special':
      return (
        <Badge variant="chef" size={size} title="Chef's Signature Recommendation">
          <Sparkles className="h-3 w-3 text-amber-300 fill-amber-300/30" />
          <span>Chef's Special</span>
        </Badge>
      );
    case 'spicy':
      return (
        <Badge variant="spicy" size={size} title="Spicy Dish">
          <Flame className="h-3 w-3 text-red-400 fill-red-400/30" />
          <span>Spicy</span>
        </Badge>
      );
    case 'contains-alcohol':
      return (
        <Badge variant="alcohol" size={size} title="Contains Alcohol">
          <Wine className="h-3 w-3 text-purple-300" />
          <span>Craft Spirit</span>
        </Badge>
      );
    case 'gluten-free':
      return (
        <Badge variant="glass" size={size} title="Gluten-Free">
          <Leaf className="h-3 w-3 text-emerald-300" />
          <span>Gluten Free</span>
        </Badge>
      );
    default:
      return null;
  }
};
