import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TableReservation } from '@/types/reservation';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import confetti from 'canvas-confetti';
import {
  Users,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Wine,
  Trees,
  Armchair,
  ShieldCheck,
  Download,
} from 'lucide-react';

const TIME_SLOTS = [
  { id: '12:30 PM', label: '12:30 PM', session: 'Lunch' },
  { id: '01:30 PM', label: '01:30 PM', session: 'Lunch' },
  { id: '02:30 PM', label: '02:30 PM', session: 'Lunch' },
  { id: '06:00 PM', label: '06:00 PM', session: 'Sundowner' },
  { id: '07:15 PM', label: '07:15 PM', session: 'Dinner' },
  { id: '08:30 PM', label: '08:30 PM', session: 'Dinner' },
  { id: '09:45 PM', label: '09:45 PM', session: 'Dinner' },
  { id: '10:30 PM', label: '10:30 PM', session: 'Late Night' },
];

const SEATING_ZONES = [
  {
    id: 'indoor-oak-lounge',
    title: 'Oak Lounge (Indoor)',
    desc: 'Plush Chesterfield leather booths & ambient warm lighting',
    icon: Armchair,
    badge: 'Most Popular',
  },
  {
    id: 'outdoor-garden-patio',
    title: 'Al Fresco Garden Courtyard',
    desc: 'Breezy open terrace under fairy lights & lush foliage',
    icon: Trees,
    badge: 'Outdoor Vibe',
  },
  {
    id: 'botanical-bar',
    title: 'Botanical High-Top Bar',
    desc: 'Front row seats to our mixologists & craft ice program',
    icon: Wine,
    badge: 'Cocktail Lovers',
  },
  {
    id: 'private-alcove',
    title: 'Intimate Dining Alcove',
    desc: 'Curtained private nook ideal for dates & discreet meetings',
    icon: Sparkles,
    badge: 'Intimate',
  },
];

const OCCASIONS = [
  { id: 'casual', label: 'Casual Dining / Social' },
  { id: 'romantic-date', label: 'Romantic Date Night' },
  { id: 'birthday-anniversary', label: 'Birthday / Anniversary' },
  { id: 'business-dining', label: 'Business / Client Dinner' },
  { id: 'celebration', label: 'Special Celebration' },
];

export const ReservationEngine: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmationData, setConfirmationData] = useState<TableReservation | null>(null);

  // Form State
  const [formData, setFormData] = useState<TableReservation>({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '08:30 PM',
    guests: 2,
    seatingZone: 'indoor-oak-lounge',
    occasion: 'romantic-date',
    specialRequests: '',
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.date) newErrors.date = 'Please pick a date';
      if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
      if (formData.guests < 1) newErrors.guests = 'Minimum 1 guest';
    }

    if (currentStep === 2) {
      if (!formData.seatingZone) newErrors.seatingZone = 'Please select a seating zone';
      if (!formData.occasion) newErrors.occasion = 'Please select the dining occasion';
    }

    if (currentStep === 3) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Mobile number is required';
      } else if (formData.phone.length !== 10) {
        newErrors.phone = 'Please enter a 10-digit mobile number';
      } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid Indian mobile number (e.g. starting with 6, 7, 8, or 9)';
      }

      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email address is required (e.g. name@example.com)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    // Simulate server response delay
    setTimeout(() => {
      const generatedId = `BRK-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmed = { ...formData, id: generatedId };
      setConfirmationData(confirmed);
      setIsSubmitting(false);

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FDE087', '#FFFFFF', '#F59E0B'],
      });
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        {[
          { num: 1, label: 'Date & Time' },
          { num: 2, label: 'Seating & Vibe' },
          { num: 3, label: 'Guest Details' },
        ].map((item) => (
          <div
            key={item.num}
            className={`flex items-center gap-3 transition-colors ${
              step === item.num
                ? 'text-gold-400 font-semibold'
                : step > item.num
                ? 'text-emerald-400'
                : 'text-slate-500'
            }`}
          >
            <span
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === item.num
                  ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/30 ring-2 ring-gold-400/50'
                  : step > item.num
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-white/5 text-slate-400 border border-white/10'
              }`}
            >
              {step > item.num ? '✓' : item.num}
            </span>
            <span className="hidden sm:inline text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Date, Time & Guests */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Date & Guest Count Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Reservation Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/40 transition-all cursor-pointer [color-scheme:dark]"
                    />
                  </div>
                  {errors.date && (
                    <p className="text-xs text-red-400">{errors.date}</p>
                  )}
                </div>

                {/* Guest Count Stepper */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Number of Guests
                  </label>
                  <div className="flex items-center bg-charcoal-800/80 border border-white/10 rounded-2xl p-1.5 justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          guests: Math.max(1, formData.guests - 1),
                        })
                      }
                      className="h-10 w-12 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-2 font-display text-lg font-bold text-gold-300">
                      <Users className="h-4 w-4 text-gold-400" />
                      <span>{formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          guests: Math.min(16, formData.guests + 1),
                        })
                      }
                      className="h-10 w-12 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {formData.guests >= 8 && (
                    <p className="text-[11px] text-amber-400/90 italic">
                      ★ For parties larger than 8, our team will reserve a connected lounge bay.
                    </p>
                  )}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Select Time Slot
                  </label>
                  <span className="text-xs text-slate-400">
                    Standard 2-Hour Experience
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = formData.timeSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, timeSlot: slot.id })
                        }
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-gold-500/20 border-gold-400 text-gold-200 shadow-md shadow-gold-500/10'
                            : 'bg-charcoal-800/40 border-white/10 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        <div className="text-sm font-bold">{slot.label}</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                          {slot.session}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.timeSlot && (
                  <p className="text-xs text-red-400">{errors.timeSlot}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Seating & Occasion */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Seating Zones */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Preferred Seating Ambience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_ZONES.map((zone) => {
                    const Icon = zone.icon;
                    const isSelected = formData.seatingZone === zone.id;
                    return (
                      <div
                        key={zone.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            seatingZone: zone.id as any,
                          })
                        }
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-gold-500/15 border-gold-400 ring-1 ring-gold-400/50 shadow-lg shadow-gold-500/10'
                            : 'bg-charcoal-800/40 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2.5 rounded-xl ${
                                isSelected
                                  ? 'bg-gold-500 text-obsidian-950'
                                  : 'bg-white/5 text-slate-400'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">
                                {zone.title}
                              </h4>
                              <span className="text-[10px] text-gold-400/90 font-medium">
                                {zone.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                          {zone.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Occasion & Dietary notes */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  What's the Occasion?
                </label>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((occ) => {
                    const isSelected = formData.occasion === occ.id;
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, occasion: occ.id as any })
                        }
                        className={`text-xs px-4 py-2.5 rounded-full border transition-all ${
                          isSelected
                            ? 'bg-gold-500 text-obsidian-950 font-bold border-gold-400'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {occ.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Special Requests / Dietary Allergies (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Quiet corner, celebrating anniversary (sparkler dessert), gluten allergy..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData({ ...formData, specialRequests: e.target.value })
                  }
                  className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl p-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60 transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: Guest Contact Details */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-gold-400" />
                <div>
                  <span className="font-semibold block text-gold-200">
                    Instant Table Hold
                  </span>
                  No advance cover charge required for standard bookings. Confirmation will be sent instantly via SMS & WhatsApp.
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Raghav Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Mobile Number (WhatsApp) *
                      </label>
                      <span className={`text-[10px] font-mono ${formData.phone.length === 10 ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                        {formData.phone.length}/10 digits {formData.phone.length === 10 ? '✓' : ''}
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gold-400 select-none pointer-events-none border-r border-white/10 pr-2.5">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, phone: val });
                          if (errors.phone) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.phone;
                              return copy;
                            });
                          }
                        }}
                        className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl pl-16 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60 font-mono tracking-wide transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="raghav@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-charcoal-800/80 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500/60"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Booking Summary Box */}
                <div className="p-4 rounded-2xl bg-charcoal-800/60 border border-white/5 space-y-2 text-xs">
                  <div className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                    Reservation Summary
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-slate-200 gap-2">
                    <span>
                      📅 {formData.date} at {formData.timeSlot}
                    </span>
                    <span>👥 {formData.guests} Guests</span>
                    <span className="text-gold-400 font-medium">
                      🏛 {formData.seatingZone.replace(/-/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={handlePrev}
              className="text-slate-400"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              variant="gold"
              size="md"
              onClick={handleNext}
              className="ml-auto"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isSubmitting}
              className="ml-auto px-8"
            >
              Confirm Reservation
              <CheckCircle2 className="h-5 w-5 ml-2" />
            </Button>
          )}
        </div>
      </form>

      {/* Confirmation Success Modal / Digital Pass */}
      <Modal
        isOpen={!!confirmationData}
        onClose={() => setConfirmationData(null)}
        maxWidth="lg"
        className="p-0 border-gold-500/40"
      >
        {confirmationData && (
          <div className="p-6 sm:p-8 text-center space-y-6 bg-charcoal-900">
            <div className="h-16 w-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-gold-500/10">
              <Sparkles className="h-8 w-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-3">
                We're Preparing Your Table!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Thank you, <strong className="text-white">{confirmationData.name}</strong>. Your reservation has been booked in the BAROAK Host System.
              </p>
            </div>

            {/* Digital Pass Ticket Card */}
            <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-5 text-left space-y-3 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                    Pass Reference
                  </div>
                  <div className="text-base font-bold font-mono text-gold-400">
                    {confirmationData.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                    Location
                  </div>
                  <div className="text-xs font-medium text-white">
                    Sector 15A, Noida
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-400 block text-[11px]">Date & Time:</span>
                  <span className="font-semibold text-white">
                    {confirmationData.date} • {confirmationData.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Party Size:</span>
                  <span className="font-semibold text-white">
                    {confirmationData.guests} Guests
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Seating Section:</span>
                  <span className="font-semibold text-gold-300 capitalize">
                    {confirmationData.seatingZone.replace(/-/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Guest Phone:</span>
                  <span className="font-semibold text-white">
                    +91 {confirmationData.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="gold"
                size="md"
                className="w-full"
                onClick={() => {
                  alert(`Pass ${confirmationData.id} details copied to clipboard & downloaded!`);
                  setConfirmationData(null);
                }}
              >
                <Download className="h-4 w-4 mr-1.5" />
                Download Pass
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => setConfirmationData(null)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
