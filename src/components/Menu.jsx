const CATEGORIES = ["All", "Starters", "Mains", "Desserts"];

export default function Menu({ dishes, selectedCategory, onCategoryChange, onAddToCart, onDishSelect }) {
  const filteredDishes = dishes;

  return (
    <section className="menu">
      <h2>Menu</h2>

      <div className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <div style={{ position: "relative" }}>
              <span className="dish-emoji">{dish.emoji}</span>
              {dish.options && dish.options.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    backgroundColor: "#00c1b2",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                  title="Personalizable"
                >
                  ⚙️
                </span>
              )}
            </div>
            <div className="dish-info">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="dish-footer">
                <span className="dish-price">€{dish.price.toFixed(2)}</span>
                <button
                  className="add-btn"
                  onClick={() => {
                    if (dish.options && dish.options.length > 0) {
                      onDishSelect(dish);
                    } else {
                      onAddToCart(dish);
                    }
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
