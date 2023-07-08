import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from '../Cart/Cart.module.scss';
import CartIMG from '../../assets/Image/cart.png';

function Cart(props) {
    const { cartItems, onDelete, totalMoney, toast, userName } = props;
    const navigate = useNavigate();
    const [showPay, setShowPay] = useState(false);
    const [tenKH, setTenKH] = useState('');
    const [soDT, setSoDT] = useState('');
    const [email, setEmail] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [thanhToan, setThanhToan] = useState('');
    const [note, setNote] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleValidation = () => {
        let errors = {};
        let isValid = true;

        if (!tenKH) {
            errors.tenKH = 'Please enter name !';
            isValid = false;
        }

        if (!soDT) {
            errors.soDT = 'Please enter phone number !';
            isValid = false;
        }

        if (!email) {
            errors.email = 'Please enter email !';
            isValid = false;
        }

        if (!diaChi) {
            errors.diaChi = 'Please enter address !';
            isValid = false;
        }
        if (!thanhToan) {
            errors.thanhToan = 'Please enter select a payment method !';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleOrder = (e) => {
        e.preventDefault();
        if (userName) {
            if (handleValidation()) {
                axios
                    .post('http://localhost:8080/order', {
                        TenKH: tenKH,
                        SoDT: soDT,
                        DiaChi: diaChi,
                        Email: email,
                        PhuongThucThanhToan: thanhToan,
                        Product: cartItems,
                        Note: note,
                        TrangThaiDH: false,
                    })
                    .then((res) => {
                        toast.success('Mua sản phẩm thành công ');
                    })
                    .catch((err) => {
                        toast.error(err);
                    });
            }
        } else {
            navigate('/Login');
        }
    };

    return (
        <div className={clsx(styles.cart)}>
            {cartItems.length === 0 && (
                <div className={clsx(styles.product)}>
                    <div>
                        <img className={clsx(styles.product_img)} alt="" src={CartIMG} />
                        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                    </div>
                </div>
            )}

            {cartItems.length !== 0 && (
                <motion.div
                    className={clsx(styles.cart1)}
                    initial={{ y: '4rem', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1,
                        type: spring,
                    }}
                >
                    <div>
                        <table className={clsx(styles.table, cartItems.length === 0 ? styles.active : '')}>
                            <tbody>
                                <tr>
                                    <th>Image</th>
                                    <th className={clsx(styles.name)}>Name</th>
                                    <th style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                        Price
                                    </th>
                                    <th className={clsx(styles.price)}>Quantity</th>
                                    <th style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                        Total
                                    </th>
                                    <th>Detete</th>
                                </tr>
                                {cartItems.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>
                                                <img
                                                    className={clsx(styles.image)}
                                                    alt=""
                                                    src={`http://localhost:3000/Image/${item.Image}`}
                                                />
                                            </td>
                                            <td>
                                                {item.TenSp}
                                                <p className={clsx(styles.quantity)}>
                                                    {item.qty} x{' '}
                                                    {VND.format(item.GiaBan - (item.GiaBan * item.GiamGia) / 100)}
                                                </p>
                                                {item.qty === 1 ? (
                                                    ''
                                                ) : (
                                                    <p className={clsx(styles.quantity)}>
                                                        total: {VND.format(item.total)}{' '}
                                                    </p>
                                                )}
                                            </td>
                                            <td className={clsx(styles.price)}>
                                                {' '}
                                                {VND.format(item.GiaBan - (item.GiaBan * item.GiamGia) / 100)}
                                            </td>
                                            <td style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                                x{item.qty}
                                            </td>
                                            <td className={clsx(styles.price)}>{VND.format(item.total)} </td>
                                            <td style={{ textAlign: 'center' }} className={clsx(styles.del)}>
                                                <p
                                                    onClick={() => {
                                                        onDelete(item);
                                                    }}
                                                >
                                                    Xóa
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {showPay && (
                            <div className={clsx(styles.cart1_form)}>
                                <div className={clsx(styles.cart1_formGroup)}>
                                    <label className={clsx(styles.cart1_label)} htmlFor="firstname-dd">
                                        Họ Và Tên <span className="require">*</span>
                                    </label>
                                    <input
                                        value={tenKH}
                                        type="text"
                                        id="firstname-dd"
                                        className={clsx(styles.cart1_formControl)}
                                        onChange={(e) => setTenKH(e.target.value)}
                                    />
                                    <div>
                                        {formErrors.tenKH && (
                                            <p className={clsx(styles.form_message)}>{formErrors.tenKH}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.cart1_formGroup)}>
                                    <label className={clsx(styles.cart1_label)} htmlFor="email-dd">
                                        E-Mail <span className="require">*</span>
                                    </label>
                                    <input
                                        value={email}
                                        type="text"
                                        id="email-dd"
                                        className={clsx(styles.cart1_formControl)}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div>
                                        {formErrors.email && (
                                            <p className={clsx(styles.form_message)}>{formErrors.email}</p>
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.cart1_formGroup)}>
                                    <label className={clsx(styles.cart1_label)} htmlFor="telephone-dd">
                                        Số điện thoại <span className="require">*</span>
                                    </label>
                                    <input
                                        value={soDT}
                                        type="text"
                                        id="telephone-dd"
                                        className={clsx(styles.cart1_formControl)}
                                        onChange={(e) => setSoDT(e.target.value)}
                                    />
                                    <div>
                                        {formErrors.soDT && (
                                            <p className={clsx(styles.form_message)}>{formErrors.soDT}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.cart1_formGroup)}>
                                    <label className={clsx(styles.cart1_label)} htmlFor="company-dd">
                                        Địa chỉ <span className="require">*</span>
                                    </label>
                                    <input
                                        value={diaChi}
                                        type="text"
                                        id="company-dd"
                                        className={clsx(styles.cart1_formControl)}
                                        onChange={(e) => setDiaChi(e.target.value)}
                                    />
                                    <div>
                                        {formErrors.diaChi && (
                                            <p className={clsx(styles.form_message)}>{formErrors.diaChi}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.cart1_formGroup)}>
                                    <label className={clsx(styles.cart1_label)} htmlFor="company-dd">
                                        Phương thức thanh toán
                                    </label>
                                    <select
                                        defaultValue="0"
                                        value={thanhToan}
                                        onChange={(e) => setThanhToan(e.target.value)}
                                        className={clsx(styles.cart1_formControl)}
                                    >
                                        <option value="0" style={{ display: 'none' }}>
                                            Phương thức thanh toán
                                        </option>
                                        <option>Thanh toán khi nhận hàng</option>
                                        <option>Ngân hàng điện tử</option>
                                        <option>Thẻ ATM nội địa</option>
                                    </select>
                                    <div>
                                        {formErrors.thanhToan && (
                                            <p className={clsx(styles.form_message)}>{formErrors.thanhToan}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.cart1_formGroup)}>
                                    <h3>THÔNG TIN BỔ SUNG</h3>
                                    <label className={clsx(styles.cart1_label)} htmlFor="company-dd">
                                        Ghi chú đơn hàng(tùy chọn)
                                    </label>
                                    <textarea
                                        cols={50}
                                        rows={1}
                                        value={note}
                                        type="text"
                                        id="company-dd"
                                        className={clsx(styles.cart1_formControl)}
                                        onChange={(e) => setNote(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        <div className={clsx(styles.cart1_purchase)}>
                            <div className={clsx(styles.cart1__transport)}>
                                <p>Tổng tiền: </p>
                                {VND.format(totalMoney)}
                            </div>
                            {!showPay && (
                                <button onClick={() => setShowPay(!showPay)} className={clsx(styles.cart1_order)}>
                                    Mua ngay
                                </button>
                            )}

                            {showPay && (
                                <button onClick={(e) => handleOrder(e)} className={clsx(styles.cart1_order)}>
                                    Đặt hàng
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default Cart;
