export default function Cart({ cart, onRemove, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.finalPrice || item.price), 0);

  const tax = subtotal * 0.20;
  const total = subtotal + tax;

  return (
    <aside className="cart">
      <h2>Your Order</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">No items yet.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.customizationId} className="cart-item">
              <span className="cart-item-emoji">{item.emoji}</span>
              <div className="cart-item-details">
                <span className="cart-item-name">
                  {item.name}
                  {item.customizations && (
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                      {item.customizations.size && (
                        <span>({item.customizations.size.label})</span>
                      )}
                      {item.customizations.extras && item.customizations.extras.length > 0 && (
                        <span>
                          {" "}
                          {item.customizations.extras.map((e) => `+${e.label}`).join(", ")}
                        </span>
                      )}
                      {item.customizations.exclusions && item.customizations.exclusions.length > 0 && (
                        <span>
                          {" "}
                          sans {item.customizations.exclusions.map((e) => e.label).join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                </span>
                <span className="cart-item-qty">x{item.quantity}</span>
              </div>
              <span className="cart-item-price">
                €{((item.finalPrice || item.price) * item.quantity).toFixed(2)}
              </span>
              <button className="remove-btn" onClick={() => onRemove(item.customizationId)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-totals">
        <div className="cart-totals-row">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-totals-row">
          <span>Tax (10%)</span>
          <span>€{tax.toFixed(2)}</span>
        </div>
        <div className="cart-totals-row total">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="checkout-btn"
        disabled={cart.length === 0}
        onClick={onCheckout}
      >
        Place Order
      </button>
    </aside>
  );
}
