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
import { useNavigate } from 'react-router-dom';
// import Login from '../Component/Login/Login';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    const navigate = useNavigate();
    const handleSubmitBT = () => {
        // event.preventDefault();
        //preventDefault() dùng để ngăn chặn hành vi mặc định của trình duyệt
        // axios
        //     .post('https://reqres.in/api/login/1', { email, password })
        //     .then((response) => {
        if (email === 'Quangduc2002@gmail.com' && password === '221202') {
            navigate('/abc');
            // setShow(!show);
            toast.success('Đăng nhập thành công');
        } else if (email !== '' && password !== '') {
            toast.error('Tài đăng nhập không chính xác');
        }
        // })
        // .catch((err) => {
        //     console.log('lỗi', err);
        // });
    };
    return (
        <div className="App">
            {/* <Routes>
                <Route path="/" element={<Login onAdd={onAdd} />} />
            </Routes> */}
            <Header
                cartItems={cartItems}
                toast={toast}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmitBT={handleSubmitBT}
            />
            {/* {email === 'Quangduc2002@gmail.com' && password === '221202' ? ( */}
            <Routes>
                <Route path="/" element={<Home onAdd={onAdd} />} />
                <Route path="/phongkhach" element={<LivingRoom onAdd={onAdd} />} />
                <Route path="/phongbep" element={<Kitchen onAdd={onAdd} />} />
                <Route path="/phonglamviec" element={<WorkRoom onAdd={onAdd} />} />
                <Route path="/phongngu" element={<Bedroom onAdd={onAdd} />} />
                <Route
                    path="/giohang"
                    element={<Cart onAdd={onAdd} cartItems={cartItems} onDelete={onDelete} total={total} />}
                />
            </Routes>
            {/* ) : (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/phongkhach" element={<LivingRoom />} />
                    <Route path="/phongbep" element={<Kitchen />} />
                    <Route path="/phonglamviec" element={<WorkRoom />} />
                    <Route path="/phongngu" element={<Bedroom />} />
                    <Route path="/giohang" element={<Cart cartItems={cartItems} onDelete={onDelete} total={total} />} />
                </Routes>
            )} */}
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                // pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default App;
