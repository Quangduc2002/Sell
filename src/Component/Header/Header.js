import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import LogoTT from '../../assets/Image/Logo.png';
import Phone from '../../assets/Image/telephone.png';
import path from '../Ultis/Path';

function Header(props) {
    const { cartItems, handleKeyPress, searchQuery, setSearchQuery, filteredItems, HandleOnSubmit, roleId, toast } =
        props;
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showPage, setShowPage] = useState(false);
    const navigate = useNavigate();
    const search = useRef();

    const links = [
        { path: '/', title: 'Trang chủ' },
        { path: '/phongkhach', title: 'Phòng khách' },
        { path: '/phongbep', title: 'Phòng bếp' },
        { path: '/phonglamviec', title: 'Phòng làm việc' },
        { path: '/phongngu', title: 'Phòng ngủ' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('account');
        sessionStorage.removeItem('account');

        setShow(false);
        setShow2(false);
        navigate('/');
        toast.success('Đăng xuất thành công !');
    };

    console.log(localStorage.account);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.top)}>
                <div className={clsx(styles.wrapper1)}>
                    <div className={clsx(styles.wrapper1_custom)}>
                        <h3>CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG SIÊU THỊ NỘI THẤT </h3>
                    </div>
                    <div className={clsx(styles.wrapper1_medium)}>
                        <ul>
                            <li
                                className={clsx(styles.wrapper1_medium__li)}
                                style={{ marginRight: 12, marginLeft: 12 }}
                            >
                                <span>Tin tức</span>
                            </li>
                            <li style={{ marginRight: 12, marginLeft: 12 }}>
                                <span>Liên hệ</span>
                            </li>
                            <li style={{ marginLeft: 12 }}>
                                {!localStorage.account ? (
                                    // && localStorage.length === 0
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
                                        {localStorage.account ? JSON.parse(localStorage.account).name : ''}
                                        <i style={{ marginLeft: 6 }} className="fa-sharp fa-solid fa-caret-down"></i>
                                    </span>
                                )}

                                {show && (
                                    <div className={clsx(styles.wrapper1_user)}>
                                        {JSON.parse(localStorage.account).roleId !== 1 ? (
                                            <Link
                                                to={`admin/${path.LayoutAdminStatistic}`}
                                                className={clsx(styles.wrapper1_menu)}
                                            >
                                                <i className="fa-solid fa-gear"></i>
                                                <p>Quản lý sản phẩm</p>
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                        <NavLink
                                            className={clsx(styles.wrapper1_menu)}
                                            to={`${path.LayoutProfile}`}
                                            onClick={() => setShow(!show)}
                                        >
                                            <i className="fa-solid fa-user"></i>
                                            <p>Hồ sơ cá nhân</p>
                                        </NavLink>

                                        {JSON.parse(localStorage.account).roleId === 1 ? (
                                            <NavLink
                                                className={clsx(styles.wrapper1_menu)}
                                                to={`/order/${path.LayoutOrderAll}`}
                                                onClick={() => setShow(!show)}
                                            >
                                                <i className="fa-solid fa-clipboard"></i>
                                                <p>Đơn mua</p>
                                            </NavLink>
                                        ) : (
                                            ''
                                        )}

                                        <div className={clsx(styles.wrapper1_menu)}>
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                            <p onClick={handleLogout}>Đăng xuất</p>
                                        </div>
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
                        <div>
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
                                                setSearchQuery(product.tenSp);
                                                search.current.focus();
                                            }}
                                        >
                                            <div>
                                                <i
                                                    style={{ marginRight: 16, color: '#555', fontSize: '14px' }}
                                                    className="fa-solid fa-magnifying-glass"
                                                ></i>
                                                {product.tenSp}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button onClick={HandleOnSubmit}>
                                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
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
                                <i
                                    onClick={() => setShow2(!show2)}
                                    className={clsx(styles.xmark, 'fa-solid fa-xmark')}
                                ></i>
                                <img alt="" src={LogoTT} />
                            </li>

                            <div>
                                <li
                                    onClick={() => setShowPage(!showPage)}
                                    className={clsx(styles.wrapper3_link, styles.wrapper3_page)}
                                >
                                    <div className={clsx(styles.wrapper3_page1)}>
                                        <i className={clsx(styles.image, 'fa-solid fa-image')}></i>
                                        <span>Trang</span>
                                    </div>
                                    <i
                                        className={clsx(
                                            styles.chevronDown,
                                            showPage ? styles.activeRotate : '',
                                            'fa-solid fa-chevron-down',
                                        )}
                                    ></i>
                                </li>
                                {showPage && (
                                    <ul>
                                        {links.map((link, index) => {
                                            return (
                                                <li key={link.path}>
                                                    <NavLink
                                                        onClick={() => setShow2(!show2)}
                                                        key={link.path}
                                                        className={clsx(styles.wrapper3_link)}
                                                        to={link.path}
                                                    >
                                                        <span>{link.title}</span>
                                                    </NavLink>
                                                </li>
                                            );
                                        })}

                                        {localStorage.length !== 0 ? (
                                            <li>
                                                {JSON.parse(localStorage.account).roleId !== 1 ? (
                                                    <Link
                                                        to={`admin/${path.LayoutAdminStatistic}`}
                                                        style={{ textDecoration: 'none' }}
                                                        className={clsx(styles.wrapper3_link)}
                                                    >
                                                        <li>Quản lý sản phẩm</li>
                                                    </Link>
                                                ) : (
                                                    ''
                                                )}

                                                <Link className={clsx(styles.wrapper3_link)}>Hồ sơ cá nhân</Link>
                                            </li>
                                        ) : (
                                            ''
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div className={clsx(styles.wrapper3_btn)}>
                                {localStorage.length === 0 ? (
                                    <Link to="/Login" style={{ textDecoration: 'none', color: '#000' }}>
                                        <button className={clsx(styles.wrapper3__btn)}>Đăng nhập</button>
                                    </Link>
                                ) : (
                                    <button className={clsx(styles.wrapper3__btn)} onClick={handleLogout}>
                                        Đăng xuất
                                    </button>
                                )}
                            </div>
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
