/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect, useRef } from 'react';
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
import Filter from '../Filter/Filter';

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
        setProductPerPage,
        setSearchs,
        filteredProducts,
        searchs,
        handleKeyPress,
    } = props;

    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [priceActive, setPriceActive] = useState(1);
    const [isCheckedMaterial, setIsCheckedMaterial] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [discount, setDiscount] = useState(false);
    const [ratings, setRatings] = useState('');
    const search = useRef();

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
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('/products');
        setTimeout(() => setProducts(res.data), 0);
    };

    const currentProductSearch = succeSearch.slice(indeOfFirstProduct, indexOfLastProduct);

    const filteredData = products.filter(
        (product) =>
            (isCheckedMaterial.length === 0 || isCheckedMaterial.includes(product.chatLieu)) &&
            (maxPrice
                ? (minPrice === '' ||
                      product.giaBan - (product.giaBan * product.giamGia) / 100 >= parseInt(minPrice)) &&
                  (maxPrice === '' || product.giaBan - (product.giaBan * product.giamGia) / 100 <= parseInt(maxPrice))
                : minPrice === '' || product.giaBan - (product.giaBan * product.giamGia) / 100 >= parseInt(minPrice)) &&
            (discount ? product.giamGia > 0 : product.giamGia >= 0) &&
            (ratings === '' || (ratings ? product.tongDanhGia >= ratings : '')),
    );
    const homeProducts = filteredData.slice(indeOfFirstProduct, indexOfLastProduct);

    const show = (value) => {
        if (value === 'search') {
            setShowSearch(!showSearch);
            setShowFilters(false);
        } else if (value === 'filter') {
            setShowFilters(!showFilters);
            setShowSearch(false);
        }
    };

    return (
        <div div className={clsx(styles.home, products.length === 0 ? styles.MG : '')}>
            {products.length !== 0 ? (
                <div>
                    <div className={clsx(styles.home1, 'home1')}>
                        <Slider {...settings}>
                            {slickSlides.map((slickSlide, index) => {
                                return <img className={clsx(styles.home1_img)} alt="" src={slickSlide} key={index} />;
                            })}
                        </Slider>
                    </div>

                    <div className={clsx(styles.home_title)}>
                        <h2 className="text-2xl">Dòng sản phẩm nổi bật</h2>
                        <ul>
                            <li>
                                <label>Hiển thị: </label>
                                <select
                                    className={clsx(styles.home_title__show)}
                                    onChange={(e) => setProductPerPage(e.target.value)}
                                    defaultValue={0}
                                >
                                    <option value={0} disabled className="hidden">
                                        Mặc định
                                    </option>
                                    <option value={products.length}>Tất cả</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                </select>
                            </li>

                            <div style={{ display: 'flex' }}>
                                <li
                                    className={clsx(styles.filter, showSearch ? styles.showFilter : '')}
                                    onClick={() => show('search')}
                                >
                                    <i
                                        className="fa-sharp fa-solid fa-magnifying-glass"
                                        style={{ color: '#fff', marginRight: 4 }}
                                    ></i>
                                    Tìm kiếm
                                </li>
                                <li
                                    value="filter"
                                    className={clsx(styles.filter, showFilters ? styles.showFilter : '')}
                                    onClick={() => show('filter')}
                                >
                                    <i className="fa-solid fa-filter" style={{ color: '#fff', marginRight: 4 }}></i>
                                    Lọc
                                </li>
                            </div>
                        </ul>
                    </div>

                    {showSearch && (
                        <div className={clsx(styles.wrapper2_search)}>
                            <div style={{ position: 'relative' }}>
                                <div className={clsx(styles.wrapper2_search__border)}>
                                    <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                                    <input
                                        className={clsx(styles.input)}
                                        ref={search}
                                        value={searchs}
                                        onChange={(event) => setSearchs(event.target.value)}
                                        placeholder="Tìm kiếm..."
                                        onKeyDown={handleKeyPress}
                                    />
                                </div>
                                {filteredProducts.length !== 0 && (
                                    <ul
                                        className={clsx(
                                            styles.wrapper2_search__ul,
                                            styles.ul,
                                            searchs.length === 0 ? styles.wrapper2_active : '',
                                        )}
                                    >
                                        {filteredProducts.map((product, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setSearchs(product.tenSp);
                                                    search.current.focus();
                                                }}
                                            >
                                                <div>
                                                    <i
                                                        style={{ marginRight: 16, color: '#555', fontSize: '14px' }}
                                                        className="fa-solid fa-magnifying-glass"
                                                    ></i>
                                                    {product.tenSp}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {showFilters && (
                        <Filter
                            products={products}
                            priceActive={priceActive}
                            setPriceActive={setPriceActive}
                            isCheckedMaterial={isCheckedMaterial}
                            setIsCheckedMaterial={setIsCheckedMaterial}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            setDiscount={setDiscount}
                            discount={discount}
                            ratings={ratings}
                            setRatings={setRatings}
                        />
                    )}

                    {homeProducts.length === 0 ? (
                        <div className="mx-5 ">
                            <p className="xl:w-[1170px] mx-auto py-3 md:text-xl xs:text-sm rounded-md text-red-500 font-semibold bg-orange-200 text-center">
                                Sản phẩm tìm kiếm không tồn tại
                            </p>
                        </div>
                    ) : (
                        <div className={clsx(styles.home__product, 'mt-10')} data-aos="fade-up">
                            <div className={clsx(styles.home_product)}>
                                {allSp === true
                                    ? homeProducts.map((product) => {
                                          return <Product key={product.ID} product={product} />;
                                      })
                                    : currentProductSearch.map((product) => {
                                          return <Product key={product.ID} product={product} />;
                                      })}
                            </div>
                            <Pagination
                                productPerPage={productPerPage}
                                totalProduct={allSp ? filteredData.length : succeSearch.length}
                                pagination={pagination}
                                isActive={isActive}
                                handleNext={handleNext}
                                handlePrevious={handlePrevious}
                            />
                        </div>
                    )}

                    <div className={clsx(styles.box)} data-aos="fade-left">
                        <div className={clsx(styles.box_dark)}>
                            <div className={clsx(styles.box_info)}>
                                <h2>Hệ thống phân phối & bán lẻ nội thất số 1 tại Việt Nam</h2>
                                <p>Hotline: 0965420922 -Email: phamquangduc110@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.inner)} data-aos="fade-up">
                        <div className={clsx(styles.inner_container)}>
                            <h3 className={clsx(styles.inner_title, 'text-xl')}>SẢN PHẨM BÁN CHẠY</h3>
                            <div className={clsx(styles.inner_slider)}>
                                <Slider {...settings1}>
                                    {products.map((product) => {
                                        return <Product key={product.ID} product={product} />;
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.home_section)} data-aos="fade-right">
                        <div className={clsx(styles.home_section1)}>
                            {sections.map((section, index) => {
                                return (
                                    <div key={index} className={clsx(styles.home_inner)}>
                                        <img alt="" src={section.image} />
                                        <div className={clsx(styles.home_inner__box)}>
                                            <h4 className="text-xl" style={{ color: '#f62d3e' }}>
                                                {section.text}
                                            </h4>
                                            <p>{section.text1}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div id="map" className="">
                        <iframe
                            className="w-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d932.7971648143149!2d105.87148043532217!3d20.743146089316024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b5e3c9c99c79%3A0x3d0fce91d17c1a46!2zUFZWQys4WDUsIMSQ4bqhaSBOZ2hp4buHcCwgUGjDuiBYdXnDqm4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1716365150372!5m2!1svi!2sus"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <IconTop />
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Home;
