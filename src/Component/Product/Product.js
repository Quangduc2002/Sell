import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import styles from '../Product/Product.module.scss';
import './Product.css';

function Product(props) {
    const { product } = props;
    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    // đánh giá sản phẩm
    // khai báo 5 sao
    const starsTotal = 5;
    const starPercentage = (product.TongDanhGia / starsTotal) * 100;
    // Math.round làm tròn lên
    const starPercentageRounded = `${Math.round(starPercentage)}%`;

    return (
        <motion.div
            className={clsx(styles.room_product1)}
            initial={{ y: '4rem', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 1,
                type: spring,
            }}
        >
            <Link to={`/Chitietsanpham/${product._id}`} className={clsx(styles.room_product1_link)}>
                <div className={clsx(styles.room_image)}>
                    <div className={clsx(styles.room_badge)}>
                        <img alt="" src={`http://localhost:3000/Image/${product.Image}`} />
                        {product.GiamGia === '' ? (
                            ''
                        ) : (
                            <span className={clsx(styles.room_pos)}>-{product.GiamGia}%</span>
                        )}
                    </div>
                </div>
                <div className={clsx(styles.room_text)}>
                    <p title={product.text}>{product.TenSp}</p>
                    <div className={clsx(styles.room_price)}>
                        {product.GiamGia !== '' ? (
                            <span className={clsx(styles.priceAmount)}>{VND.format(product.GiaBan)}</span>
                        ) : (
                            ''
                        )}
                        <span className={clsx(styles.priceRed)}>
                            {VND.format(product.GiaBan - (product.GiaBan * product.GiamGia) / 100)}
                        </span>
                    </div>
                    <div className="stars-outer">
                        <div style={{ width: starPercentageRounded }} className="stars-inner"></div>
                    </div>
                    <p style={{ fontSize: 14 }}>Hà Nội</p>
                </div>
            </Link>
        </motion.div>
    );
}

export default Product;
