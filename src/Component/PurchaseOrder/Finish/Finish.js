import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from './Finish.module.scss';
import { fetchUser } from '../../../services/UseServices';
import Free from '../../../assets/Image/free.png';
import ImageOrder from '../../../assets/Image/hoaDon.png';

function Finish(props) {
    const { toast, handleStar, checkStar, setCheckStar, show, setShow, show1, setShow1 } = props;
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [changeRating, setChangeRating] = useState(false);

    const stars = [
        { id: 1, class: 'star-1' },
        { id: 2, class: 'star-2' },
        { id: 3, class: 'star-3' },
        { id: 4, class: 'star-4' },
        { id: 5, class: 'star-5' },
    ];

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
        getRating();
    }, [changeRating]);

    const getUsers = async () => {
        let res = await fetchUser(`/order/${JSON.parse(localStorage.account).id}/finish`);
        setOrders(res.data);
    };

    const hanldeEvaluate = async (id) => {
        setShow(!show);
        let res = await fetchUser(`/orderItem/${id}/orderFinish`);
        setOrderDetails(res.data);
    };

    const hanldeSeeEvaluate = async (id) => {
        setShow1(!show1);
        let res = await fetchUser(`/orderItem/${id}/orderFinish`);
        setOrderDetails(res.data);
    };

    const getRating = async () => {
        let res = await fetchUser(`/products/${JSON.parse(localStorage.account).id}/getRating`);
        setTimeout(() => setRatings(res.data), 1000);
    };

    const handleSubmitEvaluate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8080/products/rating`, {
                userId: JSON.parse(localStorage.account).id,
                checkStar: checkStar,
            })
            .then((res) => {
                toast.success('Đánh giá thành công !');
                setChangeRating(!changeRating);
                setCheckStar([]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(orders);
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
                                    <div className={clsx(styles.order_header__right)}>
                                        <div className={clsx(styles.order_status)}>
                                            <img className={clsx(styles.order_status__img)} alt="" src={Free} />
                                            <p>Giao hàng thành công</p>
                                        </div>
                                        <p
                                            onClick={() => hanldeEvaluate(order[0].orderID)}
                                            className={clsx(styles.order_header__right__review)}
                                        >
                                            Đánh giá
                                        </p>
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
                                        {order[0].Order.trangThaiDH === 0 ? (
                                            <button className={clsx(styles.order_purchase__btn)}>Hủy đơn hàng</button>
                                        ) : (
                                            <button className={clsx(styles.order_purchase__btn)}>Mua lại</button>
                                        )}
                                        <button className={clsx(styles.order_purchase__btnContact)}>
                                            Liên hệ người bán
                                        </button>
                                        <button
                                            onClick={() => hanldeSeeEvaluate(order[0].orderID)}
                                            className={clsx(styles.order_purchase__btnContact)}
                                        >
                                            Xem đánh giá shop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            {show && (
                <>
                    <div onClick={() => setShow(!show)} className={clsx(styles.modal1)}></div>

                    <div className={clsx(styles.modal_container)}>
                        <div className={clsx(styles.modal_header)}>
                            <h5 className="modal-title">Đánh giá sản phẩm</h5>
                            <button
                                type="button"
                                className={clsx(styles.modal_close)}
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span onClick={() => setShow(!show)} aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>

                        <div className={clsx(styles.table)}>
                            {orderDetails.map((orderDetails) => {
                                return (
                                    <div key={orderDetails.ID} className={clsx(styles.table__evaluate)}>
                                        <div className={clsx(styles.table__sp)}>
                                            <img
                                                className={clsx(styles.table_image)}
                                                src={`http://localhost:3000/Image/${orderDetails.image}`}
                                                alt=""
                                            />
                                            <p style={{ fontSize: 20 }}>{orderDetails.tenSp}</p>
                                        </div>
                                        <div className={clsx(styles.table__quality)}>
                                            <p>Chất lượng sản phẩm:</p>
                                            <form method="PUT" className={clsx(styles.right_formstar)}>
                                                <div className={clsx(styles.describe_star)}>
                                                    {stars.map((star) => {
                                                        return (
                                                            <div
                                                                key={star.id}
                                                                className={clsx(
                                                                    styles.describe__star,
                                                                    `${star.class}`,
                                                                    'star',
                                                                    checkStar.map((checked) => {
                                                                        return orderDetails.ID === checked.orderID
                                                                            ? checked.numberRating === star.id
                                                                                ? 'active'
                                                                                : ' '
                                                                            : '';
                                                                    }),
                                                                )}
                                                                onClick={() =>
                                                                    handleStar(
                                                                        star.id,
                                                                        orderDetails.ID,
                                                                        orderDetails.productID,
                                                                    )
                                                                }
                                                            ></div>
                                                        );
                                                    })}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={clsx(styles.modal_footer)}>
                            <button
                                onClick={(e) => handleSubmitEvaluate(e)}
                                className={clsx(styles.order_purchase__btn)}
                            >
                                Đánh giá
                            </button>
                            <button onClick={() => setShow(!show)} className={clsx(styles.order_purchase__btnContact)}>
                                Trở lại
                            </button>
                        </div>
                    </div>
                </>
            )}

            {show1 && (
                <>
                    <div onClick={() => setShow1(!show1)} className={clsx(styles.modal1)}></div>

                    <div className={clsx(styles.modal_container)}>
                        <div className={clsx(styles.modal_header)}>
                            <h5 className="modal-title">Đánh giá của bạn</h5>
                            <button
                                type="button"
                                className={clsx(styles.modal_close)}
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span onClick={() => setShow1(!show1)} aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>

                        <div className={clsx(styles.table)}>
                            {orderDetails.map((orderDetails) => {
                                return (
                                    <div key={orderDetails.ID} className={clsx(styles.table__evaluate)}>
                                        <div className={clsx(styles.table__sp)}>
                                            <img
                                                className={clsx(styles.table_image)}
                                                src={`http://localhost:3000/Image/${orderDetails.image}`}
                                                alt=""
                                            />
                                            <p style={{ fontSize: 20 }}>{orderDetails.tenSp}</p>
                                        </div>
                                        <div className={clsx(styles.table__quality)}>
                                            <p>Chất lượng sản phẩm:</p>
                                            <form method="PUT" className={clsx(styles.right_formstar)}>
                                                <div className={clsx(styles.describe_star)}>
                                                    {stars.map((star) => {
                                                        return (
                                                            <div
                                                                key={star.id}
                                                                className={clsx(
                                                                    styles.describe__star,
                                                                    `${star.class}`,

                                                                    ratings.map((rating) => {
                                                                        return orderDetails.productID ===
                                                                            rating.productId
                                                                            ? rating.numberRating === star.id
                                                                                ? 'active'
                                                                                : ''
                                                                            : '';
                                                                    }),
                                                                )}
                                                            ></div>
                                                        );
                                                    })}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={clsx(styles.modal_footer)}>
                            <button onClick={() => setShow1(!show1)} className={clsx(styles.order_purchase__btn)}>
                                OK
                            </button>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
}

export default Finish;
