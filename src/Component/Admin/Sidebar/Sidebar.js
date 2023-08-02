import React from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import path from '../../Ultis/Path';

function Sidebar(props) {
    const [show, setShow] = useState(false);
    const [showPage, setShowPage] = useState(false);
    const [showOrder, setShowOrder] = useState(false);

    return (
        <div className={clsx(styles.sidebar)}>
            <div className={clsx(styles.sidebar_MG)}>
                <div className={clsx(styles.sidebar_img)}>
                    <img style={{ width: 100, height: 100 }} src={`http://localhost:3000/Image/Logo.png`} alt="" />
                </div>
                <hr></hr>
                <div className={clsx(styles.sidebar_user)}>
                    <ul className={clsx(styles.sidebar_user_ul)}>
                        <div onClick={() => setShow(!show)} className={clsx(styles.sidebar_user__char)}>
                            <div className={clsx(styles.sidebar_user__name)}>
                                <img
                                    style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
                                    src={`http://localhost:3000/Image/IMG_2002.jpg`}
                                    alt=""
                                />
                                <span style={{ color: '#fff' }}>{localStorage.Name}</span>
                            </div>
                            <i
                                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                className={clsx(show ? styles.active : '', 'fa-solid fa-chevron-down')}
                            ></i>
                        </div>
                    </ul>

                    {show && (
                        <ul className={clsx(styles.sidebar_user__ul)}>
                            <NavLink to="profile" className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Thông tin của tôi</li>
                            </NavLink>
                            <NavLink to="setting" className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Cài đặt</li>
                            </NavLink>
                            <NavLink to={path.Login} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li, styles.btn)}>Đăng xuất</li>
                            </NavLink>
                        </ul>
                    )}
                </div>
                <hr></hr>

                <div className={clsx(styles.sidebar_user)}>
                    <ul className={clsx(styles.sidebar_pages)}>
                        <li onClick={() => setShowPage(!showPage)} className={clsx(styles.sidebar_user__char)}>
                            <div className={clsx(styles.sidebar_user__name)}>
                                <i
                                    style={{ color: '#fff', fontSize: 24, marginRight: 10 }}
                                    className="fa-solid fa-image"
                                ></i>
                                <span style={{ color: '#fff' }}>Trang</span>
                            </div>
                            <i
                                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                className={clsx(showPage ? styles.active : '', 'fa-solid fa-chevron-down')}
                            ></i>
                        </li>
                    </ul>

                    {showPage && (
                        <ul className={clsx(styles.sidebar_user__ul)}>
                            <NavLink to={path.LayoutAdminRevenue} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Thống kê doanh thu</li>
                            </NavLink>
                            <NavLink to={path.LayoutAdminDSDP} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Quản lý sản phẩm</li>
                            </NavLink>
                            <NavLink to={path.LayoutAdminAdd} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Thêm mặt sản phẩm</li>
                            </NavLink>
                            <NavLink to={path.LayoutAdminCustomers} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Quản lý khách hàng</li>
                            </NavLink>
                        </ul>
                    )}
                </div>

                <div className={clsx(styles.sidebar_user)}>
                    <ul className={clsx(styles.sidebar_pages)}>
                        <li onClick={() => setShowOrder(!showOrder)} className={clsx(styles.sidebar_user__char)}>
                            <div className={clsx(styles.sidebar_user__name)}>
                                <i
                                    style={{ color: '#fff', fontSize: 24, marginRight: 10 }}
                                    className="fa-regular fa-clipboard"
                                ></i>
                                <span style={{ color: '#fff' }}>Quản lý đơn hàng</span>
                            </div>
                            <i
                                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                className={clsx(showOrder ? styles.active : '', 'fa-solid fa-chevron-down')}
                            ></i>
                        </li>
                    </ul>

                    {showOrder && (
                        <ul className={clsx(styles.sidebar_user__ul)}>
                            <NavLink to={path.LayoutAdminListOrders} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Danh sách đơn hàng</li>
                            </NavLink>
                            <NavLink to={path.LayoutAdminOrderDetails} className={clsx(styles.sidebar_user__link)}>
                                <li className={clsx(styles.sidebar_user__li)}>Chi tiết đơn hàng</li>
                            </NavLink>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
