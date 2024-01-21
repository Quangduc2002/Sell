import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, useScroll } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import '../Views/App.css';
import './index.css';
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
import Statistic from '../Component/Admin/Statistic/Statistic';
import LayoutOrder from './LayoutOrder';
import OrderAll from '../Component/PurchaseOrder/OrderAll/OrderAll';
import WaitConfirm from '../Component/PurchaseOrder/WaitConfirm/WaitConfirm';
import Finish from '../Component/PurchaseOrder/Finish/Finish';
import Deliver from '../Component/PurchaseOrder/Deliver/Deliver';
import Cancel from '../Component/PurchaseOrder/Cancel/Cancel';
import Profile from '../Component/Profile/Profile';
import Trash from '../Component/Admin/Trash/Trash';
import LayoutLogin from './LayoutLogin';
import Recover from '../Component/ForgotPassword/Recover/Recover';
import FindAccounts from '../Component/ForgotPassword/FindAcounts/FindAcounts';
import EnterCode from '../Component/ForgotPassword/EnterCode/EnterCode';
import PasswordNew from '../Component/ForgotPassword/PasswordNew/PasswordNew';
import AddUsers from '../Component/Admin/AddUsers/AddUsers.js';
import CheckOut from '../Component/CheckOut/CheckOut.js';

function App() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="App">
            <motion.div
                className="scroll"
                style={{
                    scaleX: scrollYProgress,
                }}
            ></motion.div>
            <Routes>
                <Route path={path.LayoutLogin} element={<LayoutLogin toast={toast} />}>
                    <Route path={path.Login} element={<Login />} />
                    <Route path={path.FindAccounts} element={<FindAccounts />} />
                    <Route path={path.Recover} element={<Recover />} />
                    <Route path={path.EnterCode} element={<EnterCode />} />
                    <Route path={path.PassWordNew} element={<PasswordNew />} />
                </Route>

                <Route path={path.Public} exact={true} element={<Layout toast={toast} />}>
                    <Route path={path.Public} element={<Home />} />
                    <Route path={path.LivingRoom} element={<LivingRoom />} />
                    <Route path={path.Kitchen} element={<Kitchen />} />
                    <Route path={path.WorkRoom} element={<WorkRoom />} />
                    <Route path={path.Bedroom} element={<Bedroom />} />
                    <Route path={path.Cart} element={<Cart />} />
                    <Route path={path.CheckOut} element={<CheckOut />} />
                    <Route path={path.ProductDetails} element={<ProductDetails />} />
                    <Route path={path.LayoutOrderAll} element={<OrderAll />} />
                    <Route path="*" />
                    {/* Order */}
                    <Route path={path.LayoutOrder} element={<LayoutOrder toast={toast} />}>
                        <Route path={path.LayoutOrderAll} element={<OrderAll />} />
                        <Route path={path.LayoutOrderWaitConfirm} element={<WaitConfirm />} />
                        <Route path={path.LayoutOrderFinish} element={<Finish toast={toast} />} />
                        <Route path={path.LayoutOrderDeliver} element={<Deliver />} />
                        <Route path={path.LayoutOrderCancel} element={<Cancel />} />
                    </Route>

                    <Route path={path.LayoutProfile} element={<Profile toast={toast} />} />
                </Route>

                {/* Admin */}
                <Route path={path.LayoutAdmin} element={<LayoutAdmin toast={toast} />}>
                    <Route path={path.LayoutAdminStatistic} element={<Statistic />} />
                    <Route path={path.LayoutAdminDSDP} element={<ListProduct />} />
                    <Route path={path.LayoutAdminTrash} element={<Trash />} />
                    <Route path={path.LayoutAdminAdd} element={<AddProduct />} />
                    <Route path={path.LayoutAdminEdit} element={<EditProduct />} />
                    <Route path={path.LayoutAdminCustomers} element={<ListCustomer />} />
                    <Route path={path.LayoutAdminAddCustomers} element={<AddUsers />} />
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
