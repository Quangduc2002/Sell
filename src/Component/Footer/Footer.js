import React from 'react';
import clsx from 'clsx';
import styles from '../Footer/Footer.module.scss';
import Payment from '../Image/payment.png';
import Phone from '../Image/phone_footer.png';

function Footer() {
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
                        <li>Phòng khách</li>
                        <li>Phòng bếp</li>
                        <li>Phòng làm việc</li>
                        <li>Phòng ngủ</li>
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
