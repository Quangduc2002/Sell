import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from '../Footer/Footer.module.scss';
import Payment from '../../assets/Image/payment.png';
import Phone from '../../assets/Image/phone_footer.png';

function Footer() {
    const links = [
        { path: '/', title: 'Trang chủ' },
        { path: '/phongkhach', title: 'Phòng khách' },
        { path: '/phongbep', title: 'Phòng bếp' },
        { path: '/phonglamviec', title: 'Phòng làm việc' },
        { path: '/phongngu', title: 'Phòng ngủ' },
    ];
    return (
        <div className={clsx(styles.Footer)}>
            <div className={clsx(styles.Footer1)}>
                <div>
                    <ul>
                        <h2 className={clsx(styles.Footer1_section)}>Hệ thống cửa hàng</h2>
                        <li>
                            <i className={clsx(styles.Footer1_i, 'fa-solid fa-location-dot')}></i>
                            <span className={clsx(styles.Footer1_span)}>
                                Địa chỉ: Đại Nghiệp-Tân Dân-Phú Xuyên-Hà Nội
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <h2 className={clsx(styles.Footer1_section)}>Danh mục</h2>
                        {links.map((link) => {
                            return (
                                <li key={link.path}>
                                    <NavLink key={link.path} className={clsx(styles.Footer1_link)} to={link.path}>
                                        {link.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <ul>
                        <h2 className={clsx(styles.Footer1_section)}>Chấp nhận thanh toán</h2>
                        <li>
                            <img className={clsx(styles.Footer1_card)} src={Payment} alt="" />
                        </li>
                        <li className={clsx(styles.Footer1_icon)}>
                            <img src={Phone} alt="" />
                            <div className={clsx(styles.Footer1_iconbox)}>
                                <p style={{ color: '#f62d3e' }}>0965420922</p>
                                <p>Phục vụ 24/24, cả thứ 7 & CN</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
