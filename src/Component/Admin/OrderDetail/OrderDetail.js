import React from 'react';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from './OrderDetail.module.scss';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../../services/UseServices';
import Loading from '../../Loading/Loading';
import Pagination from '../../Pagination/Pagination';

function OrderDetail(props) {
    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const { indexOfLastProduct, indeOfFirstProduct, productPerPage, pagination, isActive, handleNext, handlePrevious } =
        props;

    const [orderDetail, setOrderDetail] = useState([]);
    // search
    const search = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async () => {
        let res = await fetchUser('/orderItem');
        setTimeout(() => {
            return setOrderDetail(res.data);
        }, 1000);
    };

    const HandleClear = () => {
        setSearchQuery('');
    };

    const currentListOrderDetail = orderDetail.slice(indeOfFirstProduct, indexOfLastProduct);
    return (
        <div className={clsx(styles.orderDetail, 'xs:w-full md:w-[80%]')}>
            <div className={clsx(styles.orderDetail_header, 'flex-wrap')}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Quản lý đơn hàng
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Chi tiết đơn hàng</span>
                </div>

                <div className="flex my-4">
                    <div className={clsx(styles.orderDetail_header__search)}>
                        <input
                            type="text"
                            value={searchQuery}
                            placeholder="Tìm kiếm..."
                            ref={search}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                        {searchQuery && (
                            <i
                                onClick={HandleClear}
                                className={clsx(styles.orderDetail_header__xmark, 'fa-solid fa-xmark')}
                            ></i>
                        )}
                    </div>
                </div>
            </div>

            <div className={clsx(styles.orderDetail_PD, 'overflow-hidden overflow-x-scroll')}>
                <div className={clsx(styles.orderDetail_title, 'flex-wrap')}>
                    <div>
                        <h1>Chi tiết đơn hàng</h1>
                        {orderDetail ? (
                            <p style={{ marginBottom: 10 }}>
                                Hiển thị 1 đến {currentListOrderDetail.length} trong {orderDetail.length} đơn hàng
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                {currentListOrderDetail.length === 0 ? (
                    <Loading />
                ) : (
                    <motion.div
                        className="overflow-x-auto overflow-hidden pb-5"
                        initial={{ y: '4rem', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: spring,
                        }}
                    >
                        <table className={clsx(styles.table, 'border-collapse p-2 border w-[1070px]')}>
                            <thead className="border-collapse p-2">
                                <tr className="border-collapse p-2 p-2">
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Mã đơn hàng</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Mã sản phẩm</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Ảnh sản phẩm</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Tên sản phẩm</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Số lượng</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentListOrderDetail.map((order, index) => {
                                    return (
                                        <tr className="border-collapse p-2 p-2" key={order.ID}>
                                            <td className="border-collapse p-2">MDH{order.orderID}</td>
                                            <td className="border-collapse p-2">SP{order.productID}</td>
                                            <td className="border-collapse p-2">
                                                <img
                                                    className={clsx(styles.table_image)}
                                                    src={`http://localhost:3000/Image/${order.image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td className="border-collapse p-2">{order.tenSp}</td>
                                            <td className="border-collapse p-2">{order.soLuong}</td>
                                            <td className="border-collapse p-2">{VND.format(order.donGia)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {currentListOrderDetail.length > 0 && (
                            <Pagination
                                productPerPage={productPerPage}
                                pagination={pagination}
                                totalProduct={orderDetail.length}
                                isActive={isActive}
                                handleNext={handleNext}
                                handlePrevious={handlePrevious}
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default OrderDetail;
