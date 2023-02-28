import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import Login from '../Login/Login';
import LogoTT from '../../assets/Image/logo-2.jpg';
import Phone from '../../assets/Image/telephone.png';
import LogoUser from '../../assets/Image/user.png';

function Header(props) {
    const { cartItems, toast, email, setEmail, setPassword, password, handleSubmitBT } = props;

    const [show, setShow] = useState(false);
    const [state, setSate] = useState('');
    const [product, setProduct] = useState([]);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const search = useRef();

    const HandleOnSubmit = () => {
        if (state !== '') {
            setProduct([...product, { state }]);
            setSate('');
            search.current.focus();
        } else {
            search.current.focus();
        }
    };

    const handleDelete = (index) => {
        const newJobs = [...product];
        setProduct(newJobs.filter((e, i) => i !== index));
        setSate('');
        search.current.focus();
    };

    const links = [
        { path: '/', title: 'Trang chủ' },
        { path: '/phongkhach', title: 'Phòng khách' },
        { path: '/phongbep', title: 'Phòng bếp' },
        { path: '/phonglamviec', title: 'Phòng làm việc' },
        { path: '/phongngu', title: 'Phòng ngủ' },
    ];

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Handle the Enter key press event
            HandleOnSubmit();
        }
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.top)}>
                <div className={clsx(styles.wrapper1)}>
                    <div className={clsx(styles.wrapper1_custom)}>
                        <h3>CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG SIÊU THỊ NỘI THẤT !</h3>
                    </div>
                    <div className={clsx(styles.wrapper1_medium)}>
                        <ul>
                            <li className={clsx(styles.wrapper1_medium__li)} style={{ marginRight: 12 }}>
                                <span>Sản phẩm</span>
                            </li>
                            <li style={{ marginRight: 12, marginLeft: 12 }}>
                                <span>Tin tức</span>
                            </li>
                            <li style={{ marginRight: 12, marginLeft: 12 }}>
                                <span>Liên hệ</span>
                            </li>
                            <li style={{ marginLeft: 12, display: 'flex', alignItems: 'center' }}>
                                {email === 'Quangduc2002@gmail.com' && password === '221202' ? (
                                    <>
                                        <img src={LogoUser} alt="" style={{ width: 40, height: 40 }} />
                                        <span>{email}</span>
                                    </>
                                ) : (
                                    <span
                                        className={clsx(styles.show)}
                                        onClick={() => {
                                            setShow(!show);
                                        }}
                                    >
                                        Đăng nhập
                                    </span>
                                )}

                                {show && (
                                    //     <div className={clsx(styles.nav2_form)}>
                                    //     <div className={clsx(styles.form_header)}>
                                    //         <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
                                    //     </div>
                                    //     <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.auth_form)}>
                                    //         <div className={clsx(styles.auth_froup)}>
                                    //             <input
                                    //                 // value={email}
                                    //                 type="text"
                                    //                 name="email"
                                    //                 className={clsx(styles.auth_input)}
                                    //                 placeholder="Nhập Email"
                                    //                 {...register('email', {
                                    //                     required: true,
                                    //                     pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                    //                 })}
                                    //                 onChange={(e) => setEmail(e.target.value)}
                                    //             />
                                    //             {Object.keys(errors).length !== 0 && (
                                    //                 <div>
                                    //                     {errors.email?.type === 'required' && (
                                    //                         <p className={clsx(styles.form_message)}>Please enter Email !</p>
                                    //                     )}
                                    //                     {errors.email?.type === 'pattern' && (
                                    //                         <p className={clsx(styles.form_message)}>Please enter correct email format !</p>
                                    //                     )}
                                    //                 </div>
                                    //             )}
                                    //         </div>
                                    //         <div className={clsx(styles.auth_froup)}>
                                    //             <input
                                    //                 // value={password}
                                    //                 type="password"
                                    //                 name="password"
                                    //                 className={clsx(styles.auth_input)}
                                    //                 placeholder="Nhập mật khẩu"
                                    //                 {...register('password', {
                                    //                     required: true,
                                    //                     minLength: 6,
                                    //                 })}
                                    //                 onChange={(e) => setPassword(e.target.value)}
                                    //             />
                                    //             {Object.keys(errors).length !== 0 && (
                                    //                 <div>
                                    //                     {errors.password?.type === 'required' && (
                                    //                         <p className={clsx(styles.form_message)}>Please enter Password !</p>
                                    //                     )}

                                    //                     {errors.password?.type === 'minLength' && (
                                    //                         <p className={clsx(styles.form_message)}>Please enter at least 6 characters</p>
                                    //                     )}
                                    //                 </div>
                                    //             )}
                                    //         </div>
                                    //         <div className={clsx(styles.form_controls, styles.form_controls1)}>
                                    //             <button
                                    //                 onClick={() => {
                                    //                     setShow(!show);
                                    //                 }}
                                    //                 className={clsx(styles.form_btn)}
                                    //             >
                                    //                 TRỞ LẠI
                                    //             </button>
                                    //             <button onClick={() => handleSubmitBT()} className={clsx(styles.form_btn, styles.form_primary)}>
                                    //                 ĐĂNG NHẬP
                                    //             </button>
                                    //         </div>
                                    //         <div className={clsx(styles.form_controls2)}>
                                    //             <p className={clsx(styles.controls2_p)}>Quên mật khẩu</p>
                                    //             <p>Cần trợ giúp</p>
                                    //         </div>
                                    //     </form>
                                    // </div>
                                    <Login
                                        show={show}
                                        setShow={setShow}
                                        toast={toast}
                                        handleSubmitBT={handleSubmitBT}
                                        setEmail={setEmail}
                                        setPassword={setPassword}
                                    />
                                )}

                                {show && (
                                    <div
                                        onClick={() => {
                                            setShow(!show);
                                        }}
                                        className={clsx(styles.model)}
                                    />
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={clsx(styles.top1)}>
                <div className={clsx(styles.wrapper2)}>
                    <div
                        onClick={() => {
                            setShow2(!show2);
                        }}
                        className={clsx(styles.bars)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <Link to="/">
                        <img alt="" src={LogoTT} />
                    </Link>

                    <Link to="/giohang" className={clsx(styles.cart, styles.cartMB)}>
                        <>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </>
                        <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
                    </Link>

                    <div className={clsx(styles.wrapper2_search)}>
                        <>
                            <input
                                className={clsx(styles.input)}
                                onFocus={() => setShow1(true)}
                                ref={search}
                                value={state}
                                onChange={(e) => {
                                    setSate(e.target.value);
                                }}
                                placeholder="Tìm kiếm..."
                                onKeyPress={handleKeyPress}
                            />
                            {product.length !== 0 && show1 && (
                                <ul
                                    className={clsx(
                                        styles.wrapper2_search__ul,
                                        styles.ul,
                                        product.length !== 0 ? 'wrapper2_active' : '',
                                    )}
                                >
                                    {product.map((product, index) => (
                                        <li key={index}>
                                            <div>
                                                <i
                                                    style={{ marginRight: 16, color: '#555' }}
                                                    className="fa-solid fa-clock-rotate-left"
                                                ></i>
                                                {product.state}
                                            </div>
                                            <p onClick={() => handleDelete(index)} className={clsx(styles.delete)}>
                                                Xóa
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button onClick={HandleOnSubmit}>
                                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                            </button>
                        </>
                    </div>

                    <div className={clsx(styles.wrapper2_phone)}>
                        <img alt="" src={Phone} />
                        <div className={clsx(styles.wrapper2_hotline)}>
                            <p style={{ fontWeight: 700 }}>Hotline</p>
                            <p>0965420922</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(styles.top2, styles.devices)}>
                <div className={clsx(styles.wrapper3)}>
                    <ul>
                        {links.map((link) => {
                            return (
                                <li key={link.path}>
                                    <NavLink key={link.path} className={clsx(styles.wrapper3_link)} to={link.path}>
                                        {link.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <Link to="/giohang" className={clsx(styles.cart)}>
                        <>
                            <span>Giỏ hàng</span>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </>
                        <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
                    </Link>
                </div>
            </div>

            {show2 && (
                <div className={clsx(styles.top2)}>
                    <div className={clsx(styles.wrapper3)}>
                        <ul>
                            <li>
                                <i onClick={() => setShow2(!show2)} className="fa-solid fa-xmark"></i>
                                <img alt="" src={LogoTT} />
                            </li>
                            {links.map((link, index) => {
                                return (
                                    <li key={index}>
                                        <NavLink
                                            onClick={() => {
                                                setShow2(!show2);
                                            }}
                                            key={index}
                                            className={clsx(styles.wrapper3_link)}
                                            to={link.path}
                                        >
                                            {link.title}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                        <NavLink to="/giohang" className={clsx(styles.cart)}>
                            <>
                                <span>Giỏ hàng</span>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </>
                            <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
                        </NavLink>
                    </div>
                </div>
            )}

            {show2 && (
                <div
                    onClick={() => {
                        setShow2(!show2);
                    }}
                    className={clsx(styles.model)}
                />
            )}

            {show1 && (
                <div
                    onClick={() => {
                        setShow1(false);
                    }}
                    className={clsx(styles.model, styles.model_search)}
                />
            )}
        </div>
    );
}

export default Header;
