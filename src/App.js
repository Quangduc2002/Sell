import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import Footer from "./Component/Footer/Footer";
import LivingRoom from "./Component/LivingRoom/LivingRoom";
import Kitchen from "./Component/Kitchen/Kitchen";
import WorkRoom from "./Component/WorkRoom/WorkRoom";
import Bedroom from "./Component/Bedroom/Bedroom";
import { useState } from "react";
import Cart from "./Component/Cart/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => {
      return x.id === product.id;
    });

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onDelete = (product) => {
    setCartItems(cartItems.filter((x) => x.id !== product.id));
  };

  const total = cartItems.reduce(
    (a, c) => a + parseFloat(c.sellingPrice) * c.qty,
    0
  );
  return (
    <div className="App">
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="*" element={<Home onAdd={onAdd} />} />
        <Route path="/" element={<Home onAdd={onAdd} />} />
        <Route path="/phongkhach" element={<LivingRoom onAdd={onAdd} />} />
        <Route path="/phongbep" element={<Kitchen onAdd={onAdd} />} />
        <Route path="/phonglamviec" element={<WorkRoom onAdd={onAdd} />} />
        <Route path="/phongngu" element={<Bedroom onAdd={onAdd} />} />
        <Route
          path="/giohang"
          element={
            <Cart
              onAdd={onAdd}
              cartItems={cartItems}
              onDelete={onDelete}
              total={total}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
