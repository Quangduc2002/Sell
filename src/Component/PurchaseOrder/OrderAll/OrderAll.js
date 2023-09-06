import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { motion, spring } from 'framer-motion';
import styles from './OrderAll.module.scss';
import { fetchUser } from '../../../services/UseServices';
import Free from '../../../assets/Image/free.png';
import ImageOrder from '../../../assets/Image/hoaDon.png';

function OrderAll(props) {
    const { onAdd, toast } = props;
    const [orders, setOrders] = useState([]);
    const [cancel, setCancel] = useState(false);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
    }, [cancel]);

    const getUsers = async () => {
        let res = await fetchUser(`/order/${JSON.parse(localStorage.account).id}/getOrder`);
        setOrders(res.data);
    };

    const cancelOrder = (ID) => {
        axios
            .put(`http://localhost:8080/order/${ID}/cancelOrder`, {
                trangThaiDH: 3,
            })
            .then((res) => {
                setCancel(!cancel);
                toast.success('Hủy đơn hàng thành công !');
            })
            .catch((err) => {
                console.log(err);
            });
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
            {orders.length === 0 ? (
                <div className={clsx(styles.order_ImageOrder)}>
                    <div style={{ textAlign: 'center' }}>
                        <img alt="" src={ImageOrder} />
                        <p>Chưa có đơn hàng</p>
                    </div>
                </div>
            ) : (
                orders.map((order, index) => {
                    let totalOrder = 0;
                    for (let i = 0; i < order.length; i++) {
                        totalOrder += order[i].donGia;
                    }
                    return (
                        <div key={index} className={clsx(styles.order_container)}>
                            <div style={{ padding: 24, marginBottom: 10 }}>
                                <div className={clsx(styles.order_header)}>
                                    <div className={clsx(styles.order_header__left)}>
                                        <p className={clsx(styles.order_header__left__favourite)}>Yêu thích</p>
                                        <p className={clsx(styles.order_header__left__shop)}>QuangDucShop</p>
                                    </div>
                                    <div className={clsx(styles.order_status)}>
                                        {order[0].order.trangThaiDH === 0 ? (
                                            <p className={clsx(styles.order_status__waitConfirm)}>Chờ xác nhận</p>
                                        ) : order[0].order.trangThaiDH === 3 ? (
                                            <p className={clsx(styles.order_status__waitConfirm)}>Đã hủy</p>
                                        ) : (
                                            <>
                                                <img className={clsx(styles.order_status__img)} alt="" src={Free} />
                                                <p>Giao hàng thành công</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.order_body)}>
                                    {order.map((item) => {
                                        return (
                                            <div key={item.ID} className={clsx(styles.order_product)}>
                                                <div className={clsx(styles.order_product__left)}>
                                                    <img
                                                        className={clsx(styles.order_product__img)}
                                                        alt=""
                                                        src={`http://localhost:3000/Image/${item.image}`}
                                                    />
                                                    <div>
                                                        <p className={clsx(styles.order_product__name)}>
                                                            {item.tenSp} ({item.chatLieu})
                                                        </p>
                                                        <p className={clsx(styles.order_product__numberOf)}>
                                                            Kích thước: {item.kichThuoc}
                                                        </p>
                                                        <p className={clsx(styles.order_product__numberOf)}>
                                                            Số lượng: x{item.soLuong}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={clsx(styles.order_product__right)}>
                                                    <span className={clsx(styles.order_product__right__discount)}>
                                                        {VND.format(item.giaBan)}
                                                    </span>
                                                    <span className={clsx(styles.order_product__right__price)}>
                                                        {VND.format(item.giaBan - (item.giaBan * item.giamGia) / 100)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                            {VND.format(totalOrder)}
                                        </span>
                                    </div>
                                    <div className={clsx(styles.order_purchase)}>
                                        {order[0].order.trangThaiDH === 0 ? (
                                            <button
                                                onClick={() => cancelOrder(order[0].order.ID)}
                                                className={clsx(styles.order_purchase__btn)}
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        ) : order[0].order.trangThaiDH === 1 ? (
                                            <button
                                                onClick={() => onAdd(order)}
                                                className={clsx(styles.order_purchase__btn)}
                                            >
                                                Mua lại
                                            </button>
                                        ) : (
                                            <button className={clsx(styles.order_cancel__btn)}>Đơn hàng đã hủy</button>
                                        )}
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

export default OrderAll;
