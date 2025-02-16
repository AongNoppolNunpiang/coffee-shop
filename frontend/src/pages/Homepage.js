import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  saveOrderToLocalStorage,
  getOrderFromLocalStorage,
} from "../utils/localStorage";

import "./Homepage.css"; // Keep this for custom styles
// import espressoImage from "../assets/espresso.png"; // นำเข้า image
// import cappuccinoImage from "../assets/cappuccino.png"; // นำเข้า image
// import latteImage from "../assets/latte.png"; // นำเข้า image

const allProducts = [
  { id: 1, name: "Light Roast", emoji: "☕", category: "Coffee", price: 50 },
  { id: 2, name: "Medium Roast", emoji: "☕", category: "Coffee", price: 55 },
  { id: 3, name: "Dark Roast", emoji: "☕", category: "Coffee", price: 60 },
  {
    id: 4,
    name: "Espresso",
    emoji: "☕",
    category: "Coffee",
    price: 70,
  },
  {
    id: 5,
    name: "Cappuccino",
    emoji: "☕",
    category: "Coffee",
    price: 75,
  },
  {
    id: 6,
    name: "Latte",
    emoji: "☕",
    category: "Coffee",
    price: 80,
  },
  { id: 7, name: "Orange Juice", emoji: "🍊", category: "Juice", price: 40 },
  { id: 8, name: "Apple Juice", emoji: "🍎", category: "Juice", price: 45 },
  { id: 9, name: "Lemonade", emoji: "🍋", category: "Juice", price: 50 },
  { id: 10, name: "Green Tea", emoji: "🍵", category: "Tea", price: 55 },
  { id: 11, name: "Black Tea", emoji: "🍵", category: "Tea", price: 50 },
  { id: 12, name: "Cake Slice", emoji: "🍰", category: "Cake", price: 90 },
  { id: 13, name: "Cheese Cake", emoji: "🍰", category: "Cake", price: 100 },
  { id: 14, name: "R & B", emoji: "🌱", category: "Coffee Beans", price: 120 },
  {
    id: 15,
    name: "Ethiopian",
    emoji: "🌱",
    category: "Coffee Beans",
    price: 130,
  },
  {
    id: 16,
    name: "Brazilian",
    emoji: "🌱",
    category: "Coffee Beans",
    price: 110,
  },
];

const ProductCard = ({ product, onAddToOrder }) => (
  <div className="product-card" onClick={() => onAddToOrder(product)}>
    <div className="product-emoji">{product.emoji}</div>
    <div className="product-name">{product.name}</div>
    <div className="product-price">฿{product.price}</div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(allProducts);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  useEffect(() => {
    const savedData = getOrderFromLocalStorage();
    setOrder(savedData.order);
    setTotalPrice(savedData.totalPrice);
  }, []);

  // Save order to localStorage when it changes
  useEffect(() => {
    saveOrderToLocalStorage(order, totalPrice);
  }, [order, totalPrice]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setProducts(
      category === "All"
        ? allProducts
        : allProducts.filter((product) => product.category === category)
    );
  };

  const handleLogout = () => {
    // logout logic (clearing user session)
    navigate("/login"); // Redirect to login page
  };

  const handleAddToOrder = (product) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === product.id);
      return existingItem
        ? prevOrder.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevOrder, { ...product, quantity: 1 }];
    });
    setTotalPrice((prevTotal) => prevTotal + product.price);
  };

  const handleRemoveFromOrder = (productId) => {
    // Reduce quantity
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === productId);
      if (!existingItem) return prevOrder;

      const newOrder =
        existingItem.quantity > 1
          ? prevOrder.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          : prevOrder.filter((item) => item.id !== productId);

      setTotalPrice((prevTotal) => Math.max(0, prevTotal - existingItem.price));
      return newOrder;
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setProducts(
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    );
  };

  const handleViewCart = () => {
    navigate("/cart", { state: { order, totalPrice } });
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">☕</div>
        <button className="menu-btn">Menu</button>
        <button className="cart-btn" onClick={handleViewCart}>
          Cart ({order.reduce((total, item) => total + item.quantity, 0)})
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>{" "}
        {/* add handleLogout*/}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={handleSearch}
          />
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
                <div className="order-item-name">
                  {product.name} - ฿{product.price} x {product.quantity}
                </div>
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
        {/* Total Price Display */}
        <h3 className="total-price">
          Total: ฿{totalPrice} (
          {order.reduce((total, item) => total + item.quantity, 0)} items)
        </h3>
        <button className="purchase-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default HomePage;
