import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from './Deliver.module.scss';
import { fetchUser } from '../../../services/UseServices';
import ImageOrder from '../../../assets/Image/hoaDon.png';

function Deliver(props) {
    const [orders, setOrders] = useState([]);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser(`/order/${JSON.parse(localStorage.account).id}/waitConfirm`);
        setOrders(res.data);
    };

    return (
        <motion.div
            className={clsx(styles.order)}
            initial={{ y: '4rem', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 1,
                type: spring,
            }}
        >
            {orders.length !== 0 ? (
                <div className={clsx(styles.order_ImageOrder)}>
                    <div style={{ textAlign: 'center' }}>
                        <img alt="" src={ImageOrder} />
                        <p>Chưa có đơn hàng</p>
                    </div>
                </div>
            ) : (
                orders.map((order) => {
                    return (
                        <div key={order.orderitems.ID} className={clsx(styles.order_container)}>
                            <div style={{ padding: 24, marginBottom: 10 }}>
                                <div className={clsx(styles.order_header)}>
                                    <div className={clsx(styles.order_header__left)}>
                                        <p className={clsx(styles.order_header__left__favourite)}>Yêu thích</p>
                                        <p className={clsx(styles.order_header__left__shop)}>QuangDucShop</p>
                                    </div>
                                    <div className={clsx(styles.order_status)}>
                                        <p className={clsx(styles.order_status__waitConfirm)}>Chờ xác nhận</p>
                                    </div>
                                </div>

                                <div className={clsx(styles.order_product)}>
                                    <div className={clsx(styles.order_product__left)}>
                                        <img
                                            className={clsx(styles.order_product__img)}
                                            alt=""
                                            src={`http://localhost:3000/Image/${order.orderitems.image}`}
                                        />
                                        <div>
                                            <p className={clsx(styles.order_product__name)}>
                                                {order.orderitems.tenSp} ({order.orderitems.chatLieu})
                                            </p>
                                            <p className={clsx(styles.order_product__numberOf)}>
                                                Kích thước: {order.orderitems.kichThuoc}
                                            </p>
                                            <p className={clsx(styles.order_product__numberOf)}>
                                                Số lượng: x{order.orderitems.soLuong}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={clsx(styles.order_product__right)}>
                                        <span className={clsx(styles.order_product__right__discount)}>
                                            {VND.format(order.orderitems.giaBan)}
                                        </span>
                                        <span className={clsx(styles.order_product__right__price)}>
                                            {VND.format(
                                                order.orderitems.giaBan -
                                                    (order.orderitems.giaBan * order.orderitems.giamGia) / 100,
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className={clsx(styles.order_bottom)}>
                                    <div className={clsx(styles.order_total)}>
                                        <span>Thành tiền: </span>
                                        <span
                                            className={clsx(
                                                styles.order_product__right__price,
                                                styles.order_total__price,
                                            )}
                                        >
                                            {VND.format(order.orderitems.donGia)}
                                        </span>
                                    </div>
                                    <div className={clsx(styles.order_purchase)}>
                                        <button className={clsx(styles.order_purchase__btn)}>Hủy đơn hàng</button>
                                        <button className={clsx(styles.order_purchase__btnContact)}>
                                            Liên hệ người bán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </motion.div>
    );
}

export default Deliver;
