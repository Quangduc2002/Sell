import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from './WaitConfirm.module.scss';
import { fetchUser } from '../../../services/UseServices';
import ImageOrder from '../../../assets/Image/hoaDon.png';
import { UserContext } from '../../../Context/UserContext';

function WaitConfirm(props) {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(UserContext);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
        // bỏ warning React Hook useEffect has a missing dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = async () => {
        let res = await fetchUser(`/order/${user.account.getUser.id}/waitConfirm`);
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
                                        <p className={clsx(styles.order_status__waitConfirm)}>Chờ xác nhận</p>
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
                                                            {item.tenSp}
                                                            {/* ({item.chatLieu}) */}
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

export default WaitConfirm;
