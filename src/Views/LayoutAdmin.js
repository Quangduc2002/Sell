import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import path from '../Component/Ultis/Path';
import ListProduct from '../Component/Admin/ListProduct/ListProduct';
import AddProduct from '../Component/Admin/AddProduct/AddProduct';
import EditProduct from '../Component/Admin/EditProduct/EditProduct';
import Sidebar from '../Component/Admin/Sidebar/Sidebar';
import ListCustomer from '../Component/Admin/ListCustomer/ListCustomer';
import ListOrderProduct from '../Component/Admin/ListOrderProduct/ListOrderProduct';
import OrderDetail from '../Component/Admin/OrderDetail/OrderDetail';
import Statistic from '../Component/Admin/Statistic/Statistic';
import './Admin.css';
import Trash from '../Component/Admin/Trash/Trash';

function LayoutAdmin(props) {
    const { toast } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const [isActive, setIsActive] = useState(1);

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

    return (
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route
                    path={path.LayoutAdminStatistic}
                    element={
                        <Statistic
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
                    path={path.LayoutAdminDSDP}
                    element={
                        <ListProduct
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
                <Route path={path.LayoutAdminAdd} element={<AddProduct toast={toast} />} />
                <Route path={path.LayoutAdminEdit} element={<EditProduct toast={toast} />} />
                <Route
                    path={path.LayoutAdminTrash}
                    element={
                        <Trash
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
                    path={path.LayoutAdminCustomers}
                    element={
                        <ListCustomer
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
                    path={path.LayoutAdminListOrders}
                    element={
                        <ListOrderProduct
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
                    path={path.LayoutAdminOrderDetails}
                    element={
                        <OrderDetail
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
            </Routes>
        </div>
    );
}

export default LayoutAdmin;
