import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import IconTop from '../IconTop/IconTop';
import Product from '../Product/Product';
import Slider1 from '../../assets/Image/slider_1.jpg';
import Slider2 from '../../assets/Image/slider_2.jpg';
import Slider3 from '../../assets/Image/slider_3.jpg';
import '../Home/Home.css';
import styles from '../Home/Home.module.scss';
import SRV1 from '../../assets/Image/srv_1.png';
import SRV2 from '../../assets/Image/srv_2.png';
import SRV3 from '../../assets/Image/srv_3.png';
import { fetchUser } from '../../services/UseServices';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading';

function Home(props) {
    const {
        indexOfLastProduct,
        indeOfFirstProduct,
        productPerPage,
        pagination,
        isActive,
        handleNext,
        handlePrevious,
        succeSearch,
        allSp,
        setAllSp,
    } = props;

    const slickSlides = [Slider1, Slider3, Slider2];
    const settings = {
        // dots: true,
        speed: 1000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
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
                breakpoint: 576,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    const settings1 = {
        // dots: true,
        speed: 1000,
        infinite: true,
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

    const sections = [
        {
            image: SRV1,
            text: 'Sản phẩm chính hãng',
            text1: 'Chúng tôi cam kết 100% sản phẩm là hàng chính hãng, chất lượng cao',
        },

        {
            image: SRV2,
            text: 'Bảo hành chuyên nghiệp',
            text1: 'Dịch vụ bảo hành tận nơi chuyên nghiệp, tận tình và chu đáo cho khách hàng',
        },

        {
            image: SRV3,
            text: 'Giá tốt nhất tại Việt Nam',
            text1: 'Tự tin là nhà cung cấp sản phẩm nội thất với giá cả tốt nhất tại Việt Nam',
        },
    ];
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // axios
        //     .get('http://localhost:8080/products')
        //     .then((res) => {
        //         setProducts(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('/products');
        setTimeout(() => setProducts(res.data), 1000);
    };
    //Xử lý xem thêm sản phẩm
    // const [seeMore, setSeeMore] = useState(8);
    // const handleSeeMore = () => {
    //     setSeeMore(seeMore + 4);
    // };
    // const slice = products.slice(0, seeMore);
    const currentProduct = products.slice(indeOfFirstProduct, indexOfLastProduct);
    const currentProductSearch = succeSearch.slice(indeOfFirstProduct, indexOfLastProduct);

    return (
        <div div className={clsx(styles.home, currentProduct.length === 0 ? styles.MG : '')}>
            {currentProduct.length !== 0 ? (
                <>
                    <div className={clsx(styles.home1)}>
                        <Slider {...settings}>
                            {slickSlides.map((slickSlide, index) => {
                                return <img className={clsx(styles.home1_img)} alt="" src={slickSlide} key={index} />;
                            })}
                        </Slider>
                    </div>

                    <div className={clsx(styles.home_title)}>
                        <h2>Dòng sản phẩm nổi bật</h2>
                        <ul>
                            <li className="tab has-icon">
                                <button
                                    onClick={() => setAllSp(true)}
                                    className={clsx(
                                        styles.home_title_button,
                                        allSp === true ? styles.home_title_button__active : '',
                                    )}
                                >
                                    Tất cả sản phẩm
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className={clsx(styles.home__product)}>
                        <div className={clsx(styles.home_product)}>
                            {allSp === true
                                ? currentProduct.map((product) => {
                                      return <Product key={product._id} product={product} />;
                                  })
                                : currentProductSearch.map((product) => {
                                      return <Product key={product._id} product={product} />;
                                  })}
                        </div>
                        <Pagination
                            productPerPage={productPerPage}
                            totalProduct={allSp ? products.length : succeSearch.length}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    </div>

                    <div className={clsx(styles.box)}>
                        <div className={clsx(styles.box_dark)}>
                            <div className={clsx(styles.box_info)}>
                                <h2>Hệ thống phân phối & bán lẻ nội thất số 1 tại Việt Nam</h2>
                                <p>Hotline: 0965420922 -Email: phamquangduc110@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.inner)}>
                        <div className={clsx(styles.inner_container)}>
                            <h3 className={clsx(styles.inner_title)}>SẢN PHẨM BÁN CHẠY</h3>
                            <div className={clsx(styles.inner_slider)}>
                                <Slider {...settings1}>
                                    {products.map((product) => {
                                        return <Product key={product._id} product={product} />;
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.home_section)}>
                        <div className={clsx(styles.home_section1)}>
                            {sections.map((section, index) => {
                                return (
                                    <div key={index} className={clsx(styles.home_inner)}>
                                        <img alt="" src={section.image} />
                                        <div className={clsx(styles.home_inner__box)}>
                                            <h4 style={{ color: '#f62d3e' }}>{section.text}</h4>
                                            <p>{section.text1}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <IconTop />
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Home;
