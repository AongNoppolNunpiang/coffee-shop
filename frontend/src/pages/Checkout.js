import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css"; // Create this file for styling
import qrCodeImage from "../assets/qrcode.jpg"; // Import QR code image


const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, totalPrice } = location.state || { order: [], totalPrice: 0 };
  
  const [selectedPayment, setSelectedPayment] = useState("credit-card");

  const handleConfirmPayment = () => {
    alert("Payment successful! Thank you for your order.");
    navigate("/"); // Redirect to homepage after successful payment
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Details</h3>
        {order.map((item) => (
          <div key={item.id} className="order-item">
            {item.name} x {item.quantity} - ฿{item.price * item.quantity}
          </div>
        ))}
        <h3>Total: ฿{totalPrice}</h3>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        {/* <label>
          <input
            type="radio"
            name="payment"
            value="credit-card"
            checked={selectedPayment === "credit-card"}
            onChange={() => setSelectedPayment("credit-card")}
          />{" "}
          Credit/Debit Card
        </label> */}
        <label>
          <input
            type="radio"
            name="payment"
            value="bank-transfer"
            checked={selectedPayment === "bank-transfer"}
            onChange={() => setSelectedPayment("bank-transfer")}
          />{" "}
          Scan QRCode
        </label>
        {selectedPayment === "bank-transfer" && (
          <div className="qr-code-container">
            <p>Scan this QR Code to make a payment:</p>
            <img src={qrCodeImage} alt="QR Code" className="qr-code" />
          </div>
        )}
        <label>
          <input
            type="radio"
            name="payment"
            value="cash-on-delivery"
            checked={selectedPayment === "cash-on-delivery"}
            onChange={() => setSelectedPayment("cash-on-delivery")}
          />{" "}
          Cash on Delivery
        </label>
      </div>

      {/* Confirm Payment Button */}
      <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
        Confirm Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
