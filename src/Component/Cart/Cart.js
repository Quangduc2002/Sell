import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import CartIMG from '../../assets/Image/cart.png';
import { UserContext } from '../../Context/UserContext';

function Cart(props) {
    const { cartItems, onDelete, totalMoney } = props;
    const { user } = useContext(UserContext);

    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

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
                                                        <span>
                                                            <i className="fa-solid fa-minus py-2 px-2 border-x hover:bg-gray-200 cursor-pointer"></i>
                                                        </span>
                                                        <p className="m-0 ">{cartItem.qty}</p>
                                                        <span>
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
        </div>
    );
}

export default Cart;
