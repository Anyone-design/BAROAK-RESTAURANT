import React from 'react';
import { motion } from 'framer-motion';
import { EventItem, AmenityItem } from '@/types/restaurant';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Calendar,
  Music,
  Wine,
  Trees,
  Car,
  Wifi,
  CreditCard,
  Users,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface EventsAndAmenitiesSectionProps {
  events: EventItem[];
  amenities: AmenityItem[];
  onScrollToReservation: () => void;
}

export const EventsAndAmenitiesSection: React.FC<EventsAndAmenitiesSectionProps> = ({
  events,
  amenities,
  onScrollToReservation,
}) => {
  // Helper to map amenity icon string to Lucide component
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return Car;
      case 'Trees':
        return Trees;
      case 'Wine':
        return Wine;
      case 'Music':
        return Music;
      case 'Wifi':
        return Wifi;
      case 'CreditCard':
        return CreditCard;
      case 'Users':
        return Users;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 overflow-hidden">
      {/* EVENTS & NIGHTLIFE SECTION */}
      <section id="events" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs uppercase tracking-widest text-gold-400 font-bold">
            <Music className="h-3.5 w-3.5" />
            Curated Evenings & Weekends
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            Live Sounds & Nightlife Calendar
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Unwind with our handpicked live musicians, smooth jazz quartets, and lavish weekend brunch experiences.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-charcoal-900/90 border border-white/10 dish-card-hover overflow-hidden flex flex-col justify-between group shadow-xl gpu-layer"
            >
              {/* Event Image */}
              <div className="relative h-56 w-full overflow-hidden bg-charcoal-950">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover object-center sm:group-hover:scale-105 transition-transform duration-500 brightness-85 sm:group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/40" />

                <div className="absolute top-4 left-4">
                  <span className="bg-obsidian-950/90 backdrop-blur-md text-gold-300 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-gold-200 text-xs font-semibold">
                  <Clock className="h-3.5 w-3.5 text-gold-400" />
                  <span>{event.schedule}</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white sm:group-hover:text-gold-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Highlight Badge & Booking Button */}
                <div className="space-y-4 pt-3 border-t border-white/5">
                  <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-[11px] text-gold-300 font-medium">
                    ✦ {event.highlight}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={onScrollToReservation}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    Reserve For This Event
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AMENITIES & HOSPITALITY SECTION */}
      <section id="amenities" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs uppercase tracking-widest text-gold-400 font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Bespoke Hospitality
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            Curated Amenities & Conveniences
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every touchpoint at BAROAK has been engineered for effortless luxury, from complimentary valet services to audiophile acoustic treatment.
          </p>
        </div>

        {/* Amenities Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {amenities.map((amenity, idx) => {
            const Icon = getAmenityIcon(amenity.icon);

            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-charcoal-900/80 border border-white/10 hover:border-gold-500/40 hover:bg-charcoal-800/90 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="h-12 w-12 rounded-2xl bg-white/5 text-gold-400 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-gold-200 transition-colors">
                  {amenity.name}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {amenity.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
