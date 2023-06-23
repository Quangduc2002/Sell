import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import LogoTT from '../../assets/Image/Logo.png';
import Phone from '../../assets/Image/telephone.png';
import path from '../Ultis/Path';

function Header(props) {
    const {
        cartItems,
        handleKeyPress,
        searchQuery,
        setSearchQuery,
        filteredItems,
        HandleOnSubmit,
        userName,
        roleId,
        date,
    } = props;
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const search = useRef();

    const links = [
        { path: '/', title: 'Trang chủ' },
        { path: '/phongkhach', title: 'Phòng khách' },
        { path: '/phongbep', title: 'Phòng bếp' },
        { path: '/phonglamviec', title: 'Phòng làm việc' },
        { path: '/phongngu', title: 'Phòng ngủ' },
    ];

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.top)}>
                <div className={clsx(styles.wrapper1)}>
                    <div className={clsx(styles.wrapper1_custom)}>
                        <h3>CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG SIÊU THỊ NỘI THẤT </h3>
                    </div>
                    <div className={clsx(styles.wrapper1_medium)}>
                        <ul>
                            {roleId === '0' ? (
                                <li className={clsx(styles.wrapper1_medium__li)} style={{ marginRight: 12 }}>
                                    <Link to="/admin/DSSP" style={{ textDecoration: 'none', color: '#000' }}>
                                        <span>Danh sách sản phẩm</span>
                                    </Link>
                                </li>
                            ) : (
                                ''
                            )}

                            <li
                                className={roleId !== '0' ? clsx(styles.wrapper1_medium__li) : ''}
                                style={{ marginRight: 12, marginLeft: 12 }}
                            >
                                <span>Tin tức</span>
                            </li>
                            <li style={{ marginRight: 12, marginLeft: 12 }}>
                                <span>Liên hệ</span>
                            </li>
                            <li style={{ marginLeft: 12 }}>
                                {!userName ? (
                                    <Link to="/Login" style={{ textDecoration: 'none', color: '#000' }}>
                                        <span className={clsx(styles.show)}>Đăng nhập</span>
                                    </Link>
                                ) : (
                                    <span
                                        className={clsx(styles.show)}
                                        onClick={() => {
                                            setShow(!show);
                                        }}
                                    >
                                        {userName}
                                        {date}
                                        <i style={{ marginLeft: 6 }} className="fa-sharp fa-solid fa-caret-down"></i>
                                    </span>
                                )}
                                {show && (
                                    <div className={clsx(styles.wrapper1_user)}>
                                        <p>Hồ sơ cá nhân</p>
                                        <Link to={path.Login} style={{ textDecoration: 'none', color: '#000' }}>
                                            <p>Đăng xuất</p>
                                        </Link>
                                    </div>
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
                    {roleId !== '0' ? (
                        <Link to="/giohang" className={clsx(styles.cart, styles.cartMB)}>
                            <>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </>
                            <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
                        </Link>
                    ) : (
                        ''
                    )}

                    <div className={clsx(styles.wrapper2_search)}>
                        <>
                            <input
                                className={clsx(styles.input)}
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
                                                setSearchQuery(product.TenSp);
                                                search.current.focus();
                                            }}
                                        >
                                            <div>
                                                <i
                                                    style={{ marginRight: 16, color: '#555' }}
                                                    className="fa-solid fa-magnifying-glass"
                                                ></i>
                                                {product.TenSp}
                                            </div>
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
                                        <span>{link.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    {roleId !== '0' ? (
                        <Link to="/giohang" className={clsx(styles.cart)}>
                            <>
                                <span>Giỏ hàng</span>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </>
                            <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
                        </Link>
                    ) : (
                        ''
                    )}
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
        </div>
    );
}

export default Header;
