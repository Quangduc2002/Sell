import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import LogoTT from '../../assets/Image/logo-2.jpg';
import Phone from '../../assets/Image/telephone.png';
import LogoUser from '../../assets/Image/user.png';

function Header(props) {
    const {
        cartItems,
        toast,
        email,
        setEmail,
        setPassword,
        password,
        handleKeyPress,
        searchQuery,
        setSearchQuery,
        filteredItems,
        HandleOnSubmit,
    } = props;

    const [show, setShow] = useState(false);
    // const [state, setSate] = useState([]);
    // const [product, setProduct] = useState([]);
    // const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const search = useRef();

    // const handleDelete = (index) => {
    //     const newJobs = [...product];
    //     setProduct(newJobs.filter((e, i) => i !== index));
    //     setSate('');
    //     search.current.focus();
    // };

    const links = [
        { path: '/', title: 'Trang chủ' },
        { path: '/phongkhach', title: 'Phòng khách' },
        { path: '/phongbep', title: 'Phòng bếp' },
        { path: '/phonglamviec', title: 'Phòng làm việc' },
        { path: '/phongngu', title: 'Phòng ngủ' },
    ];

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (!email) {
            errors.email = 'Please enter Email !';
            isValid = false;
        } else if (!regex.test(email)) {
            errors.email = 'Please enter correct email format !';
            isValid = false;
        }

        if (!password) {
            errors.password = 'Please enter Password !';
            isValid = false;
        } else if (password.length < 6) {
            errors.password = 'Please enter at least 6 characters !';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success('Đăng nhập thành công');
            console.log('Email: ', email, 'Password: ', password);
        }

        // if (email === 'Quangduc2002@gmail.com' && password === '221202') {
        //     // navigate('/abc');
        //     // setShow(!show);
        //     toast.success('Đăng nhập thành công');
        // } else if (email !== '' && password !== '') {
        //     toast.error('Tài đăng nhập không chính xác');
        // }
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
                                    <div className={clsx(styles.nav2_form)}>
                                        <div className={clsx(styles.form_header)}>
                                            <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
                                        </div>
                                        <form className={clsx(styles.auth_form)}>
                                            <div className={clsx(styles.auth_froup)}>
                                                <input
                                                    value={email}
                                                    type="text"
                                                    name="email"
                                                    className={clsx(styles.auth_input)}
                                                    placeholder="Nhập Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <div>
                                                    {formErrors.email && (
                                                        <p className={clsx(styles.form_message)}>{formErrors.email}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={clsx(styles.auth_froup)}>
                                                <input
                                                    value={password}
                                                    type="password"
                                                    name="password"
                                                    className={clsx(styles.auth_input)}
                                                    placeholder="Nhập mật khẩu"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <div>
                                                    {formErrors.password && (
                                                        <p className={clsx(styles.form_message)}>
                                                            {formErrors.password}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={clsx(styles.form_controls, styles.form_controls1)}>
                                                <button
                                                    onClick={() => {
                                                        setShow(!show);
                                                    }}
                                                    className={clsx(styles.form_btn)}
                                                >
                                                    TRỞ LẠI
                                                </button>
                                                <button
                                                    onClick={(e) => handleSubmit(e)}
                                                    className={clsx(styles.form_btn, styles.form_primary)}
                                                >
                                                    ĐĂNG NHẬP
                                                </button>
                                            </div>
                                            <div className={clsx(styles.form_controls2)}>
                                                <p className={clsx(styles.controls2_p)}>Quên mật khẩu</p>
                                                <p>Cần trợ giúp</p>
                                            </div>
                                        </form>
                                    </div>
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
                                // onFocus={() => setShow1(true)}
                                ref={search}
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Tìm kiếm..."
                                onKeyDown={handleKeyPress}
                            />

                            {filteredItems.length !== 0 && (
                                <ul
                                    className={clsx(
                                        styles.wrapper2_search__ul,
                                        styles.ul,
                                        searchQuery.length === 0 ? styles.wrapper2_active : '',
                                    )}
                                >
                                    {filteredItems.map((product, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setSearchQuery(product.text);
                                                search.current.focus();
                                            }}
                                        >
                                            <div>
                                                <i
                                                    style={{ marginRight: 16, color: '#555' }}
                                                    className="fa-solid fa-clock-rotate-left"
                                                ></i>
                                                {product.text}
                                            </div>
                                            {/* <p onClick={() => handleDelete(index)} className={clsx(styles.delete)}>
                                             */}
                                            <p className={clsx(styles.delete)}>Xóa</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {/* <button onClick={HandleOnSubmit}> */}
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

            {/* {show1 && (
                <div
                    onClick={() => {
                        setShow1(false);
                    }}
                    className={clsx(styles.model, searchQuery === '' ? styles.model_search : '')}
                />
            )} */}
        </div>
    );
}

export default Header;
