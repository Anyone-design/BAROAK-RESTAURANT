import React, { useState } from 'react';
import { RestaurantData } from '@/types/restaurant';
import { ReservationEngine } from '@/components/features/ReservationEngine';
import { PrivateEventForm } from '@/components/features/PrivateEventForm';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ReservationSectionProps {
  restaurant: RestaurantData;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  restaurant,
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'event'>('table');

  return (
    <section id="reservation" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient Section Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-xs uppercase tracking-widest text-gold-300 font-bold shadow-lg shadow-gold-500/10">
          <Calendar className="h-3.5 w-3.5 text-gold-400" />
          Real-Time Hospitality & Reservations
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          Secure Your Table or Curate an Event
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Whether planning an intimate date night in our oak lounge or hosting a corporate buyout on the garden terrace, our team ensures seamless hospitality.
        </p>

        {/* Tab Toggle between Dining Table & Private Event */}
        <div className="inline-flex p-1.5 rounded-2xl bg-charcoal-950/90 border border-gold-500/30 mt-6 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === 'table'
                ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-obsidian-950 shadow-lg shadow-gold-500/30 font-extrabold scale-100'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Table Reservation (1–16 Guests)</span>
          </button>

          <button
            onClick={() => setActiveTab('event')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === 'event'
                ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-obsidian-950 shadow-lg shadow-gold-500/30 font-extrabold scale-100'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Private Party & Bulk Events (15–150 Pax)</span>
          </button>
        </div>
      </div>

      {/* Main Reservation Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Highlighted Signature Reservation Container (8 Cols) */}
        <div className="lg:col-span-8 relative rounded-3xl bg-gradient-to-br from-[#1b1712]/95 via-charcoal-900/95 to-obsidian-950/95 border-2 border-gold-500/40 shadow-[0_0_60px_-15px_rgba(212,175,55,0.28),0_30px_60px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-10 overflow-hidden backdrop-blur-xl">
          {/* Top Decorative Gold Rim Light */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          
          {/* Corner Ambient Glow Orb */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />

          {activeTab === 'table' ? (
            <div className="relative z-10">
              <div className="mb-6 pb-5 border-b border-gold-500/20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-[11px] font-bold text-gold-300 mb-3 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>VIP Priority Desk • Instant Confirmation</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Reserve Your Dining Experience
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Instant table reservation with preferred seating section selection & special requests.
                </p>
              </div>
              <ReservationEngine />
            </div>
          ) : (
            <div className="relative z-10">
              <div className="mb-6 pb-5 border-b border-gold-500/20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-[11px] font-bold text-gold-300 mb-3 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Curated Events Desk • Bespoke Buyouts</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Plan a Private Party or Corporate Mixer
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Custom cocktail flights, tandoor small plates, audio setups & bespoke terrace buyouts.
                </p>
              </div>
              <PrivateEventForm />
            </div>
          )}
        </div>

        {/* Right Info & Location Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Location & Maps Navigation Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-900/90 border border-white/10 space-y-5 shadow-xl">
            <div className="flex items-center gap-3 text-gold-400">
              <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Find BAROAK</h4>
                <span className="text-[11px] text-slate-400">Sector 15A, Noida</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-white">
                {restaurant.location.address}
              </p>
              <p className="text-slate-400">
                {restaurant.location.landmark}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={restaurant.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/40 text-gold-300 font-bold text-xs transition-all shadow-md group"
              >
                <Navigation className="h-4 w-4 text-gold-400 group-hover:translate-x-0.5 transition-transform" />
                Open Google Maps & Directions
                <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
              </a>
            </div>
          </div>

          {/* Operating Hours & Policy */}
          <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-900/90 border border-white/10 space-y-4 text-xs shadow-xl">
            <div className="flex items-center gap-3 text-gold-400">
              <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Operating Schedule</h4>
                <span className="text-[11px] text-slate-400">Kitchen & Bar Timings</span>
              </div>
            </div>

            <div className="space-y-2.5 text-slate-300 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400 font-medium">Monday – Friday:</span>
                <span className="font-bold text-white">2:00 PM – 12:00 AM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400 font-medium">Saturday – Sunday:</span>
                <span className="font-bold text-gold-300">1:00 PM – 12:00 AM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Last Food Order:</span>
                <span className="font-semibold text-white">{restaurant.hours.kitchenCloses}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Happy Hours:</span>
                <span className="font-semibold text-gold-300">{restaurant.hours.happyHours}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 space-y-1">
              <div className="font-semibold text-gold-300 text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Guest Dress Code
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Smart casual / evening attire appreciated. No beachwear or flip-flops in the Oak Lounge after 7:00 PM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
