import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../Views/App.css';
import Header from '../Component/Header/Header';
import Home from '../Component/Home/Home';
import Footer from '../Component/Footer/Footer';
import LivingRoom from '../Component/LivingRoom/LivingRoom';
import Kitchen from '../Component/Kitchen/Kitchen';
import WorkRoom from '../Component/WorkRoom/WorkRoom';
import Bedroom from '../Component/Bedroom/Bedroom';
import Cart from '../Component/Cart/Cart.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((cartItem) => {
            return cartItem.id === product.id;
        });

        if (exist) {
            setCartItems(
                cartItems.map((cartItem) => (cartItem.id === product.id ? { ...exist, qty: exist.qty + 1 } : cartItem)),
            );
            toast.success('Thêm sản phẩm thành công !');
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
            toast.success('Thêm sản phẩm thành công !');
        }
    };

    const onDelete = (product) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));
        toast.success('Xóa sản phẩm thành công !');
    };

    //Tính tổng tiền
    const total = cartItems.reduce((a, c) => a + parseFloat(c.sellingPrice) * c.qty, 0);

    return (
        <div className="App">
            <Header cartItems={cartItems} toast={toast} />
            <Routes>
                <Route path="/home" element={<Home onAdd={onAdd} />} />
                <Route path="/phongkhach" element={<LivingRoom onAdd={onAdd} />} />
                <Route path="/phongbep" element={<Kitchen onAdd={onAdd} />} />
                <Route path="/phonglamviec" element={<WorkRoom onAdd={onAdd} />} />
                <Route path="/phongngu" element={<Bedroom onAdd={onAdd} />} />
                <Route
                    path="/giohang"
                    element={<Cart onAdd={onAdd} cartItems={cartItems} onDelete={onDelete} total={total} />}
                />
            </Routes>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default View;
