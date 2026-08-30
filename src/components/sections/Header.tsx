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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);

          // Detect active section accurately (including amenities)
          const sections = ['hero', 'menu', 'vibe', 'events', 'amenities', 'reservation'];
          const scrollPos = window.scrollY + 200;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              if (scrollPos >= top) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian-950/95 backdrop-blur-xl py-2.5 sm:py-3.5 border-b border-gold-500/20 shadow-2xl shadow-black/80'
            : 'bg-obsidian-950/90 backdrop-blur-md py-3 sm:py-4 border-b border-white/10 shadow-lg shadow-black/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('hero');
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          >
            {/* Monogram Emblem */}
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-charcoal-800 to-obsidian-900 border border-gold-500/40 flex items-center justify-center shadow-lg group-hover:border-gold-400 group-hover:shadow-gold-500/20 transition-all">
              <span className="font-display font-black text-lg sm:text-2xl text-gold-gradient">
                B
              </span>
            </div>
            <div>
              <span className="font-display font-black text-base sm:text-xl tracking-wider text-white group-hover:text-gold-300 transition-colors">
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

          {/* Right Action Utilities (Visible on Mobile & Desktop) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${restaurant.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/35 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all shadow-sm active:scale-95"
              title="Direct Restaurant Host Line"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400 shrink-0" />
              <span className="hidden sm:inline">Call Host</span>
              <span className="sm:hidden text-[11px]">Call</span>
            </a>

            {/* Tasting List Wishlist Button */}
            <button
              onClick={onOpenTastingList}
              className="relative p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-gold-400 transition-all focus:outline-none active:scale-95"
              title="Curated Tasting List"
              aria-label="Tasting List"
            >
              <Heart className={`h-4 w-4 ${tastingCount > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
              {tastingCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-gold-500 text-obsidian-950 text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {tastingCount}
                </span>
              )}
            </button>

            {/* Primary Reserve CTA (Desktop only) */}
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
              className="lg:hidden p-2 rounded-xl text-slate-200 hover:text-white bg-white/10 border border-white/15 focus:outline-none active:scale-95"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-gold-400" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[56px] sm:top-[64px] z-40 bg-obsidian-950/98 border-b border-gold-500/30 backdrop-blur-2xl p-5 lg:hidden shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Quick Action Strip in Drawer */}
            <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-white/10">
              <a
                href={`tel:${restaurant.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold"
              >
                <Phone className="h-3.5 w-3.5 text-gold-400" />
                Call Host Line
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTastingList();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-bold"
              >
                <Heart className={`h-3.5 w-3.5 ${tastingCount > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
                Tasting List ({tastingCount})
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onScrollToSection(link.id);
                    }}
                    className={`text-left py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                        : 'text-slate-200 hover:text-gold-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="text-xs text-gold-400">✦</span>}
                  </button>
                );
              })}
            </div>

            {/* Reserve CTA in Drawer */}
            <Button
              variant="gold"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection('reservation');
              }}
              className="w-full text-xs font-bold py-3 shadow-lg shadow-gold-500/20"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Reserve a Table Online
            </Button>

            {/* Operating Schedule Strip */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                <span>{restaurant.location.shortAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-3.5 w-3.5 text-gold-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-white font-medium">Mon–Fri: 2:00 PM – 12:00 AM</div>
                  <div className="text-gold-300 font-medium">Sat–Sun: 1:00 PM – 12:00 AM</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
