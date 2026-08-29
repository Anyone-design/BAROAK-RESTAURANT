import { useState } from 'react';
import restaurantDataRaw from '@/data/restaurant-info.json';
import menuDataRaw from '@/data/menu.json';
import { RestaurantData } from '@/types/restaurant';
import { MenuData, MenuItem } from '@/types/menu';

import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { DigitalMenuSection } from '@/components/sections/DigitalMenuSection';
import { VibeShowcaseSection } from '@/components/sections/VibeShowcaseSection';
import { EventsAndAmenitiesSection } from '@/components/sections/EventsAndAmenitiesSection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { DishModal } from '@/components/features/DishModal';
import { TastingListDrawer } from '@/components/features/TastingListDrawer';
import { Heart } from 'lucide-react';

const restaurantData = restaurantDataRaw as RestaurantData;
const menuData = menuDataRaw as unknown as MenuData;

export function App() {
  // Modal & Drawer States
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState<boolean>(false);
  const [isTastingListOpen, setIsTastingListOpen] = useState<boolean>(false);

  // Tasting List / Wishlist State
  const [savedItems, setSavedItems] = useState<MenuItem[]>([]);
  const savedItemIds = new Set(savedItems.map((item) => item.id));

  // Toggle item in tasting list
  const handleToggleSaveItem = (dish: MenuItem) => {
    if (savedItemIds.has(dish.id)) {
      setSavedItems((prev) => prev.filter((i) => i.id !== dish.id));
    } else {
      setSavedItems((prev) => [...prev, dish]);
    }
  };

  const handleRemoveTastingItem = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearTastingList = () => {
    setSavedItems([]);
  };

  // Open Dish Details Modal
  const handleOpenDishModal = (dish: MenuItem) => {
    setSelectedDish(dish);
    setIsDishModalOpen(true);
  };

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-500/30 selection:text-gold-300">
      {/* Top Header Navbar */}
      <Header
        restaurant={restaurantData}
        tastingCount={savedItems.length}
        onOpenTastingList={() => setIsTastingListOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Sections */}
      <main className="space-y-16 sm:space-y-24">
        {/* 1. Hero Section */}
        <HeroSection
          restaurant={restaurantData}
          onScrollToSection={handleScrollToSection}
        />

        {/* 2. Interactive Digital Menu Section */}
        <DigitalMenuSection
          menuData={menuData}
          onOpenDishModal={handleOpenDishModal}
          savedItemIds={savedItemIds}
          onToggleSaveItem={handleToggleSaveItem}
        />

        {/* 3. Vibe & Space Design Showcase Bento Grid */}
        <VibeShowcaseSection gallery={restaurantData.gallery} />

        {/* 4. Events & Nightlife + Amenities Section */}
        <EventsAndAmenitiesSection
          events={restaurantData.events}
          amenities={restaurantData.amenities}
          onScrollToReservation={() => handleScrollToSection('reservation')}
        />

        {/* 5. Real-Time Table Reservation & Event Inquiry Section */}
        <ReservationSection restaurant={restaurantData} />
      </main>

      {/* Floating Tasting List Quick Pill (Shown on Mobile/Desktop when items exist) */}
      {savedItems.length > 0 && !isTastingListOpen && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsTastingListOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs sm:text-sm shadow-2xl shadow-gold-500/40 hover:scale-105 active:scale-95 transition-all border border-gold-300/50"
          >
            <Heart className="h-4 w-4 fill-obsidian-950" />
            <span>Tasting List ({savedItems.length})</span>
          </button>
        </div>
      )}

      {/* Dish Details Lightbox Modal */}
      <DishModal
        item={selectedDish}
        isOpen={isDishModalOpen}
        onClose={() => {
          setIsDishModalOpen(false);
          setSelectedDish(null);
        }}
        isSaved={selectedDish ? savedItemIds.has(selectedDish.id) : false}
        onToggleSave={handleToggleSaveItem}
      />

      {/* Curated Tasting Wishlist Slide-Over Drawer */}
      <TastingListDrawer
        isOpen={isTastingListOpen}
        onClose={() => setIsTastingListOpen(false)}
        items={savedItems}
        onRemoveItem={handleRemoveTastingItem}
        onClearAll={handleClearTastingList}
        onOpenDishModal={handleOpenDishModal}
        onScrollToReservation={() => handleScrollToSection('reservation')}
      />
    </div>
  );
}

export default App;
