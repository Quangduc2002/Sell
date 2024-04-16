import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
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
    const starPercentage = (product.tongDanhGia / starsTotal) * 100;
    // Math.round làm tròn lên
    const starPercentageRounded = `${Math.round(starPercentage)}%`;
    return (
        <div className={clsx(styles.room_product1)}>
            <div className={clsx(styles.room_product1_link)}>
                <div className={clsx(styles.room_image)}>
                    <div className={clsx(styles.room_badge, styles.hover)}>
                        <img alt="" src={`http://localhost:3000/Image/${product.image}`} />
                        <div
                            className={clsx(
                                styles.productDetail,
                                'productDetail absolute w-full flex justify-center bottom-[16%] ',
                            )}
                        >
                            <Link
                                to={`/Chitietsanpham/${product.ID}`}
                                className="lg:text-base px-3.5 py-2 bg-white xs:text-xs rounded-[20px] hover:text-white hover:bg-black"
                            >
                                Chi tiết sản phẩm
                            </Link>
                        </div>
                        {product.giamGia === '0' ? (
                            ''
                        ) : (
                            <span className={clsx(styles.room_pos, 'top-2')}>-{product.giamGia}%</span>
                        )}
                    </div>
                </div>
                <div className={clsx(styles.room_text)}>
                    <p title={product.text}>{product.tenSp}</p>
                    <div className={clsx(styles.room_price)}>
                        {product.giamGia !== '0' ? (
                            <span className={clsx(styles.priceAmount)}>{VND.format(product.giaBan)}</span>
                        ) : (
                            ''
                        )}
                        <span className={clsx(styles.priceRed)}>
                            {VND.format(product.giaBan - (product.giaBan * product.giamGia) / 100)}
                        </span>
                    </div>
                    <div className="stars-outer">
                        <div style={{ width: starPercentageRounded }} className="stars-inner"></div>
                    </div>
                    <p style={{ fontSize: 14 }}>Hà Nội</p>
                </div>
            </div>
        </div>
    );
}

export default Product;
