import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RestaurantData } from '@/types/restaurant';
import { Button } from '@/components/ui/Button';
import {
  Menu as MenuIcon,
  X,
  Phone,
  Calendar,
  Heart,
  MapPin,
  Clock,
} from 'lucide-react';

interface HeaderProps {
  restaurant: RestaurantData;
  tastingCount: number;
  onOpenTastingList: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  restaurant,
  tastingCount,
  onOpenTastingList,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Detect active section
      const sections = ['hero', 'menu', 'vibe', 'events', 'reservation'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Artisanal Menu' },
    { id: 'vibe', label: 'The Experience' },
    { id: 'events', label: 'Events & Nightlife' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reservation', label: 'Book Table' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/60'
            : 'bg-gradient-to-b from-obsidian-950/90 via-obsidian-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('hero');
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Monogram Emblem */}
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-charcoal-800 to-obsidian-900 border border-gold-500/40 flex items-center justify-center shadow-lg group-hover:border-gold-400 group-hover:shadow-gold-500/20 transition-all">
              <span className="font-display font-black text-xl sm:text-2xl text-gold-gradient">
                B
              </span>
            </div>
            <div>
              <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white group-hover:text-gold-300 transition-colors">
                {restaurant.name}
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-gold-400/80 font-semibold -mt-1">
                Kitchen • Bar • Lounge
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-gold-400 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full shadow-sm shadow-gold-400"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${restaurant.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-gold-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-full transition-all"
              title="Direct Restaurant Host Line"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" />
              <span>Call Host</span>
            </a>

            {/* Tasting List Wishlist Button */}
            <button
              onClick={onOpenTastingList}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-gold-400 transition-all focus:outline-none"
              title="Curated Tasting List"
              aria-label="Tasting List"
            >
              <Heart className={`h-4 w-4 ${tastingCount > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
              {tastingCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gold-500 text-obsidian-950 text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {tastingCount}
                </span>
              )}
            </button>

            {/* Primary Reserve CTA */}
            <Button
              variant="gold"
              size="sm"
              onClick={() => onScrollToSection('reservation')}
              className="hidden md:inline-flex px-5 py-2 text-xs"
            >
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Reserve Table
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[68px] z-30 bg-charcoal-900/95 border-b border-gold-500/20 backdrop-blur-2xl p-6 lg:hidden shadow-2xl space-y-5"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection(link.id);
                  }}
                  className="text-left py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-gold-300 hover:bg-white/5 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                <span>{restaurant.location.shortAddress}</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                <span>{restaurant.hours.timing}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${restaurant.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-white/10 py-3 rounded-xl border border-white/15"
                >
                  <Phone className="h-3.5 w-3.5 text-gold-400" />
                  Call Host
                </a>
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection('reservation');
                  }}
                  className="w-full text-xs"
                >
                  Reserve Table
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
