import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUser, axiosPost } from '../../services/UseServices';
import { UserContext } from '../../Context/UserContext';
import PayPal from '../Paypal/Paypal';

function CheckOut(props) {
    const { cartItems, toast, setCartItems } = props;
    const [tenKH, setTenKH] = useState('');
    const [soDT, setSoDT] = useState('');
    const [email, setEmail] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [thanhToan, setThanhToan] = useState('');
    const [note, setNote] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
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

    useEffect(() => {
        if (Object.entries(user.account).length !== 0) {
            getUsers();
        }
        // bỏ warning React Hook useEffect has a missing dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = async () => {
        let res = await fetchUser(`/user/${user.account.getUser.id}`);
        setTenKH(res.data.name);
        setEmail(res.data.email);
    };

    const handleOrder = async (e) => {
        // e.preventDefault();
        if (Object.entries(user.account).length !== 0) {
            if (handleValidation()) {
                if (thanhToan === 'Chuyển khoản ngân hàng') {
                    await axiosPost('/order', {
                        Product: cartItems,
                        tenKH: tenKH,
                        soDT: soDT,
                        diaChi: diaChi,
                        email: email,
                        phuongThucTT: thanhToan,
                        note: note,
                        trangThaiDH: 0,
                        maKH: user.account.getUser.id,
                        isPay: true,
                    })
                        .then((res) => {
                            setCartItems([]);
                            window.history.back();
                            toast.success('Mua sản phẩm thành công ');
                        })
                        .catch((err) => {
                            toast.error(err);
                        });
                } else {
                    await axiosPost('/order', {
                        Product: cartItems,
                        tenKH: tenKH,
                        soDT: soDT,
                        diaChi: diaChi,
                        email: email,
                        phuongThucTT: thanhToan,
                        note: note,
                        trangThaiDH: 0,
                        maKH: user.account.getUser.id,
                        isPay: false,
                    })
                        .then((res) => {
                            setCartItems([]);
                            window.history.back();
                            toast.success('Mua sản phẩm thành công ');
                        })
                        .catch((err) => {
                            toast.error(err);
                        });
                }
            }
        } else {
            navigate('/Login');
        }
    };

    let tongTien = 0;
    if (Object.entries(user.account).length !== 0 && user.isAuthenticated === true) {
        return (
            <div className="min-w-screen min-h-screen bg-gray-50 py-5">
                <div className=" lg:w-[1170px] lg:m-auto xs:px-5 lg:px-0 mb-4">
                    <div className="mb-2">
                        <NavLink
                            to={'/giohang'}
                            className="focus:outline-none hover:underline no-underline text-gray-500 text-sm"
                        >
                            <i className="fa-solid fa-arrow-left"></i>&nbsp;Quay lại
                        </NavLink>
                    </div>
                    <div className="mb-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Thủ tục thanh toán</h1>
                    </div>
                </div>

                <div className="lg:w-[1170px] lg:m-auto lg:border lg:rounded-md w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                    <div className="w-full">
                        <div className="-mx-3 md:flex items-start">
                            <div className="px-3 md:w-7/12 lg:pr-10">
                                {cartItems &&
                                    cartItems.map((cartItem) => {
                                        tongTien += cartItem.total;
                                        return (
                                            <div
                                                key={cartItem.ID}
                                                className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6"
                                            >
                                                <div className="w-full flex items-center">
                                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                                        <img
                                                            className="h-full"
                                                            src={`http://localhost:3000/Image/${cartItem.image}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex-grow xxs:pl-3 xs:pl-0">
                                                        <h6 className="font-semibold uppercase text-gray-600">
                                                            {cartItem.tenSp}
                                                        </h6>
                                                        <p className="text-gray-400">x {cartItem.qty}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-600 text-xl">
                                                            {VND.format(cartItem.total)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                    <div className="w-full xxs:flex mb-3 items-center xs:block">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Tổng tiền</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">{VND.format(tongTien)}</span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Phí vận chuyển</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold"> {VND.format(300000)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Tổng tiền đơn hàng</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold">{VND.format(tongTien + 300000)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-3 md:w-5/12">
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div className="w-full xxs:flex mb-3 items-center xs:block">
                                        <div className="xxs:w-32 xs:w-full">
                                            <span className="text-gray-600 font-semibold">Tên người nhận:</span>
                                        </div>
                                        <div className="flex-grow xxs:pl-3 xs:pl-0">
                                            <input
                                                className={`${
                                                    formErrors.tenKH ? '!border-red-500' : ''
                                                } xs:w-full  border border-slate-400 px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                                                value={tenKH}
                                                onChange={(e) => setTenKH(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full xxs:flex mb-3 items-center xs:block">
                                        <div className="xxs:w-32 xs:min-w-[80px]">
                                            <span className="text-gray-600 font-semibold">Email:</span>
                                        </div>
                                        <div className="flex-grow xxs:pl-3 xs:pl-0">
                                            <input
                                                className={`${
                                                    formErrors.email ? '!border-red-500' : ''
                                                } xs:w-full  border border-slate-400 px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full xxs:flex mb-3 items-center xs:block">
                                        <div className=" xxs:w-32 xs:w-full">
                                            <span className="text-gray-600 font-semibold">Số điện thoại:</span>
                                        </div>
                                        <div className="flex-grow xxs:pl-3 xs:pl-0">
                                            <input
                                                className={`${
                                                    formErrors.soDT ? '!border-red-500' : ''
                                                } xs:w-full  border border-slate-400 px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                                                value={soDT}
                                                onChange={(e) => setSoDT(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full mb-3 xxs:flex items-center xs:block">
                                        <div className="xxs:w-32 xs:w-full">
                                            <span className="text-gray-600 font-semibold">Địa chỉ:</span>
                                        </div>
                                        <div className="flex-grow xxs:pl-3 xs:pl-0">
                                            <input
                                                className={`${
                                                    formErrors.diaChi ? '!border-red-500' : ''
                                                } xs:w-full  border border-slate-400 px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2`}
                                                value={diaChi}
                                                onChange={(e) => setDiaChi(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full xxs:flex mb-3 items-center xs:block">
                                        <div className=" xxs:w-32 xs:w-full">
                                            <span className="text-gray-600 font-semibold">Ghi chú:</span>
                                        </div>
                                        <div className="flex-grow xxs:pl-3 xs:pl-0">
                                            <textarea
                                                className="xs:w-full  border border-slate-400 px-2 focus:border-gray-300 outline-none focus:ring rounded-lg py-2"
                                                rows={1}
                                                value={note}
                                                type="text"
                                                id="company-dd"
                                                onChange={(e) => setNote(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="w-full xxs:flex mb-3 items-center xs:block flex-wrap">
                                        <div className="w-full">
                                            <span className="text-gray-600 font-semibold">Phương thức thanh toán:</span>
                                        </div>

                                        <select
                                            onChange={(e) => setThanhToan(e.target.value)}
                                            className={`${
                                                formErrors.thanhToan ? '!border-red-500' : ''
                                            } py-2 px-2 w-full mt-2.5 focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm `}
                                        >
                                            <option className="hidden">Phương thức thanh toán</option>
                                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                            <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
                                        </select>
                                    </div>
                                </div>

                                {thanhToan === 'Chuyển khoản ngân hàng' ? (
                                    <PayPal
                                        handleOrder={handleOrder}
                                        amount={Math.round((tongTien + 300000) / 23500)}
                                    />
                                ) : (
                                    <div>
                                        <button
                                            onClick={handleOrder}
                                            className="block w-full max-w-xs mx-auto  bg-[#ee4d2d] hover:bg-[#c52432] text-white rounded-lg px-3 py-2 font-semibold"
                                        >
                                            <i className="mdi mdi-lock-outline mr-1"></i> Mua ngay
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        navigate('/Login');
    }
}

export default CheckOut;
