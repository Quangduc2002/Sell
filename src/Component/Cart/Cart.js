import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import CartIMG from '../../assets/Image/cart.png';
import { UserContext } from '../../Context/UserContext';
import styles from './Cart.module.scss';

function Cart(props) {
    const { cartItems, setCartItems, onDelete, totalMoney, toast } = props;
    const { user } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [productID, setProductID] = useState('');

    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleUpdateCartUp = (product) => {
        const exist = cartItems.find((cartItem) => {
            return cartItem.ID === product.ID;
        });

        if (exist) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.ID === product.ID
                        ? {
                              ...exist,
                              qty: cartItem.qty + 1,
                              total:
                                  (1 + cartItem.qty) *
                                  parseFloat(cartItem.giaBan - (cartItem.giaBan * cartItem.giamGia) / 100),
                          }
                        : cartItem,
                ),
            );
        }
    };

    const handleUpdateCartDown = (product) => {
        const exist = cartItems.find((cartItem) => {
            return cartItem.ID === product.ID;
        });

        if (exist && exist.qty > 1) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.ID === product.ID
                        ? {
                              ...exist,
                              qty: cartItem.qty - 1,
                              total:
                                  (cartItem.qty - 1) *
                                  parseFloat(cartItem.giaBan - (cartItem.giaBan * cartItem.giamGia) / 100),
                          }
                        : cartItem,
                ),
            );
        } else {
            setProductID(product.ID);
            setShow(true);
        }
    };
    const handleDeleleCart = () => {
        setCartItems(cartItems.filter((cartItem) => cartItem.ID !== productID));
        toast.success('Xóa sản phẩm thành công !');
        setProductID('');
        setShow(false);
    };

    return (
        <div className="bg-gray-100 pt-20 pb-20">
            {cartItems.length === 0 ? (
                <motion.div
                    initial={{ y: '4rem', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1,
                        type: spring,
                    }}
                >
                    <div className="text-center">
                        <img className="w-48 m-auto" alt="" src={CartIMG} />
                        <p className="text-[#ee4d2d] text-lg ">Chưa có sản phẩm nào trong giỏ hàng.</p>
                    </div>
                </motion.div>
            ) : (
                <>
                    <h1 className="max-w-5xl px-8 xl:px-0 mx-auto text-left mb-10 text-3xl font-bold text-gray-600">
                        Giỏ hàng
                    </h1>
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3">
                            {cartItems &&
                                cartItems.map((cartItem) => {
                                    return (
                                        <div
                                            key={cartItem.id}
                                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                                        >
                                            <img
                                                src={`http://localhost:3000/Image/${cartItem.image}`}
                                                alt=""
                                                className="w-full rounded-lg sm:w-40"
                                            />
                                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                <div className="sm:mt-0">
                                                    <h2 className="text-lg font-bold text-gray-900">
                                                        {cartItem.tenSp}
                                                    </h2>
                                                    <p className="mt-1 text-base text-left text-gray-700">
                                                        Chất liệu: {cartItem.Meterial.tenChatLieu}
                                                    </p>
                                                </div>
                                                <div className=" flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                    <div className=" sm:mb-4 rounded-sm border border-coolGray-200 gap-3 inline-flex items-center justify-between xs:m-0">
                                                        <span onClick={() => handleUpdateCartDown(cartItem)}>
                                                            <i className="fa-solid fa-minus py-2 px-2 border-x hover:bg-gray-200 cursor-pointer"></i>
                                                        </span>
                                                        <p className="m-0 ">{cartItem.qty}</p>
                                                        <span onClick={() => handleUpdateCartUp(cartItem)}>
                                                            <i className="fa-solid fa-plus py-2 px-2 border-x hover:bg-gray-200 cursor-pointer"></i>
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-4 justify-between m-0">
                                                        <p className="text-sm mb-0">{VND.format(cartItem.total)}</p>
                                                        <svg
                                                            onClick={() => onDelete(cartItem)}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Tổng tiền</p>
                                <p className="text-gray-700">{VND.format(totalMoney)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Phí vận chuyển</p>
                                <p className="text-gray-700">{VND.format(300000)}</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Tổng tiền</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">{VND.format(totalMoney + 300000)}</p>
                                </div>
                            </div>
                            <NavLink
                                to={Object.entries(user.account).length !== 0 ? '/checkout' : '/Login'}
                                className="text-white no-underline"
                            >
                                <button className="mt-6 w-full rounded-md  py-1.5 font-medium text-blue-50 bg-[#ee4d2d] hover:bg-[#c52432]">
                                    Thủ tục thanh toán
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </>
            )}

            {show && (
                <div className={clsx(styles.modal)}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className={clsx(styles.modal_header)}>
                                <h5 className="modal-title">Xóa sản phẩm</h5>
                                <button type="button" className={clsx(styles.modal_close)}>
                                    <span onClick={() => setShow(!show)} aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                            </div>
                            <div className={clsx(styles.modal_body)}>
                                <p>Bạn chắc chắn muốn bỏ sản phẩm này ?</p>
                            </div>
                            <div className={clsx(styles.modal_footer)}>
                                <button
                                    onClick={() => setShow(!show)}
                                    type="button"
                                    className={clsx(styles.modal_btnClose)}
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handleDeleleCart()}
                                    type="button"
                                    className={clsx(styles.modal_btnSave)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
