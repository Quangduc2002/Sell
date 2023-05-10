import React from 'react';
import clsx from 'clsx';
import styles from '../Cart/Cart.module.scss';
import CartIMG from '../../assets/Image/cart.png';

function Cart(props) {
    const { cartItems, onDelete, totalMoney } = props;

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
                            <tr key={item.id}>
                                <td>
                                    <img className={clsx(styles.image)} alt="" src={item.image} />
                                </td>
                                <td>
                                    {item.text}
                                    <p className={clsx(styles.quantity)}>
                                        {item.qty} x {item.sellingPrice}
                                    </p>
                                    {item.qty === 1 ? (
                                        ''
                                    ) : (
                                        <p className={clsx(styles.quantity)}>total: {item.total.toFixed(3)}.000 đ</p>
                                    )}
                                </td>
                                <td className={clsx(styles.price)}>{item.sellingPrice}</td>
                                <td style={{ textAlign: 'center' }} className={clsx(styles.price)}>
                                    x{item.qty}
                                </td>
                                <td className={clsx(styles.price)}>{item.total.toFixed(3)}.000 đ</td>
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
                    {totalMoney.toFixed(3)}.000 đ
                </div>
            </table>
        </div>
    );
}

export default Cart;
