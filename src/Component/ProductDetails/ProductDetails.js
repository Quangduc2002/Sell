import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import styles from '../ProductDetails/ProductDetails.module.scss';
import Free from '../../assets/Image/free.png';
import Loading from '../Loading/Loading';
import '../Product/Product.css';
import { fetchUser } from '../../services/UseServices';

function ProductDetails(props) {
    const { onAdd, count, handleProductreduction, handleIncreaseProduct, userName, toast } = props;
    let { id } = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // axios
        //     .get(`http://localhost:8080/products/${id}`)
        //     .then((res) => {
        //         setTimeout(() => setProduct(res.data), 1000);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        getUsers(id);
    }, [id]);

    const getUsers = async (id) => {
        let res = await fetchUser(`/products/${id}`);
        setTimeout(() => setProduct(res.data), 1000);
    };

    const handleSubmitEvaluate = (e) => {
        e.preventDefault();
        //lấy giá trị thẻ select option
        if (userName) {
            const star = document.querySelector('select').value;
            axios
                .put(`http://localhost:8080/products/${id}/rating`, {
                    star: star,
                })
                .then((res) => {
                    toast.success('Đánh giá thành công !');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            navigate('/Login');
        }
    };

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
        <div style={{ backgroundColor: 'rgb(248, 249, 251)', paddingBottom: 60 }}>
            <div className={clsx(styles.room1)}>
                <div className={clsx(styles.medium)}>
                    <div className={clsx(styles.breadcrumbs)}>
                        <Link to="/" className={clsx(styles.Link)}>
                            Trang chủ
                        </Link>
                        <span className={clsx(styles.divider)}>
                            <i className="fa-solid fa-angle-right"></i>
                        </span>
                        <span>Chi tiết sản phẩm</span>
                        <span className={clsx(styles.divider)}>
                            <i className="fa-solid fa-angle-right"></i>
                        </span>
                        <span>{product.TenSp}</span>
                    </div>
                </div>
            </div>
            {product.length === 0 ? (
                <Loading />
            ) : (
                <div className={clsx(styles.productDetail)}>
                    <div className={clsx(styles.images)}>
                        <img src={`http://localhost:3000/Image/${product.Image}`} alt="" />
                    </div>
                    <div className={clsx(styles.right)}>
                        <h1>{product.TenSp}</h1>
                        {product.NumReview !== 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <span style={{ borderBottom: '1px solid', color: '#f62d3e' }}>
                                        {product.TongDanhGia.toFixed(1)}
                                    </span>
                                    &nbsp;
                                    <div className={clsx(styles.right_star, 'stars-outer')}>
                                        <div
                                            style={{ width: starPercentageRounded }}
                                            className={clsx(styles.right_starinner, 'stars-inner')}
                                        ></div>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: 15 }}>
                                    {product.NumReview} &nbsp;
                                    <span style={{ color: '#767676' }}>Đánh giá</span>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className={clsx(styles.right_price)}>
                            {product.GiamGia ? (
                                <>
                                    <span className={clsx(styles.right_priceAmount)}>{VND.format(product.GiaBan)}</span>
                                    <span className={clsx(styles.right_priceRed)}>
                                        {VND.format(product.GiaBan - (product.GiaBan * product.GiamGia) / 100)}
                                    </span>
                                </>
                            ) : (
                                <span className={clsx(styles.right_priceRed)}>{VND.format(product.GiaBan)}</span>
                            )}
                        </div>
                        {product.GiamGia !== '' ? (
                            <div className={clsx(styles.right_discountCode)}>
                                <p>Mã giảm giá của shop </p>
                                <span>-{product.GiamGia}%</span>
                            </div>
                        ) : (
                            ''
                        )}
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
                                <button onClick={handleProductreduction}>
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
                                <span>{count}</span>
                                <button onClick={handleIncreaseProduct}>
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
                            <div className={clsx(styles.right_quantity__available)}>Sản phẩm có sẵn </div>
                        </div>
                        <form
                            method="PUT"
                            action={`/products/${id}/rating`}
                            className={clsx(styles.right_quantity, styles.right_formstar)}
                        >
                            <select className={clsx(styles.right_select)}>
                                <option value="1">1 Sao</option>
                                <option value="2">2 Sao</option>
                                <option value="3">3 Sao</option>
                                <option value="4">4 Sao</option>
                                <option value="5">5 Sao</option>
                            </select>

                            <button
                                onClick={(e) => handleSubmitEvaluate(e)}
                                style={{ height: 'auto', padding: 10, marginLeft: 20 }}
                                className={clsx(styles.right_cart)}
                            >
                                <span>Đánh giá</span>
                            </button>
                        </form>
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
