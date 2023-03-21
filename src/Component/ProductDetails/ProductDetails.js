import React from 'react';
import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import useFetch from '../Customize/Fetch';
import styles from '../ProductDetails/ProductDetails.module.scss';
import Free from '../../assets/Image/free.png';
import Loading from '../Loading/Loading';

function ProductDetails(props) {
    const { onAdd } = props;
    let { id } = useParams();
    const { api: product } = useFetch(`https://6405c39a40597b65de406630.mockapi.io/api/Products/${id}`);

    console.log(product);
    return (
        <div style={{ backgroundColor: 'rgb(248, 249, 251)', paddingBottom: 60 }}>
            <div className={clsx(styles.room1)}>
                <div className={clsx(styles.medium)}>
                    <div className={clsx(styles.breadcrumbs)}>
                        <Link to="/" className={clsx(styles.Link)}>
                            Trang chủ
                        </Link>
                        <span className={clsx(styles.divider)}>/</span>
                        <span>Chi tiết sản phẩm</span>
                    </div>
                </div>
            </div>
            {product.length === 0 ? (
                <Loading />
            ) : (
                <div className={clsx(styles.productDetail)}>
                    <div className={clsx(styles.images)}>
                        <img src={product.image} alt="" />
                    </div>
                    <div className={clsx(styles.right)}>
                        <h1>{product.text}</h1>
                        <div className={clsx(styles.right_price)}>
                            <span className={clsx(styles.right_priceAmount)}>{product.originalPrice}</span>
                            <span className={clsx(styles.right_priceRed)}>{product.sellingPrice}</span>
                        </div>
                        <div className={clsx(styles.right_discountCode)}>
                            <p>Mã giảm giá của shop </p>
                            <span>{product.discount}</span>
                        </div>
                        <div className={clsx(styles.right_transport)}>
                            <p>Vận chuyển</p>
                            <div className={clsx(styles.right_transport__free)}>
                                <img className={clsx(styles.right_transport__img)} src={Free} alt="" />
                                <span>Miễn phí vận chuyển</span>
                            </div>
                        </div>
                        <div className={clsx(styles.right_quantity)}>
                            <div>
                                <p>Số lượng</p>
                            </div>
                            <div className={clsx(styles.right_quantity__count)}>
                                <button>
                                    <svg
                                        enableBackground="new 0 0 10 10"
                                        viewBox="0 0 10 10"
                                        x="0"
                                        y="0"
                                        className="shopee-svg-icon"
                                    >
                                        <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                                    </svg>
                                </button>
                                <span>1</span>
                                <button>
                                    <svg
                                        enableBackground="new 0 0 10 10"
                                        viewBox="0 0 10 10"
                                        x="0"
                                        y="0"
                                        className="shopee-svg-icon icon-plus-sign"
                                    >
                                        <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => onAdd(product)} className={clsx(styles.right_cart)}>
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
