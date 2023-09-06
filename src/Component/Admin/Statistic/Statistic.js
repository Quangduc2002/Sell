import React from 'react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import styles from './Statistic.module.scss';
import { fetchUser } from '../../../services/UseServices';
import Pagination from '../../Pagination/Pagination';
import Loading from '../../Loading/Loading';
import CountUp from 'react-countup';

function Statistic(props) {
    const { indexOfLastProduct, indeOfFirstProduct, productPerPage, pagination, isActive, handleNext, handlePrevious } =
        props;

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [listOrder, setListOrder] = useState([]);
    const [bill, setBill] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getOrder();
        getBill();
        getIncome();
    }, []);

    const getOrder = async () => {
        let res = await fetchUser('/order/listOrder');
        setTimeout(() => setListOrder(res.data), 500);
    };

    const getBill = async () => {
        let res = await fetchUser('/order/bill');
        setTimeout(() => setBill(res.data), 500);
    };

    const getIncome = async () => {
        let res = await fetchUser('/order/income');
        setTimeout(() => setIncomes(res.data), 500);
    };

    const currentListOrder = listOrder.slice(indeOfFirstProduct, indexOfLastProduct);

    const handleModal = async (id) => {
        setShow(!show);
        let res = await fetchUser(`/orderItem/${id}`);
        setOrderDetail(res.data);
    };

    let total = 0;
    for (let i = 0; i < orderDetail.length; i++) {
        total += orderDetail[i].donGia;
    }

    // thống kê tổng tiền
    let income = 0;
    for (let i = 0; i < incomes.length; i++) {
        income += incomes[i].orderitems.donGia;
    }

    return (
        <div className={clsx(styles.revenue)}>
            <div className={clsx(styles.revenue_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Trang
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Thống kê </span>
                </div>
            </div>

            {currentListOrder.length === 0 ? (
                <Loading />
            ) : (
                <motion.div
                    initial={{ y: '4rem', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1,
                        type: spring,
                    }}
                >
                    <div className={clsx(styles.revenue_card)}>
                        <div className={clsx(styles.revenue_card__body)}>
                            <div>
                                <p className={clsx(styles.revenue_card__title)}>Thu nhập</p>
                                <CountUp
                                    start={0}
                                    end={income}
                                    suffix=" VND"
                                    className={clsx(styles.revenue_card__number)}
                                ></CountUp>
                            </div>
                            <div>
                                <i className="fa-solid fa-calendar" style={{ color: '#6777ef' }}></i>
                            </div>
                        </div>

                        <div className={clsx(styles.revenue_card__body)}>
                            <div>
                                <p className={clsx(styles.revenue_card__title)}>Bán hàng</p>
                                <CountUp
                                    start={0}
                                    end={bill.length}
                                    className={clsx(styles.revenue_card__number)}
                                ></CountUp>
                            </div>
                            <div>
                                <i style={{ color: '#66bb6a' }} className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </div>

                        <div className={clsx(styles.revenue_card__body)}>
                            <div>
                                <p className={clsx(styles.revenue_card__title)}>Người dùng mới</p>
                                <CountUp start={0} end={500} className={clsx(styles.revenue_card__number)}></CountUp>
                            </div>
                            <div>
                                <i style={{ color: '#3abaf4' }} className="fa-solid fa-users"></i>
                            </div>
                        </div>

                        <div className={clsx(styles.revenue_card__body)}>
                            <div>
                                <p className={clsx(styles.revenue_card__title)}>Chờ giải quyết</p>
                                <CountUp
                                    start={0}
                                    end={listOrder.length - bill.length}
                                    className={clsx(styles.revenue_card__number)}
                                ></CountUp>
                            </div>
                            <div>
                                <i style={{ color: '#ffa426' }} className="fa-solid fa-comments"></i>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.revenue__PD)}>
                        <p className={clsx(styles.revenue_bill)}>Hóa Đơn</p>
                        <table className={clsx(styles.table)}>
                            <thead>
                                <tr>
                                    <th>Mã ĐH</th>
                                    <th>Tên khách hàng</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái đơn hàng</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentListOrder.map((order) => {
                                    return (
                                        <tr key={order.ID}>
                                            <td>MDH{order.ID}</td>
                                            <td>{order.tenKH}</td>
                                            <td>{order.diaChi}</td>
                                            <td>{order.soDT}</td>
                                            <td>
                                                {order.trangThaiDH === 1 ? (
                                                    <button className={clsx(styles.table_confirmed)}>
                                                        Đã giao hàng
                                                    </button>
                                                ) : order.trangThaiDH === 0 ? (
                                                    <button className={clsx(styles.table_status)}>Đang xử lý</button>
                                                ) : (
                                                    <button className={clsx(styles.table_cancel)}>Đã hủy</button>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleModal(order.ID)}
                                                    className={clsx(styles.table_action)}
                                                >
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {currentListOrder.length > 0 && (
                            <Pagination
                                productPerPage={productPerPage}
                                pagination={pagination}
                                totalProduct={listOrder.length}
                                isActive={isActive}
                                handleNext={handleNext}
                                handlePrevious={handlePrevious}
                            />
                        )}
                    </div>
                </motion.div>
            )}

            {show && (
                <>
                    <div onClick={() => setShow(!show)} className={clsx(styles.modal1)}></div>

                    <div className={clsx(styles.modal)} tabindex="-1" role="dialog">
                        <div className={clsx(styles.modal_header)}>
                            <h5 className="modal-title">Chi tiết hóa đơn</h5>
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

                        <table className={clsx(styles.table)}>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.map((order, index) => {
                                    return (
                                        <tr key={order.ID}>
                                            <td>MDH{order.orderID}</td>
                                            <td>SP{order.productID}</td>
                                            <td>
                                                <img
                                                    className={clsx(styles.table_image)}
                                                    src={`http://localhost:3000/Image/${order.image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{order.tenSp}</td>
                                            <td>{order.soLuong}</td>
                                            <td>{VND.format(order.donGia)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className={clsx(styles.modal_footer)}>
                            <p>Tổng tiền hóa đơn: {VND.format(total)}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Statistic;
