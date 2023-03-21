import React from 'react';
import clsx from 'clsx';
import styles from '../Product/Product.module.scss';
import { Link } from 'react-router-dom';

function Product(props) {
    const { product } = props;

    return (
        <div className={clsx(styles.room_product1)}>
            <Link to={`/Chitietsanpham/${product.id}`} className={clsx(styles.room_product1_link)}>
                <div className={clsx(styles.room_image)}>
                    <div className={clsx(styles.room_badge)}>
                        <img alt="" src={product.image} />
                        {product.discount === '-0%' ? (
                            ''
                        ) : (
                            <span className={clsx(styles.room_pos)}>{product.discount}</span>
                        )}
                    </div>
                </div>
                <div className={clsx(styles.room_text)}>
                    <p title={product.text}>{product.text}</p>
                    <div className={clsx(styles.room_price)}>
                        {product.originalPrice !== '' ? (
                            <span className={clsx(styles.priceAmount)}>{product.originalPrice}</span>
                        ) : (
                            ''
                        )}
                        <span className={clsx(styles.priceRed)}>{product.sellingPrice}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Product;
