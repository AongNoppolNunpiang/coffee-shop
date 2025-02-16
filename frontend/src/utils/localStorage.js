export const saveOrderToLocalStorage = (order, totalPrice) => {
  localStorage.setItem("order", JSON.stringify(order));
  localStorage.setItem("totalPrice", totalPrice);
};

export const getOrderFromLocalStorage = () => {
  return {
    order: JSON.parse(localStorage.getItem("order")) || [],
    totalPrice: parseFloat(localStorage.getItem("totalPrice")) || 0,
  };
};
