import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css"; // Make sure Cart.css includes the styles from home page

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, totalPrice } = location.state || { order: [], totalPrice: 0 };

  const handleHomePage = () => {
    navigate("/"); // Navigate to homepage
  };

  const handleLogout = () => {
    // logout logic
    navigate("/login");
  };

  // Calculate Subtotal (Price * Quantity)
  const calculateSubtotal = (price, quantity) => price * quantity;

  // Calculate Total with free shipping
  const subtotal = order.reduce(
    (total, item) => total + calculateSubtotal(item.price, item.quantity),
    0
  );


  const handleCheckout = () => {
    // Redirect to checkout page (you can add your checkout logic here)
    navigate("/checkout", { state: { order, totalPrice } });
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo" onClick={handleHomePage}>
          ☕
        </div>
        <button className="menu-btn" onClick={handleHomePage}>
          Menu
        </button>
        <button className="cart-btn" disabled>
          Cart ({order.reduce((total, item) => total + item.quantity, 0)})
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Shopping Cart</h2>
        <div className="cart-list">
          {order.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            order.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="cart-item-name">{product.name}</div>
                <div className="cart-item-price">฿{product.price}</div>
                <div className="cart-item-quantity">{product.quantity}</div>
                <div className="cart-item-subtotal">
                  ฿{calculateSubtotal(product.price, product.quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Total Section */}
        <div className="cart-total">
          <div className="cart-total-item">
            <span>Total</span>
            <span>฿{subtotal}</span>
          </div>
          <div className="cart-total-item">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <button className="process-checkout-btn" onClick={handleCheckout}>
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
