import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Views/App.css';
import Home from '../Component/Home/Home';
import LivingRoom from '../Component/LivingRoom/LivingRoom';
import Kitchen from '../Component/Kitchen/Kitchen';
import WorkRoom from '../Component/WorkRoom/WorkRoom';
import Bedroom from '../Component/Bedroom/Bedroom';
import Cart from '../Component/Cart/Cart.js';
import ProductDetails from '../Component/ProductDetails/ProductDetails.js';
import Login from '../Component/Login/Login';
import Layout from './Layout';
import path from '../Component/Ultis/Path';
import LayoutAdmin from './LayoutAdmin';
import ListProduct from '../Component/Admin/ListProduct/ListProduct';
import AddProduct from '../Component/Admin/AddProduct/AddProduct';
import EditProduct from '../Component/Admin/EditProduct/EditProduct';
import ListCustomer from '../Component/Admin/ListCustomer/ListCustomer';
import ListOrderProduct from '../Component/Admin/ListOrderProduct/ListOrderProduct';
import OrderDetail from '../Component/Admin/OrderDetail/OrderDetail';

function App() {
    const [userName, setUserName] = useState();
    const [roleId, setRoleId] = useState();

    return (
        <div className="App">
            <Routes>
                <Route
                    path={path.Login}
                    element={<Login toast={toast} setUserName={setUserName} setRoleId={setRoleId} />}
                />
                <Route path={path.Public} element={<Layout userName={userName} roleId={roleId} />}>
                    <Route index element={<Home />} />
                    <Route path={path.LivingRoom} element={<LivingRoom />} />
                    <Route path={path.Kitchen} element={<Kitchen />} />
                    <Route path={path.WorkRoom} element={<WorkRoom />} />
                    <Route path={path.Bedroom} element={<Bedroom />} />
                    <Route path={path.Cart} element={<Cart />} />
                    <Route path={path.ProductDetails} element={<ProductDetails />} />
                </Route>

                {/* Admin */}
                <Route
                    path={path.LayoutAdmin}
                    element={<LayoutAdmin userName={userName} roleId={roleId} toast={toast} />}
                >
                    <Route path={path.LayoutAdminDSDP} element={<ListProduct />} />
                    <Route path={path.LayoutAdminAdd} element={<AddProduct />} />
                    <Route path={path.LayoutAdminEdit} element={<EditProduct />} />
                    <Route path={path.LayoutAdminCustomers} element={<ListCustomer />} />
                    <Route path={path.LayoutAdminListOrders} element={<ListOrderProduct />} />
                    <Route path={path.LayoutAdminOrderDetails} element={<OrderDetail />} />
                </Route>
            </Routes>

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
