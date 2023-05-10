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
import ProductDetails from '../Component/ProductDetails/ProductDetails.js';
import useFetch from '../Component/Customize/Fetch';
// import { useNavigate } from 'react-router-dom';
// import Login from '../Component/Login/Login';

function App() {
    const { api: name } = useFetch('https://6405c39a40597b65de406630.mockapi.io/api/Products');
    const [cartItems, setCartItems] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const [isActive, setIsActive] = useState(1);
    const [count, setCount] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    const [allSp, setAllSp] = useState(true);

    const onAdd = (product) => {
        const exist = cartItems.find((cartItem) => {
            return cartItem.id === product.id;
        });

        if (exist) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === product.id
                        ? {
                              ...exist,
                              qty: count + cartItem.qty,
                              total: (count + cartItem.qty) * parseFloat(cartItem.sellingPrice),
                          }
                        : cartItem,
                ),
            );
            toast.success('Thêm sản phẩm thành công !');
        } else {
            setCartItems([...cartItems, { ...product, qty: count, total: count * parseFloat(product.sellingPrice) }]);
            toast.success('Thêm sản phẩm thành công !');
        }
        setCount(1);
    };

    const onDelete = (product) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));
        toast.success('Xóa sản phẩm thành công !');
    };

    //Tính tổng tiền
    const totalMoney = cartItems.reduce((a, c) => a + parseFloat(c.sellingPrice) * c.qty, 0);

    // Pagination
    // chỉ mục cuối sản phẩm
    const indexOfLastProduct = currentPage * productPerPage;
    // chỉ mục đầu tiên sản phẩm
    const indeOfFirstProduct = indexOfLastProduct - productPerPage;

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        // check active color
        setIsActive(pageNumber);
    };

    const handleNext = () => {
        setIsActive(isActive + 1);
        setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        setIsActive(isActive - 1);
        setCurrentPage(currentPage - 1);
    };

    // Tăng số sản phẩm trong trang chi tiết sản phẩm
    const handleIncreaseProduct = () => {
        setCount(count + 1);
    };

    const handleProductreduction = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const HandleOnSubmit = (event) => {
        setSucceSearch(filteredItems);
        setSearchQuery('');
        setAllSp(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Handle the Enter key press event
            HandleOnSubmit();
        }
    };

    //search
    const filteredItems = name.filter((item) => {
        return item.text.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
                HandleOnSubmit={HandleOnSubmit}
                handleKeyPress={handleKeyPress}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredItems={filteredItems}
            />
            {/* {email === 'Quangduc2002@gmail.com' && password === '221202' ? ( */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            onAdd={onAdd}
                            productPerPage={productPerPage}
                            indexOfLastProduct={indexOfLastProduct}
                            indeOfFirstProduct={indeOfFirstProduct}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            succeSearch={succeSearch}
                            allSp={allSp}
                            setAllSp={setAllSp}
                        />
                    }
                />
                <Route path="/phongkhach" element={<LivingRoom onAdd={onAdd} />} />
                <Route path="/phongbep" element={<Kitchen onAdd={onAdd} />} />
                <Route path="/phonglamviec" element={<WorkRoom onAdd={onAdd} />} />
                <Route path="/phongngu" element={<Bedroom onAdd={onAdd} />} />
                <Route
                    path="/giohang"
                    element={
                        <Cart
                            count={count}
                            onAdd={onAdd}
                            cartItems={cartItems}
                            onDelete={onDelete}
                            totalMoney={totalMoney}
                        />
                    }
                />
                <Route
                    path="/Chitietsanpham/:id"
                    element={
                        <ProductDetails
                            count={count}
                            handleIncreaseProduct={handleIncreaseProduct}
                            handleProductreduction={handleProductreduction}
                            onAdd={onAdd}
                        />
                    }
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
