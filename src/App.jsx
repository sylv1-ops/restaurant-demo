import { useState } from "react";
import { dishes, deliveryInfo } from "./data";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import PaymentModal from "./components/PaymentModal";
import DishCustomizationModal from "./components/DishCustomizationModal";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  function calculatePrice(basePrice, customizations) {
    let total = basePrice;
    if (customizations) {
      Object.keys(customizations).forEach((optionId) => {
        const option = customizations[optionId];
        if (Array.isArray(option)) {
          option.forEach((item) => {
            total += item.priceModifier;
          });
        } else {
          total += option.priceModifier;
        }
      });
    }
    return Math.round(total * 100) / 100;
  }

  function addToCart(dish, customizations = null) {
    const cartItem = {
      ...dish,
      quantity: 1,
      customizationId: Date.now() + Math.random(),
      customizations,
      finalPrice: calculatePrice(dish.price, customizations),
    };
    setCart([...cart, cartItem]);
    setSelectedDish(null);
  }

  function removeFromCart(customizationId) {
    setCart(cart.filter((item) => item.customizationId !== customizationId));
  }

  const cartCount = cart.length;

  return (
    <div className="app">
      <header className="app-header">
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <img src="/restaurant-demo/deliveroo-logo.png" alt="Deliveroo" height="36" />
          <h1>roo<span style={{color:"#1a271f"}}>food</span></h1>
          <span className="delivery-eta">
            <span className="eta-dot" />
            <span className="eta-icon">🛵</span>
            Delivery in {deliveryInfo.etaMin}–{deliveryInfo.etaMax} min
          </span>
        </div>
        <div className="cart-badge-wrapper">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </header>

      <main className="app-main">
        <Menu
          dishes={dishes}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddToCart={addToCart}
          onDishSelect={setSelectedDish}
        />
        <Cart cart={cart} onRemove={removeFromCart} onCheckout={() => setShowPayment(true)} />
      </main>
      {selectedDish && (
        <DishCustomizationModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={(customizations) => addToCart(selectedDish, customizations)}
        />
      )}
      {showPayment && (
        <PaymentModal
          cart={cart}
          onClose={() => setShowPayment(false)}
          onSuccess={() => { setCart([]); setShowPayment(false); }}
        />
      )}
    </div>
  );
}
