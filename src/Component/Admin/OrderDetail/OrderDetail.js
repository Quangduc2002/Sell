import React from 'react';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from './OrderDetail.module.scss';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../../services/UseServices';
import Loading from '../../Loading/Loading';

function OrderDetail(props) {
    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

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

    // const currentOrders = orderDetail.slice(indeOfFirstProduct, indexOfLastProduct);

    let tongOrder = 0;
    for (let i = 0; i < orderDetail.length; i++) {
        tongOrder += orderDetail[i].Product.length;
    }

    return (
        <div className={clsx(styles.orderDetail)}>
            <div className={clsx(styles.orderDetail_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Quản lý đơn hàng
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Chi tiết đơn hàng</span>
                </div>
                <div style={{ display: 'flex' }}>
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
            <div className={clsx(styles.orderDetail_PD)}>
                <div className={clsx(styles.orderDetail_title)}>
                    <div>
                        <h1>Chi tiết đơn hàng</h1>
                        {orderDetail ? (
                            <p style={{ marginBottom: 10 }}>
                                Hiển thị 1 đến {tongOrder} trong {tongOrder} đơn hàng
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                {orderDetail.length === 0 ? (
                    <Loading />
                ) : (
                    <motion.table
                        className={clsx(styles.table)}
                        initial={{ y: '4rem', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: spring,
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Ảnh sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail.map((order, index) => {
                                return orderDetail[index].Product.map((orderSp) => {
                                    return (
                                        <tr key={orderSp._id}>
                                            <td>MDH{order.MaSp}</td>
                                            <td>
                                                <img
                                                    className={clsx(styles.table_image)}
                                                    src={`http://localhost:3000/Image/${orderSp.Image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{orderSp.TenSp}</td>
                                            <td>{orderSp.qty}</td>
                                            <td>{VND.format(orderSp.total)}</td>
                                        </tr>
                                    );
                                });
                            })}
                        </tbody>
                    </motion.table>
                )}
            </div>
        </div>
    );
}

export default OrderDetail;
