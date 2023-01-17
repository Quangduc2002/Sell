import React from 'react';
import clsx from 'clsx';
import styles from '../Product/Product.module.scss';

function Product(props) {
    const { product, onAdd } = props;
    return (
        <div className={clsx(styles.room_product1)}>
            <div className={clsx(styles.room_image)}>
                <div className={clsx(styles.room_badge)}>
                    <img alt="" src={product.image} />
                    <span className={clsx(styles.room_pos)}>{product.discount}</span>
                </div>
            </div>
            <div className={clsx(styles.room_text)}>
                <p>{product.text}</p>
                <div className={clsx(styles.room_price)}>
                    <span className={clsx(styles.priceAmount)}>{product.originalPrice}</span>
                    <span className={clsx(styles.priceRed)}>{product.sellingPrice}</span>
                </div>
                <button onClick={() => onAdd(product)}>Thêm vào giỏ</button>
            </div>
        </div>
    );
}

export default Product;
