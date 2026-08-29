export interface TableReservation {
  id?: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingZone: 'indoor-oak-lounge' | 'outdoor-garden-patio' | 'botanical-bar' | 'private-alcove';
  occasion: 'casual' | 'romantic-date' | 'birthday-anniversary' | 'business-dining' | 'celebration';
  specialRequests?: string;
  name: string;
  phone: string;
  email: string;
}

export interface PrivateEventInquiry {
  id?: string;
  eventType: 'cocktail-party' | 'corporate-mixer' | 'milestone-birthday' | 'wedding-reception' | 'masterclass';
  guestCount: number;
  preferredDate: string;
  timePreference: 'lunch' | 'evening-cocktails' | 'all-night';
  seatingPreference: 'full-venue-buyout' | 'terrace-patio' | 'oak-lounge-section';
  barPackage: 'craft-botanical-cocktails' | 'premium-spirits' | 'bespoke-wine-beer' | 'non-alcoholic-mixology';
  name: string;
  phone: string;
  email: string;
  notes?: string;
}
