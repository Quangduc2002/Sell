import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, spring, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../ProductDetails/ProductDetails.module.scss';
import Free from '../../assets/Image/free.png';
import Loading from '../Loading/Loading';
import '../Product/Product.css';
import { fetchUser } from '../../services/UseServices';
import Product from '../Product/Product';
import { UserContext } from '../../Context/UserContext';

function ProductDetails(props) {
    const { onAdd, count, setCount, toast } = props;
    let { id } = useParams();
    const [product, setProduct] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [showDescribetion, setShowDescribetion] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const settings1 = {
        speed: 1000,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: (
            <button className="slick-arrow slick-prev">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
        ),
        nextArrow: (
            <button className="slick-arrow slick-next">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false,
                },
            },
        ],
    };

    const stars = [
        { id: 1, class: 'star-1' },
        { id: 2, class: 'star-2' },
        { id: 3, class: 'star-3' },
        { id: 4, class: 'star-4' },
        { id: 5, class: 'star-5' },
    ];

    useEffect(() => {
        getProductDetails(id);
        getEvaluation(id);
        getRating();
    }, [id]);

    useEffect(() => {
        if (product.length !== 0) {
            getSimilarProduct(product);
        }
    }, [product]);

    const getProductDetails = async (id) => {
        let res = await fetchUser(`/products/${id}`);
        setTimeout(() => setProduct(res.data), 1000);
    };

    const getRating = async () => {
        if (localStorage.account) {
            let res = await fetchUser(`/products/${JSON.parse(localStorage.account).id}/getRating`);
            setTimeout(() => setRatings(res.data), 1000);
        }
    };

    const getEvaluation = async (id) => {
        let res = await fetchUser(`/products/${id}/evaluation`);
        setEvaluations(res.data);
    };

    const getSimilarProduct = async (smlproduct) => {
        let res = await fetchUser(`/products/${smlproduct.producttypeId}/ProductType`);
        setSimilarProduct(res.data);
    };

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

    // purchase products
    const handlePurchaseProduct = (product) => {
        if (Object.entries(user.account).length !== 0) {
            if (user.account.getUser.roleId === 1) {
                if (product.soLuong === 0) {
                    toast.error('Sản phẩm đã hết hàng !');
                } else {
                    onAdd(product);
                    navigate('/checkOut');
                }
            } else {
                toast.warn('Tài khoản này không thể mua hàng !');
            }
        } else {
            navigate('/Login');
        }
    };

    // Tăng số sản phẩm trong trang chi tiết sản phẩm
    const handleIncreaseProduct = () => {
        if (count < product.soLuong) {
            setCount(count + 1);
        }
    };

    const handleProductreduction = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
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
                        <span>{product.tenSp}</span>
                    </div>
                </div>
            </div>
            {product.length === 0 ? (
                <Loading />
            ) : (
                <motion.div
                    initial={{ y: '4rem', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 1,
                        type: spring,
                    }}
                >
                    <div className={clsx(styles.productDetail)}>
                        <div className={clsx(styles.images)}>
                            <img
                                src={`http://localhost:3000/Image/${product.image}`}
                                alt=""
                                onClick={() => setSelectedId(product.ID)}
                                layoutId={product.ID}
                            />
                        </div>
                        <div className={clsx(styles.right)}>
                            <h1 className="text-3xl">{product.tenSp}</h1>
                            {product.soLuotDanhGia !== 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ borderBottom: '1px solid', color: '#f62d3e' }}>
                                            {product.tongDanhGia.toFixed(1)}
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
                                        {product.soLuotDanhGia} &nbsp;
                                        <span style={{ color: '#767676' }}>Đánh giá</span>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                            <div className={clsx(styles.right_price)}>
                                {product.giamGia ? (
                                    <>
                                        <span className={clsx(styles.right_priceAmount)}>
                                            {VND.format(product.giaBan)}
                                        </span>
                                        <span className={clsx(styles.right_priceRed)}>
                                            {VND.format(product.giaBan - (product.giaBan * product.giamGia) / 100)}
                                        </span>
                                    </>
                                ) : (
                                    <span className={clsx(styles.right_priceRed)}>{VND.format(product.giaBan)}</span>
                                )}
                            </div>

                            {product.giamGia !== 0 ? (
                                <div className={clsx(styles.right_discountCode)}>
                                    <p>Mã giảm giá của shop </p>
                                    <span>-{product.giamGia}%</span>
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

                            <div className={clsx(styles.right_transport)}>
                                <p>Chất liệu</p>
                                <div className={clsx(styles.right_transport__free)}>
                                    <span>{product.Meterial.tenChatLieu}</span>
                                </div>
                            </div>

                            <div className={clsx(styles.right_transport)}>
                                <p>Kích thước</p>
                                <div className={clsx(styles.right_transport__free)}>
                                    <span>{product.kichThuoc} cm</span>
                                </div>
                            </div>

                            <div style={{ marginTop: 30, marginBottom: 30 }}>
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
                                    <div className={clsx(styles.right_quantity__available)}>
                                        {product.soLuong} &nbsp;Sản phẩm có sẵn
                                    </div>
                                </div>
                                {count === product.soLuong ? (
                                    <div style={{ color: '#ee4d2d', marginTop: 10 }}>
                                        Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className={clsx(styles.right_transport)}>
                                <p>Trạng thái</p>
                                <div className={clsx(styles.right_transport__free)}>
                                    {product.soLuong !== 0 ? (
                                        <span style={{ fontWeight: 700 }}>Còn hàng</span>
                                    ) : (
                                        <span style={{ color: ' #ee4d2d', fontWeight: 700 }}>Đã hết hàng</span>
                                    )}
                                </div>
                            </div>

                            <div className={clsx(styles.right_btn)}>
                                <button onClick={() => onAdd(product)} className={clsx(styles.right_addcart)}>
                                    <span>Thêm vào giỏ hàng</span>
                                </button>

                                <button
                                    onClick={() => handlePurchaseProduct(product)}
                                    className={clsx(styles.right_cart)}
                                >
                                    <span>Mua ngay</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.describe)}>
                        <ul className={clsx(styles.describe_ul)}>
                            <li className={clsx(styles.describe_li)}>
                                <p
                                    onClick={() => setShowDescribetion(true)}
                                    className={clsx(styles.describe_p, showDescribetion ? styles.active : '')}
                                >
                                    Mô tả
                                </p>
                            </li>
                            <li className={clsx(styles.describe_li)}>
                                <p
                                    onClick={() => setShowDescribetion(false)}
                                    className={clsx(styles.describe_p, !showDescribetion ? styles.active : '')}
                                >
                                    Đánh giá({product.soLuotDanhGia !== 0 ? product.soLuotDanhGia : 0})
                                </p>
                            </li>
                        </ul>
                        {showDescribetion && (
                            <motion.div
                                className={clsx(styles.describe_describe)}
                                initial={{ y: '4rem', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    type: spring,
                                }}
                            >
                                Đang cập nhật...
                            </motion.div>
                        )}
                        {!showDescribetion && (
                            <motion.div
                                className={clsx(styles.describe_Evaluate)}
                                initial={{ y: '4rem', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    type: spring,
                                }}
                            >
                                <h2>Bạn hãy nhận xét “{product.tenSp}” </h2>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ borderBottom: '1px solid', color: '#f8ce0b' }}>
                                            {product.tongDanhGia.toFixed(1)}
                                        </span>
                                        &nbsp;
                                        <div className={clsx('stars-outer')}>
                                            <div
                                                style={{ width: starPercentageRounded }}
                                                className={clsx('stars-inner')}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    Đánh giá của bạn <span>*</span>
                                </p>

                                <form
                                    method="PUT"
                                    action={`/products/${id}/rating`}
                                    className={clsx(styles.right_formstar)}
                                >
                                    <div className={clsx(styles.describe_star)}>
                                        {stars.map((star) => {
                                            return (
                                                <div
                                                    key={star.id}
                                                    className={clsx(
                                                        styles.describe__star,
                                                        `${star.class}`,
                                                        ratings.map((rating) => {
                                                            return product.ID === rating.productId
                                                                ? rating.numberRating === star.id
                                                                    ? 'active'
                                                                    : ''
                                                                : '';
                                                        }),
                                                    )}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                </form>

                                <div>
                                    <p>Đánh giá sản phẩm</p>
                                    <div className={clsx(styles.describe_evaluation)}>
                                        {stars.map((star, index) => {
                                            return (
                                                <div key={star.id} className={clsx(styles.describe_evaluation__star)}>
                                                    <span style={{ color: 'rgb(248, 206, 11)' }}>
                                                        ({evaluations[index].count} vote)
                                                    </span>
                                                    &nbsp;
                                                    <div
                                                        key={star.id}
                                                        className={clsx(
                                                            `${star.class}`,
                                                            'star',
                                                            index + 1 === star.id ? 'active' : ' ',
                                                        )}
                                                    ></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {similarProduct.length !== 0 && (
                        <div className={clsx(styles.inner)}>
                            <div className={clsx(styles.inner_container)}>
                                <h3 className={clsx(styles.inner_title)}>SẢN PHẨM TƯƠNG TỰ</h3>
                                <div className={clsx(styles.inner_slider)}>
                                    <Slider {...settings1}>
                                        {similarProduct.map((smlProduct) => {
                                            return <Product key={smlProduct.ID} product={smlProduct} />;
                                        })}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {selectedId && (
                            <motion.div
                                style={{ transform: 'translate(-50%, -50%)' }}
                                className="z-20 fixed top-1/2 left-1/2 -translate-y-1/2 w-1/2
                            "
                                layoutId={selectedId}
                            >
                                <motion.img
                                    className="w-full rounded-md"
                                    alt=""
                                    src={`http://localhost:3000/Image/${product.image}`}
                                />
                                <i
                                    onClick={() => setSelectedId(null)}
                                    className="fa-solid fa-xmark absolute top-4 right-4  hover:text-[#ee4d2d] cursor-pointer"
                                ></i>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {selectedId && (
                        <div
                            onClick={() => setSelectedId(null)}
                            className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-[#00000066]"
                        ></div>
                    )}
                </motion.div>
            )}
        </div>
    );
}

export default ProductDetails;
