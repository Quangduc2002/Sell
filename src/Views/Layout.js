import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../Views/App.css';
import Header from '../Component/Header/Header';
import Home from '../Component/Home/Home';
import Footer from '../Component/Footer/Footer';
import LivingRoom from '../Component/LivingRoom/LivingRoom';
import Kitchen from '../Component/Kitchen/Kitchen';
import WorkRoom from '../Component/WorkRoom/WorkRoom';
import Bedroom from '../Component/Bedroom/Bedroom';
import Cart from '../Component/Cart/Cart.js';
import { toast } from 'react-toastify';
import ProductDetails from '../Component/ProductDetails/ProductDetails.js';
import path from '../Component/Ultis/Path';
import { fetchUser } from '../services/UseServices';
import OrderAll from '../Component/PurchaseOrder/OrderAll/OrderAll';
import LayoutOrder from './LayoutOrder';
import WaitConfirm from '../Component/PurchaseOrder/WaitConfirm/WaitConfirm';
import Finish from '../Component/PurchaseOrder/Finish/Finish';
import Deliver from '../Component/PurchaseOrder/Deliver/Deliver';
import Cancel from '../Component/PurchaseOrder/Cancel/Cancel';
import Profile from '../Component/Profile/Profile';
import CheckOut from '../Component/CheckOut/CheckOut.js';

function Layout(props) {
    const { roleId } = props;
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(12);
    const [isActive, setIsActive] = useState(1);
    const [count, setCount] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchs, setSearchs] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    const [allSp, setAllSp] = useState(true);
    const [name, setName] = useState([]);
    //api
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('products');
        // setName để searchs sản phẩm
        setName(res.data);
    };

    const onAdd = (product) => {
        if (product.soLuong === 0) {
            toast.error('Sản phẩm đã hết hàng !');
        } else {
            const exist = cartItems.find((cartItem) => {
                return cartItem.ID === product.ID;
            });

            if (exist) {
                setCartItems(
                    cartItems.map((cartItem) =>
                        cartItem.ID === product.ID
                            ? {
                                  ...exist,
                                  qty: count + cartItem.qty,
                                  total:
                                      (count + cartItem.qty) *
                                      parseFloat(cartItem.giaBan - (cartItem.giaBan * cartItem.giamGia) / 100),
                              }
                            : cartItem,
                    ),
                );
                toast.success('Thêm sản phẩm thành công !');
            } else {
                setCartItems([
                    ...cartItems,
                    {
                        ...product,
                        qty: count,
                        total: count * parseFloat(product.giaBan - (product.giaBan * product.giamGia) / 100),
                    },
                ]);
                toast.success('Thêm sản phẩm thành công !');
            }
            setCount(1);
        }
    };

    const onDelete = (product) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.ID !== product.ID));
        toast.success('Xóa sản phẩm thành công !');
    };

    //Tính tổng tiền
    const totalMoney = cartItems.reduce((a, c) => a + parseFloat(c.giaBan - (c.giaBan * c.giamGia) / 100) * c.qty, 0);

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

    const HandleOnSubmit = (event) => {
        setSucceSearch(filteredItems);
        setSearchQuery('');
        setAllSp(false);
    };

    const HandleSearch = () => {
        setSucceSearch(filteredProducts);
        setSearchs('');
        setAllSp(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Handle the Enter key press event
            HandleOnSubmit();
            HandleSearch();
        }
    };

    //searchs
    const filteredItems = name.filter((item) => {
        return item?.tenSp?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const filteredProducts = name.filter((item) => {
        return item?.tenSp?.toLowerCase().includes(searchs.toLowerCase());
    });

    return (
        <div className="App">
            <Header
                cartItems={cartItems}
                toast={toast}
                HandleOnSubmit={HandleOnSubmit}
                handleKeyPress={handleKeyPress}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredItems={filteredItems}
                roleId={roleId}
            />
            <Routes>
                <Route
                    path={path.Public}
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
                            setProductPerPage={setProductPerPage}
                            setSearchs={setSearchs}
                            filteredProducts={filteredProducts}
                            searchs={searchs}
                            handleKeyPress={handleKeyPress}
                        />
                    }
                />
                <Route
                    path={path.LivingRoom}
                    element={
                        <LivingRoom
                            onAdd={onAdd}
                            productPerPage={productPerPage}
                            indexOfLastProduct={indexOfLastProduct}
                            indeOfFirstProduct={indeOfFirstProduct}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            toast={toast}
                        />
                    }
                />
                <Route
                    path={path.Kitchen}
                    element={
                        <Kitchen
                            onAdd={onAdd}
                            productPerPage={productPerPage}
                            indexOfLastProduct={indexOfLastProduct}
                            indeOfFirstProduct={indeOfFirstProduct}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            toast={toast}
                        />
                    }
                />
                <Route
                    path={path.WorkRoom}
                    element={
                        <WorkRoom
                            onAdd={onAdd}
                            productPerPage={productPerPage}
                            indexOfLastProduct={indexOfLastProduct}
                            indeOfFirstProduct={indeOfFirstProduct}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            toast={toast}
                        />
                    }
                />
                <Route
                    path={path.Bedroom}
                    element={
                        <Bedroom
                            onAdd={onAdd}
                            productPerPage={productPerPage}
                            indexOfLastProduct={indexOfLastProduct}
                            indeOfFirstProduct={indeOfFirstProduct}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            toast={toast}
                        />
                    }
                />
                <Route
                    path={path.Cart}
                    element={
                        <Cart
                            count={count}
                            onAdd={onAdd}
                            cartItems={cartItems}
                            onDelete={onDelete}
                            totalMoney={totalMoney}
                            toast={toast}
                            setCartItems={setCartItems}
                        />
                    }
                />
                <Route
                    path={path.CheckOut}
                    element={
                        <CheckOut
                            cartItems={cartItems}
                            totalMoney={totalMoney}
                            toast={toast}
                            setCartItems={setCartItems}
                        />
                    }
                />

                <Route
                    path={path.ProductDetails}
                    element={<ProductDetails count={count} setCount={setCount} onAdd={onAdd} toast={toast} />}
                />
                <Route path={path.LayoutOrder} element={<LayoutOrder onAdd={onAdd} toast={toast} />}>
                    <Route path={path.LayoutOrderAll} element={<OrderAll toast={toast} />} />
                    <Route path={path.LayoutOrderWaitConfirm} element={<WaitConfirm />} />
                    <Route path={path.LayoutOrderFinish} element={<Finish />} />
                    <Route path={path.LayoutOrderDeliver} element={<Deliver />} />
                    <Route path={path.LayoutOrderCancel} element={<Cancel />} />
                </Route>

                <Route path={path.LayoutProfile} element={<Profile toast={toast} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Layout;
