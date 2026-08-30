import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryItem } from '@/types/restaurant';
import { Modal } from '@/components/ui/Modal';
import { Sparkles, Maximize2, Wine, Trees, Armchair, Flame } from 'lucide-react';

interface VibeShowcaseSectionProps {
  gallery: GalleryItem[];
}

export const VibeShowcaseSection: React.FC<VibeShowcaseSectionProps> = ({
  gallery,
}) => {
  const [selectedVibe, setSelectedVibe] = useState<GalleryItem | null>(null);

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('interior')) return Armchair;
    if (category.toLowerCase().includes('cocktail')) return Wine;
    if (category.toLowerCase().includes('outdoor')) return Trees;
    return Flame;
  };

  return (
    <section id="vibe" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Title & Philosophy */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs uppercase tracking-widest text-gold-400 font-bold">
          <Sparkles className="h-3.5 w-3.5" />
          The Atmosphere & Spatial Design
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          An Unhurried Sensory Sanctuary
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Designed to counter the loud neon dining trends of NCR. BAROAK layers warm oak timbers, handcrafted leather seating, subtle amber candlelight, and an open-air foliage courtyard.
        </p>
      </div>

      {/* Visual Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {gallery.map((item, idx) => {
          // Dynamic bento grid sizing: 1st and 4th are wider, 2nd and 3rd are balanced
          const spanClass =
            idx === 0
              ? 'md:col-span-7 h-[360px] sm:h-[420px]'
              : idx === 1
              ? 'md:col-span-5 h-[360px] sm:h-[420px]'
              : idx === 2
              ? 'md:col-span-5 h-[360px] sm:h-[420px]'
              : 'md:col-span-7 h-[360px] sm:h-[420px]';

          const Icon = getCategoryIcon(item.category);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedVibe(item)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold-500/50 shadow-2xl tap-bounce gpu-layer ${spanClass}`}
            >
              {/* Background Photo */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover object-center sm:group-hover:scale-105 transition-transform duration-500 brightness-75 sm:group-hover:brightness-95"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

              {/* Top Tag & Zoom Button */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                <span className="bg-obsidian-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Icon className="h-3 w-3 text-gold-400" />
                  {item.badge}
                </span>

                <div className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 opacity-0 sm:group-hover:opacity-100 transition-opacity border border-white/10">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-6 inset-x-6 space-y-2 text-left">
                <span className="text-[11px] uppercase tracking-widest text-gold-400 font-bold">
                  {item.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white sm:group-hover:text-gold-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal for Vibe Details */}
      <Modal
        isOpen={!!selectedVibe}
        onClose={() => setSelectedVibe(null)}
        maxWidth="3xl"
        className="p-0 overflow-hidden border-gold-500/30"
      >
        {selectedVibe && (
          <div>
            <div className="relative h-80 sm:h-96 w-full bg-charcoal-950">
              <img
                src={selectedVibe.image}
                alt={selectedVibe.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <span className="text-xs uppercase tracking-widest bg-gold-500 text-obsidian-950 font-bold px-3 py-1 rounded-full">
                  {selectedVibe.badge}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 bg-charcoal-900 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                  {selectedVibe.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                  {selectedVibe.title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-gold-500/40 pl-3">
                {selectedVibe.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
