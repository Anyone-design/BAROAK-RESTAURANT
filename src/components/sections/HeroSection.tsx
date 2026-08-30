import React from 'react';
import { motion } from 'framer-motion';
import { RestaurantData } from '@/types/restaurant';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  Utensils,
  ChevronDown,
} from 'lucide-react';

interface HeroSectionProps {
  restaurant: RestaurantData;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  restaurant,
  onScrollToSection,
}) => {
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  const todayTiming = isWeekend ? '1:00 PM – 12:00 AM' : '2:00 PM – 12:00 AM';

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient Layered Background Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="BAROAK Luxury Restaurant Ambiance"
          className="w-full h-full object-cover object-center brightness-[0.35] scale-105 transform animate-pulse-slow"
        />
        {/* Moody Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-obsidian-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-obsidian-950/90 pointer-events-none" />
      </div>

      {/* Decorative Golden Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Top Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold-500/30 backdrop-blur-md shadow-lg shadow-gold-500/5 text-xs text-gold-300 mx-auto"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
          <span className="font-semibold tracking-wide">
            Open Today • {todayTiming}
          </span>
        </motion.div>

        {/* Main Branding & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gold-400 font-bold">
              Craft Kitchen & Botanical Lounge
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white tracking-tight leading-[1.1]">
            Where Artisanal Gastronomy Meets{' '}
            <span className="text-gold-gradient italic font-serif block sm:inline">
              Unhurried Elegance
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-base md:text-lg font-normal leading-relaxed pt-1 sm:pt-2 px-2">
            Step inside a moody oak haven of handcrafted botanical cocktails, progressive North Indian fusion, artisanal wood-fired pizzas, and soul-stirring music in Noida.
          </p>
        </motion.div>

        {/* Dual Primary Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={() => onScrollToSection('reservation')}
            className="w-full sm:w-auto text-sm sm:text-base px-8 py-4 shadow-xl shadow-gold-500/25"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Reserve a Table
          </Button>

          <Button
            variant="glass"
            size="lg"
            onClick={() => onScrollToSection('menu')}
            className="w-full sm:w-auto text-sm sm:text-base px-8 py-4"
          >
            <Utensils className="h-4 w-4 mr-2 text-gold-400" />
            Explore Artisanal Menu
          </Button>
        </motion.div>

        {/* Quick Utility Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-6"
        >
          {/* Location Badge */}
          <a
            href={restaurant.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-charcoal-900/60 border border-white/10 hover:border-gold-500/40 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-white/5 text-gold-400 group-hover:bg-gold-500/20 transition-colors shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Location
              </span>
              <span className="text-xs font-bold text-white group-hover:text-gold-300 truncate block">
                {restaurant.location.shortAddress}
              </span>
            </div>
          </a>

          {/* Contact Badge */}
          <a
            href={`tel:${restaurant.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-charcoal-900/60 border border-white/10 hover:border-gold-500/40 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-white/5 text-gold-400 group-hover:bg-gold-500/20 transition-colors shrink-0">
              <Phone className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Direct Host Line
              </span>
              <span className="text-xs font-bold text-white group-hover:text-gold-300 truncate block">
                {restaurant.contact.phone}
              </span>
            </div>
          </a>

          {/* Operating Hours */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-charcoal-900/60 border border-white/10 text-left">
            <div className="p-2.5 rounded-xl bg-white/5 text-gold-400 shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Dining Hours
              </span>
              <span className="text-xs font-bold text-white block">
                Mon–Fri: 2PM–12AM • Sat–Sun: 1PM–12AM
              </span>
            </div>
          </div>
        </motion.div>

        {/* Key Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {restaurant.stats.map((stat, idx) => (
            <div key={idx} className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-display font-black text-gold-300">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce pointer-events-none hidden md:block">
        <ChevronDown className="h-5 w-5" />
      </div>
    </section>
  );
};
