import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import path from '../../Ultis/Path';
import styles from './HeaderOrder.module.scss';

function HeaderOrder(props) {
    return (
        <div className={clsx(styles.order)}>
            <div className={clsx(styles.order_container)}>
                <ul className={clsx(styles.order_ul)}>
                    <li className={clsx(styles.order_li)}>
                        <NavLink to={path.LayoutOrderAll} className={clsx(styles.order_link)}>
                            <span className={clsx(styles.order_span)}>Tất cả</span>
                        </NavLink>
                    </li>
                    <li className={clsx(styles.order_li)}>
                        <NavLink to={path.LayoutOrderWaitConfirm} className={clsx(styles.order_link)}>
                            <span className={clsx(styles.order_span)}>Chờ xác nhận</span>
                        </NavLink>
                    </li>
                    <li className={clsx(styles.order_li)}>
                        <NavLink to={path.LayoutOrderDeliver} className={clsx(styles.order_link)}>
                            <span className={clsx(styles.order_span)}>Đang giao</span>
                        </NavLink>
                    </li>
                    <li className={clsx(styles.order_li)}>
                        <NavLink to={path.LayoutOrderFinish} className={clsx(styles.order_link)}>
                            <span className={clsx(styles.order_span)}>Hoàn thành</span>
                        </NavLink>
                    </li>
                    <li className={clsx(styles.order_li)}>
                        <NavLink to={path.LayoutOrderCancel} className={clsx(styles.order_link)}>
                            <span className={clsx(styles.order_span)}>Đã hủy</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeaderOrder;
