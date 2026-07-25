import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { MenuProvider, useMenu } from "./context/MenuContext";

// Screens
import Splash from "./components/layout/Splash";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import SearchPage from "./pages/SearchPage";
import PromoPage from "./pages/PromoPage";
import RestaurantDetail from "./components/modals/RestaurantDetail";
import Detail from "./components/modals/Detail";
import OrderScreen from "./components/modals/OrderScreen";
import Checkout from "./components/modals/Checkout";
import BottomNav from "./components/layout/BottomNav";
import HistoryScreen from "./components/modals/HistoryScreen";

function Shell() {
  const [splashDone, setSplashDone] = useState(false);
  const { loading: menuLoading } = useMenu();
  const { itemCount, subtotal } = useCart();

  const [tab, setTab] = useState("discover");
  const [modal, setModal] = useState(null); // 'restaurant' | 'detail' | 'order' | 'checkout' | 'history'
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const openItem = (item) => {
    setSelectedItem(item);
    setModal("detail");
  };

  const openRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModal("restaurant");
  };

  const closeModal = () => setModal(null);
  const openCart = () => setModal("order");

  // Splash
  if (!splashDone || menuLoading) {
    return <Splash onFinish={() => setSplashDone(true)} />;
  }

  // Tab content
  const renderTab = () => {
    switch (tab) {
      case "discover":
        return <Home onOpenItem={openItem} onOpenCart={openCart} onNavigate={setTab} onOpenHistory={() => setModal("history")} />;
      case "categories":
        return <CategoriesPage onOpenItem={openItem} />;
      case "search":
        return <SearchPage onOpenItem={openItem} />;
      case "promos":
        return <PromoPage onOpenItem={openItem} />;
      default:
        return null;
    }
  };

  // Modal overlays
  const renderModal = () => {
    if (!modal) return null;
    switch (modal) {
      case "restaurant":
        return (
          <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
            <RestaurantDetail
              restaurant={selectedRestaurant}
              onBack={closeModal}
              onOpenItem={openItem}
            />
          </div>
        );
      case "detail":
        return (
          <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
            <Detail
              item={selectedItem}
              onBack={closeModal}
              onAdded={() => setModal("order")}
            />
          </div>
        );
      case "order":
        return (
          <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
            <OrderScreen onBack={closeModal} onCheckout={() => setModal("checkout")} />
          </div>
        );
      case "checkout":
        return (
          <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
            <Checkout onBack={() => setModal("order")} />
          </div>
        );
      case "history":
        return (
          <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-up">
            <HistoryScreen onBack={closeModal} onReorder={() => setModal("order")} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-surface pb-[68px]">
      {renderTab()}
      {renderModal()}
      
      {/* Floating Global Cart Button */}
      {!modal && itemCount > 0 && (
        <button
          onClick={openCart}
          className="fixed bottom-20 left-4 right-4 z-40 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white shadow-xl animate-pop transition-transform active:scale-95"
        >
          <span className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold">{itemCount}</span>
            Voir ma commande
          </span>
          <span className="font-display text-sm font-bold">{
            new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(subtotal).replace('XAF', 'FCFA')
          }</span>
        </button>
      )}
      <BottomNav 
        active={modal ? null : tab} 
        onNavigate={(id) => {
          setModal(null);
          setTab(id);
        }} 
      />
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <CartProvider>
        <Shell />
      </CartProvider>
    </MenuProvider>
  );
}

