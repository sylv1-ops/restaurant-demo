export const deliveryInfo = {
  etaMin: 25,
  etaMax: 35, // average delivery estimate, in minutes
};

export const dishes = [
  { id: 1, name: "Bruschetta", description: "Toasted bread with tomatoes, garlic and fresh basil", price: 6.5, category: "Starters", emoji: "🍞" },
  { id: 2, name: "Soup of the Day", description: "Ask your waiter for today's homemade soup", price: 5.0, category: "Starters", emoji: "🍲" },
  { id: 3, name: "Garlic Prawns", description: "Sautéed king prawns in garlic butter and white wine", price: 9.5, category: "Starters", emoji: "🦐" },
  { id: 4, name: "Caesar Salad", description: "Romaine lettuce, parmesan, croutons and Caesar dressing", price: 7.0, category: "Starters", emoji: "🥗" },
  {
    id: 5,
    name: "Classic Burger",
    description: "Beef patty, cheddar, lettuce, tomato and pickles",
    price: 14.0,
    category: "Mains",
    emoji: "🍔",
    options: [
      {
        id: "size",
        name: "Taille",
        type: "single",
        defaultChoice: "M",
        choices: [
          { id: "S", label: "Petit", priceModifier: 0 },
          { id: "M", label: "Moyen", priceModifier: 0 },
          { id: "L", label: "Grand", priceModifier: 2.0 }
        ]
      },
      {
        id: "extras",
        name: "Suppléments",
        type: "multiple",
        maxSelections: 5,
        choices: [
          { id: "bacon", label: "Bacon", priceModifier: 1.0 },
          { id: "cheese", label: "Fromage extra", priceModifier: 0.5 }
        ]
      },
      {
        id: "exclusions",
        name: "Exclusions",
        type: "multiple",
        choices: [
          { id: "onion", label: "Sans oignon", priceModifier: 0 },
          { id: "pickles", label: "Sans cornichons", priceModifier: 0 }
        ]
      }
    ]
  },
  { id: 6, name: "Grilled Salmon", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables", price: 18.5, category: "Mains", emoji: "🐟" },
  {
    id: 7,
    name: "Margherita Pizza",
    description: "San Marzano tomato sauce, fresh mozzarella and basil",
    price: 13.0,
    category: "Mains",
    emoji: "🍕",
    options: [
      {
        id: "size",
        name: "Taille",
        type: "single",
        defaultChoice: "M",
        choices: [
          { id: "S", label: "Petit (28cm)", priceModifier: 0 },
          { id: "M", label: "Moyen (32cm)", priceModifier: 0 },
          { id: "L", label: "Grand (36cm)", priceModifier: 2.5 }
        ]
      },
      {
        id: "extras",
        name: "Suppléments",
        type: "multiple",
        maxSelections: 5,
        choices: [
          { id: "pepperoni", label: "Pepperoni", priceModifier: 1.5 },
          { id: "mushrooms", label: "Champignons", priceModifier: 0.75 },
          { id: "olives", label: "Olives", priceModifier: 0.75 }
        ]
      },
      {
        id: "exclusions",
        name: "Exclusions",
        type: "multiple",
        choices: [
          { id: "basil", label: "Sans basilic", priceModifier: 0 }
        ]
      }
    ]
  },
  { id: 8, name: "Mushroom Risotto", description: "Arborio rice with wild mushrooms, white wine and parmesan", price: 15.0, category: "Mains", emoji: "🍚" },
  { id: 9, name: "Chicken Tikka Masala", description: "Tender chicken in a rich tomato and cream sauce with rice", price: 16.0, category: "Mains", emoji: "🍛" },
  {
    id: 10,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten centre and vanilla ice cream",
    price: 7.5,
    category: "Desserts",
    emoji: "🍫",
    options: [
      {
        id: "icecream",
        name: "Glace supplémentaire",
        type: "multiple",
        maxSelections: 3,
        choices: [
          { id: "vanilla", label: "Vanille", priceModifier: 1.0 },
          { id: "chocolate", label: "Chocolat", priceModifier: 1.0 },
          { id: "strawberry", label: "Fraise", priceModifier: 1.0 }
        ]
      },
      {
        id: "exclusions",
        name: "Exclusions",
        type: "multiple",
        choices: [
          { id: "icecream_default", label: "Sans glace", priceModifier: -0.5 }
        ]
      }
    ]
  },
  { id: 11, name: "Crème Brûlée", description: "Classic French vanilla custard with a caramelised sugar crust", price: 6.5, category: "Desserts", emoji: "🍮" },
  { id: 12, name: "Tiramisu", description: "Italian coffee-soaked ladyfingers with mascarpone cream", price: 7.0, category: "Desserts", emoji: "☕" },
];
