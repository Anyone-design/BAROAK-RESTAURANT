export interface LocationInfo {
  address: string;
  shortAddress: string;
  landmark: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ContactInfo {
  phone: string;
  altPhone: string;
  email: string;
  eventsEmail: string;
}

export interface HoursInfo {
  days: string;
  timing: string;
  kitchenCloses: string;
  happyHours: string;
  sundayBrunch: string;
}

export interface StatItem {
  label: string;
  value: string;
  subtext: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
}

export interface EventItem {
  id: string;
  title: string;
  schedule: string;
  category: string;
  description: string;
  highlight: string;
  image: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface RestaurantData {
  name: string;
  fullName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  about: string;
  location: LocationInfo;
  contact: ContactInfo;
  hours: HoursInfo;
  costForTwo: string;
  cuisineTypes: string[];
  stats: StatItem[];
  gallery: GalleryItem[];
  events: EventItem[];
  amenities: AmenityItem[];
}
