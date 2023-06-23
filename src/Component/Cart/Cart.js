import React from 'react';
import clsx from 'clsx';
import styles from '../Cart/Cart.module.scss';
import CartIMG from '../../assets/Image/cart.png';

function Cart(props) {
    const { cartItems, onDelete, totalMoney } = props;
    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className={clsx(styles.cart)}>
            {cartItems.length === 0 && (
                <div className={clsx(styles.product)}>
                    <div>
                        <img className={clsx(styles.product_img)} alt="" src={CartIMG} />
                        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                    </div>
                </div>
            )}
            <table className={clsx(styles.table, cartItems.length === 0 ? styles.active : '')}>
                <tbody>
                    {cartItems.length !== 0 && (
                        <tr>
                            <th>Image</th>
                            <th className={clsx(styles.name)}>Name</th>
                            <th style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                Price
                            </th>
                            <th className={clsx(styles.price)}>Quantity</th>
                            <th style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                Total
                            </th>
                            <th>Detete</th>
                        </tr>
                    )}
                    {cartItems.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>
                                    <img
                                        className={clsx(styles.image)}
                                        alt=""
                                        src={`http://localhost:3000/Image/${item.Image}`}
                                    />
                                </td>
                                <td>
                                    {item.TenSp}
                                    <p className={clsx(styles.quantity)}>
                                        {item.qty} x {VND.format(item.GiaBan - (item.GiaBan * item.GiamGia) / 100)}
                                    </p>
                                    {item.qty === 1 ? (
                                        ''
                                    ) : (
                                        <p className={clsx(styles.quantity)}>total: {VND.format(item.total)} </p>
                                    )}
                                </td>
                                <td className={clsx(styles.price)}>
                                    {' '}
                                    {VND.format(item.GiaBan - (item.GiaBan * item.GiamGia) / 100)}
                                </td>
                                <td style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                    x{item.qty}
                                </td>
                                <td className={clsx(styles.price)}>{VND.format(item.total)} </td>
                                <td style={{ textAlign: 'center' }} className={clsx(styles.del)}>
                                    <p
                                        onClick={() => {
                                            onDelete(item);
                                        }}
                                    >
                                        Xóa
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <div className={clsx(styles.total, cartItems.length === 0 ? styles.active : '')}>
                    <span>Tổng tiền: </span>
                    {VND.format(totalMoney)}
                </div>
            </table>
        </div>
    );
}

export default Cart;
