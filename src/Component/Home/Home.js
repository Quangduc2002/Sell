import React from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import IconTop from '../IconTop/IconTop';
import Product from '../Product/Product';
import Slider1 from '../Image/slider_1.jpg';
import '../Home/Home.css';
import styles from '../Home/Home.module.scss';
import AVT1 from '../Image/avt1.jpg';
import AVT2 from '../Image/avt2.jpg';
import AVT3 from '../Image/avt3.jpg';
import AVT4 from '../Image/avt4.jpg';
import AVT5 from '../Image/avt5.1.jpg';
import AVT6 from '../Image/avt6.jpg';
import AVT7 from '../Image/avt7.jpg';
import AVT8 from '../Image/avt8.1.jpg';
import SRV1 from '../Image/srv_1.png';
import SRV2 from '../Image/srv_2.png';
import SRV3 from '../Image/srv_3.png';

function Home(props) {
    const { onAdd } = props;
    const slickSlides = [Slider1, Slider1, Slider1];
    const settings = {
        // dots: true,
        speed: 1000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
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
    };

    const products = [
        {
            id: 21,
            image: AVT1,
            discount: '-10%',
            text: 'Sập gụ, tủ chè',
            originalPrice: '80.000.000 đ',
            sellingPrice: '72.000.000 đ',
        },
        {
            id: 2,
            image: AVT2,
            discount: '-20%',
            text: 'Kệ Tivi',
            originalPrice: '15.000.000 đ',
            sellingPrice: '12.000.000 đ',
        },
        {
            id: 22,
            image: AVT3,
            discount: '-10%',
            text: 'Bàn thờ gụ',
            originalPrice: '20.000.000 đ',
            sellingPrice: '18.000.000 đ',
        },
        {
            id: 17,
            image: AVT4,
            discount: '-5%',
            text: 'Bàn trang điểm PU',
            originalPrice: '12.000.000 đ',
            sellingPrice: '11.400.000 đ',
        },
        {
            id: 23,
            image: AVT5,
            discount: '-10%',
            text: 'Tủ áo 4 buồng',
            originalPrice: '30.000.000 đ',
            sellingPrice: '27.000.000 đ',
        },
        {
            id: 18,
            image: AVT6,
            discount: '-15%',
            text: 'Giường hoàng gia',
            originalPrice: '25.000.000 đ',
            sellingPrice: '21.250.000 đ',
        },
        {
            id: 24,
            image: AVT7,
            discount: '-10%',
            text: 'Bàn làm việc',
            originalPrice: '15.000.000 đ',
            sellingPrice: '13.500.000 đ',
        },
        {
            id: 25,
            image: AVT8,
            discount: '-20%',
            text: 'Tủ áo 4 buồng PU',
            originalPrice: '35.000.000 đ',
            sellingPrice: '31.500.000 đ',
        },
    ];

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
    return (
        <div className={clsx(styles.home)}>
            <div className={clsx(styles.home1)}>
                <Slider {...settings}>
                    {slickSlides.map((slickSlide, index) => {
                        return <img className={clsx(styles.home1_img)} alt="" src={slickSlide} key={index} />;
                    })}
                </Slider>
            </div>
            <div className={clsx(styles.home_title)}>
                <h2>Dòng sản phẩm nổi bật</h2>
            </div>

            <div className={clsx(styles.home_product)}>
                {products.map((product) => {
                    return <Product key={product.id} product={product} onAdd={onAdd} />;
                })}
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
        </div>
    );
}

export default Home;
