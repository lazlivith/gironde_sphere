/* App.jsx — Main router/shell — 4 tabs (no Profile, no Notifications) */
import { useState } from "react";
import { CartProvider } from "./context/CartContext";

// Screens
import Splash from "./components/Splash";
import Home from "./components/Home";
import CategoriesPage from "./components/CategoriesPage";
import SearchPage from "./components/SearchPage";
import PromoPage from "./components/PromoPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Detail from "./components/Detail";
import OrderScreen from "./components/OrderScreen";
import Checkout from "./components/Checkout";
import BottomNav from "./components/BottomNav";

function Shell() {
  const [splashDone, setSplashDone] = useState(false);

  const [tab, setTab] = useState("discover");
  const [modal, setModal] = useState(null); // 'restaurant' | 'detail' | 'order' | 'checkout'
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
  if (!splashDone) {
    return <Splash onFinish={() => setSplashDone(true)} />;
  }

  // Tab content
  const renderTab = () => {
    switch (tab) {
      case "discover":
        return <Home onOpenItem={openItem} onOpenCart={openCart} onNavigate={setTab} />;
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
          <div className="absolute inset-0 z-30 bg-white overflow-y-auto animate-slide-up">
            <RestaurantDetail
              restaurant={selectedRestaurant}
              onBack={closeModal}
              onOpenItem={openItem}
            />
          </div>
        );
      case "detail":
        return (
          <div className="absolute inset-0 z-30 bg-white overflow-y-auto animate-slide-up">
            <Detail
              item={selectedItem}
              onBack={closeModal}
              onAdded={() => setModal("order")}
            />
          </div>
        );
      case "order":
        return (
          <div className="absolute inset-0 z-30 bg-white overflow-y-auto animate-slide-up">
            <OrderScreen onBack={closeModal} onCheckout={() => setModal("checkout")} />
          </div>
        );
      case "checkout":
        return (
          <div className="absolute inset-0 z-30 bg-white overflow-y-auto animate-slide-up">
            <Checkout onBack={() => setModal("order")} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      {renderTab()}
      {renderModal()}
      {!modal && <BottomNav active={tab} onNavigate={setTab} />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
