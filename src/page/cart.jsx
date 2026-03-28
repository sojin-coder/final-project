import { useEffect, useState } from "react";

function Cart({ setCartCount }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
    setCartCount(data.length);
  }, []);

  return (
    <div className="p-10">
      <h1>Cart</h1>
      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price}
        </div>
      ))}
    </div>
  );
}

export default Cart;