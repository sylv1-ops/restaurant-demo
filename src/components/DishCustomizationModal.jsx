import { useState } from "react";

export default function DishCustomizationModal({ dish, onClose, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initial = {};
    if (dish.options) {
      dish.options.forEach((optionGroup) => {
        if (optionGroup.type === "single") {
          initial[optionGroup.id] = optionGroup.defaultChoice;
        } else {
          initial[optionGroup.id] = [];
        }
      });
    }
    return initial;
  });

  function calculatePrice() {
    let total = dish.price;
    if (dish.options) {
      dish.options.forEach((optionGroup) => {
        if (optionGroup.type === "single") {
          const selected = optionGroup.choices.find(
            (c) => c.id === selectedOptions[optionGroup.id]
          );
          if (selected) total += selected.priceModifier;
        } else if (optionGroup.type === "multiple") {
          const selectedIds = selectedOptions[optionGroup.id];
          selectedIds.forEach((choiceId) => {
            const choice = optionGroup.choices.find((c) => c.id === choiceId);
            if (choice) total += choice.priceModifier;
          });
        }
      });
    }
    return Math.round(total * 100) / 100;
  }

  function handleSingleOptionChange(optionGroupId, choiceId) {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionGroupId]: choiceId,
    }));
  }

  function handleMultipleOptionChange(optionGroupId, choiceId, isChecked) {
    setSelectedOptions((prev) => {
      const current = prev[optionGroupId];
      if (isChecked) {
        const optionGroup = dish.options.find((og) => og.id === optionGroupId);
        if (current.length >= optionGroup.maxSelections) {
          alert(`Maximum ${optionGroup.maxSelections} extras atteint`);
          return prev;
        }
        return {
          ...prev,
          [optionGroupId]: [...current, choiceId],
        };
      } else {
        return {
          ...prev,
          [optionGroupId]: current.filter((id) => id !== choiceId),
        };
      }
    });
  }

  function handleAddToCart() {
    const customizations = {};
    if (dish.options) {
      dish.options.forEach((optionGroup) => {
        if (optionGroup.type === "single") {
          const selectedId = selectedOptions[optionGroup.id];
          const selected = optionGroup.choices.find((c) => c.id === selectedId);
          if (selected) {
            customizations[optionGroup.id] = selected;
          }
        } else if (optionGroup.type === "multiple") {
          const selectedIds = selectedOptions[optionGroup.id];
          customizations[optionGroup.id] = optionGroup.choices.filter((c) =>
            selectedIds.includes(c.id)
          );
        }
      });
    }
    onAddToCart(customizations);
  }

  const finalPrice = calculatePrice();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-step">
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <span style={{ fontSize: "48px" }}>{dish.emoji}</span>
            <div>
              <h2 className="modal-title">{dish.name}</h2>
              <p style={{ color: "#666", margin: "4px 0 0 0" }}>
                {dish.description}
              </p>
            </div>
          </div>

          {dish.options && dish.options.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              {dish.options.map((optionGroup) => (
                <div key={optionGroup.id} style={{ marginBottom: "20px" }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                    {optionGroup.name}
                  </h4>

                  {optionGroup.type === "single" ? (
                    <div>
                      {optionGroup.choices.map((choice) => (
                        <label
                          key={choice.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="radio"
                            name={optionGroup.id}
                            value={choice.id}
                            checked={selectedOptions[optionGroup.id] === choice.id}
                            onChange={() =>
                              handleSingleOptionChange(optionGroup.id, choice.id)
                            }
                          />
                          <span>
                            {choice.label}
                            {choice.priceModifier > 0 && (
                              <span style={{ color: "#666" }}>
                                {" "}
                                (+€{choice.priceModifier.toFixed(2)})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {optionGroup.choices.map((choice) => (
                        <label
                          key={choice.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedOptions[optionGroup.id].includes(
                              choice.id
                            )}
                            onChange={(e) =>
                              handleMultipleOptionChange(
                                optionGroup.id,
                                choice.id,
                                e.target.checked
                              )
                            }
                          />
                          <span>
                            {choice.label}
                            {choice.priceModifier !== 0 && (
                              <span style={{ color: "#666" }}>
                                {" "}
                                (
                                {choice.priceModifier > 0 ? "+" : ""}
                                €{choice.priceModifier.toFixed(2)})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              backgroundColor: "#f8f4ef",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "16px",
              textAlign: "right",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              €{finalPrice.toFixed(2)}
            </span>
          </div>

          <div className="modal-actions">
            <button
              className="modal-btn-secondary"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              className="modal-btn-primary"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
