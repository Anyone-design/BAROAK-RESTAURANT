import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PrivateEventInquiry } from '@/types/reservation';
import confetti from 'canvas-confetti';
import {
  Users,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const EVENT_TYPES = [
  { id: 'cocktail-party', label: 'Cocktail & Tapas Reception' },
  { id: 'corporate-mixer', label: 'Corporate Dinner & Mixer' },
  { id: 'milestone-birthday', label: 'Milestone Birthday / Anniversary' },
  { id: 'wedding-reception', label: 'Intimate Wedding / Sangeet Afterparty' },
  { id: 'masterclass', label: 'Private Mixology / Culinary Masterclass' },
];

const SEATING_PREFERENCES = [
  { id: 'full-venue-buyout', label: 'Full Venue Buyout (Up to 150 guests)' },
  { id: 'terrace-patio', label: 'Exclusive Garden Terrace (Up to 60 guests)' },
  { id: 'oak-lounge-section', label: 'Oak Leather Lounge Wing (Up to 45 guests)' },
];

const BAR_PACKAGES = [
  { id: 'craft-botanical-cocktails', label: 'Signature Botanical Mixology Flight (Unlimited)' },
  { id: 'premium-spirits', label: 'Single Malt & Premium Spirits Package' },
  { id: 'bespoke-wine-beer', label: 'Craft Beers, Sangrias & Curated Wine Cellar' },
  { id: 'non-alcoholic-mixology', label: 'Zero-Proof Botanical Coolers & Artisan Sodas' },
];

export const PrivateEventForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<PrivateEventInquiry>({
    eventType: 'cocktail-party',
    guestCount: 35,
    preferredDate: '',
    timePreference: 'evening-cocktails',
    seatingPreference: 'terrace-patio',
    barPackage: 'craft-botanical-cocktails',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Organizer name is required';
    if (!formData.phone.trim()) {
      err.phone = 'Mobile number is required';
    } else if (formData.phone.length !== 10) {
      err.phone = 'Please enter a 10-digit mobile number';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      err.phone = 'Please enter a valid 10-digit number (starts with 6, 7, 8 or 9)';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Valid email is required (e.g. name@company.com)';
    }
    if (!formData.preferredDate) err.preferredDate = 'Please select a preferred date';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#FFF0B3', '#10B981'],
      });
    }, 1200);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 sm:p-10 text-center space-y-5 bg-charcoal-900/90 border border-gold-500/30 rounded-3xl"
      >
        <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Event Inquiry Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
            Our Events Director Will Connect Within 2 Hours!
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2">
            Thank you, <strong className="text-white">{formData.name}</strong>. A customized catering & beverage proposal for your party of <strong className="text-gold-300">{formData.guestCount} guests</strong> has been forwarded to our curation team.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-slate-300 space-y-1">
          <div>📞 Direct Events Concierge: <span className="text-gold-400 font-semibold">+91 98118 73322</span></div>
          <div>✉️ Email: <span className="text-gold-400 font-semibold">events@baroaknoida.com</span></div>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              eventType: 'cocktail-party',
              guestCount: 35,
              preferredDate: '',
              timePreference: 'evening-cocktails',
              seatingPreference: 'terrace-patio',
              barPackage: 'craft-botanical-cocktails',
              name: '',
              phone: '',
              email: '',
              notes: '',
            });
          }}
          className="mt-4"
        >
          Submit Another Event Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event Type & Guest Count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Event Type
          </label>
          <select
            value={formData.eventType}
            onChange={(e) =>
              setFormData({ ...formData, eventType: e.target.value as any })
            }
            className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-gold-500/60 transition-all cursor-pointer"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t.id} value={t.id} className="bg-charcoal-900 text-white">
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Expected Guests ({formData.guestCount} Pax)
          </label>
          <div className="flex items-center gap-4 bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-2.5">
            <Users className="h-5 w-5 text-gold-400 shrink-0" />
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({ ...formData, guestCount: parseInt(e.target.value) })
              }
              className="w-full accent-gold-500 cursor-pointer"
            />
            <span className="text-sm font-bold text-white shrink-0 w-12 text-right">
              {formData.guestCount}
            </span>
          </div>
        </div>
      </div>

      {/* Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Preferred Date *
          </label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={formData.preferredDate}
            onChange={(e) =>
              setFormData({ ...formData, preferredDate: e.target.value })
            }
            className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/60 [color-scheme:dark]"
          />
          {errors.preferredDate && (
            <p className="text-xs text-red-400">{errors.preferredDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Time Preference
          </label>
          <select
            value={formData.timePreference}
            onChange={(e) =>
              setFormData({ ...formData, timePreference: e.target.value as any })
            }
            className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/60"
          >
            <option value="lunch" className="bg-charcoal-900">Afternoon / Lunch (12:30 PM – 4:00 PM)</option>
            <option value="evening-cocktails" className="bg-charcoal-900">Evening Sundowner & Dinner (7:00 PM – 11:30 PM)</option>
            <option value="all-night" className="bg-charcoal-900">Late Night Exclusive (8:30 PM – Close)</option>
          </select>
        </div>
      </div>

      {/* Preferred Section & Bar Package */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Venue Section Preference
          </label>
          <select
            value={formData.seatingPreference}
            onChange={(e) =>
              setFormData({ ...formData, seatingPreference: e.target.value as any })
            }
            className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/60"
          >
            {SEATING_PREFERENCES.map((s) => (
              <option key={s.id} value={s.id} className="bg-charcoal-900">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Beverage / Bar Package
          </label>
          <select
            value={formData.barPackage}
            onChange={(e) =>
              setFormData({ ...formData, barPackage: e.target.value as any })
            }
            className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/60"
          >
            {BAR_PACKAGES.map((b) => (
              <option key={b.id} value={b.id} className="bg-charcoal-900">
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Organizer Contact Details */}
      <div className="space-y-4 pt-2 border-t border-white/10">
        <div className="text-xs font-semibold uppercase tracking-wider text-gold-400">
          Host / Organizer Contact
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <input
              type="text"
              autoComplete="name"
              placeholder="Host Full Name *"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) {
                  setErrors((prev) => {
                    const c = { ...prev };
                    delete c.name;
                    return c;
                  });
                }
              }}
              className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60 transition-colors"
            />
            {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <div className="relative flex items-center">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gold-400 select-none pointer-events-none border-r border-white/10 pr-2">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                autoComplete="tel-national"
                placeholder="Phone (10 digits) *"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: val });
                  if (errors.phone) {
                    setErrors((prev) => {
                      const c = { ...prev };
                      delete c.phone;
                      return c;
                    });
                  }
                }}
                className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl pl-13 pr-3 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60 font-mono transition-colors"
              />
            </div>
            {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
          </div>
          <div className="space-y-1">
            <input
              type="email"
              autoComplete="email"
              placeholder="Company / Work Email *"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  setErrors((prev) => {
                    const c = { ...prev };
                    delete c.email;
                    return c;
                  });
                }
              }}
              className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60 transition-colors"
            />
            {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <textarea
            rows={2}
            placeholder="Special arrangements (Live DJ setup, acoustic sound system, customized monogram cocktail menu, dietary requirements)..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60"
          />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-end">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          isLoading={isSubmitting}
          className="w-full sm:w-auto px-8"
        >
          Submit Event RFP & Get Custom Proposal
          <Sparkles className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
  );
};
