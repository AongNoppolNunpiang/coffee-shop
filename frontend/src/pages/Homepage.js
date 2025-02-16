import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Homepage.css"; // Keep this for custom styles

const allProducts = [
  { id: 1, name: "Light Roast", emoji: "☕", category: "Coffee" },
  { id: 2, name: "Medium Roast", emoji: "☕", category: "Coffee" },
  { id: 3, name: "Dark Roast", emoji: "☕", category: "Coffee" },
  { id: 4, name: "Espresso", emoji: "☕", category: "Coffee" },
  { id: 5, name: "Cappuccino", emoji: "☕", category: "Coffee" },
  { id: 6, name: "Latte", emoji: "☕", category: "Coffee" },
  { id: 7, name: "Orange Juice", emoji: "🍊", category: "Juice" },
  { id: 8, name: "Apple Juice", emoji: "🍎", category: "Juice" },
  { id: 9, name: "Lemonade", emoji: "🍋", category: "Juice" },
  { id: 10, name: "Green Tea", emoji: "🍵", category: "Tea" },
  { id: 11, name: "Black Tea", emoji: "🍵", category: "Tea" },
  { id: 12, name: "Cake Slice", emoji: "🍰", category: "Cake" },
  { id: 13, name: "Cheese Cake", emoji: "🍰", category: "Cake" },
  { id: 14, name: "R & B", emoji: "🌱", category: "Coffee Beans" },
  { id: 15, name: "Ethiopian", emoji: "🌱", category: "Coffee Beans" },
  { id: 16, name: "Brazilian", emoji: "🌱", category: "Coffee Beans" },
];

const ProductCard = ({ product, onAddToOrder }) => (
  <div className="product-card" onClick={() => onAddToOrder(product)}>
    <div className="product-emoji">{product.emoji}</div>
    <div className="product-name">{product.name}</div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(allProducts);
  const [order, setOrder] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  const handleLogout = () => {
    // logout logic (clearing user session)
    navigate("/login"); // Redirect to login page
  };

  const handleAddToOrder = (product) => {
    setOrder((prevOrder) => [...prevOrder, product]);
  };

  const handleRemoveFromOrder = (productId) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== productId));
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">☕</div>
        <button className="menu-btn">Menu</button>
        <button className="cart-btn">Cart</button>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>{" "}
        {/* add handleLogout*/}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="username">User007</div>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {["All", "Coffee", "Tea", "Juice", "Cake", "Coffee Beans"].map(
            (category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Product List */}
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToOrder={handleAddToOrder}
            />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2 className="order-title">Order</h2>
        <div className="order-list">
          {order.length === 0 ? (
            <p>Your order is empty</p>
          ) : (
            order.map((product) => (
              <div key={product.id} className="order-item">
                <div className="order-item-name">{product.name}</div>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveFromOrder(product.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <input
          type="text"
          className="order-input"
          placeholder="Enter order..."
        />
        <button className="purchase-btn">Purchase</button>
      </div>
    </div>
  );
};

export default HomePage;
