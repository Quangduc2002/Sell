import React from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import IconTop from '../IconTop/IconTop';
import Product from '../Product/Product';
import Slider1 from '../../assets/Image/slider_1.jpg';
import '../Home/Home.css';
import styles from '../Home/Home.module.scss';
import AVT1 from '../../assets/Image/avt1.jpg';
import AVT2 from '../../assets/Image/avt2.jpg';
import AVT3 from '../../assets/Image/avt3.jpg';
import AVT4 from '../../assets/Image/avt4.jpg';
import AVT5 from '../../assets/Image/avt5.1.jpg';
import AVT6 from '../../assets/Image/avt6.jpg';
import AVT7 from '../../assets/Image/avt7.jpg';
import AVT8 from '../../assets/Image/avt8.1.jpg';
import SRV1 from '../../assets/Image/srv_1.png';
import SRV2 from '../../assets/Image/srv_2.png';
import SRV3 from '../../assets/Image/srv_3.png';

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

    // const settings1 = {
    //     // dots: true,
    //     speed: 500,
    //     infinite: true,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     prevArrow: (
    //         <button className="slick-arrow slick-prev">
    //             <i className="fa-solid fa-chevron-left"></i>
    //         </button>
    //     ),
    //     nextArrow: (
    //         <button className="slick-arrow slick-next">
    //             <i className="fa-solid fa-chevron-right"></i>
    //         </button>
    //     ),
    // };

    const products = [
        {
            id: 21,
            image: AVT1,
            discount: '-10%',
            text: 'S???p g???, t??? ch??',
            originalPrice: '80.000.000 ??',
            sellingPrice: '72.000.000 ??',
        },
        {
            id: 2,
            image: AVT2,
            discount: '-20%',
            text: 'K??? Tivi',
            originalPrice: '15.000.000 ??',
            sellingPrice: '12.000.000 ??',
        },
        {
            id: 22,
            image: AVT3,
            discount: '-10%',
            text: 'B??n th??? g???',
            originalPrice: '20.000.000 ??',
            sellingPrice: '18.000.000 ??',
        },
        {
            id: 17,
            image: AVT4,
            discount: '-5%',
            text: 'B??n trang ??i???m PU',
            originalPrice: '12.000.000 ??',
            sellingPrice: '11.400.000 ??',
        },
        {
            id: 23,
            image: AVT5,
            discount: '-10%',
            text: 'T??? ??o 4 bu???ng',
            originalPrice: '30.000.000 ??',
            sellingPrice: '27.000.000 ??',
        },
        {
            id: 18,
            image: AVT6,
            discount: '-15%',
            text: 'Gi?????ng ho??ng gia',
            originalPrice: '25.000.000 ??',
            sellingPrice: '21.250.000 ??',
        },
        {
            id: 24,
            image: AVT7,
            discount: '-10%',
            text: 'B??n l??m vi???c',
            originalPrice: '15.000.000 ??',
            sellingPrice: '13.500.000 ??',
        },
        {
            id: 25,
            image: AVT8,
            discount: '-20%',
            text: 'T??? ??o 4 bu???ng PU',
            originalPrice: '35.000.000 ??',
            sellingPrice: '31.500.000 ??',
        },
    ];

    const sections = [
        {
            image: SRV1,
            text: 'S???n ph???m ch??nh h??ng',
            text1: 'Ch??ng t??i cam k???t 100% s???n ph???m l?? h??ng ch??nh h??ng, ch???t l?????ng cao',
        },

        {
            image: SRV2,
            text: 'B???o h??nh chuy??n nghi???p',
            text1: 'D???ch v??? b???o h??nh t???n n??i chuy??n nghi???p, t???n t??nh v?? chu ????o cho kh??ch h??ng',
        },

        {
            image: SRV3,
            text: 'Gi?? t???t nh???t t???i Vi???t Nam',
            text1: 'T??? tin l?? nh?? cung c???p s???n ph???m n???i th???t v???i gi?? c??? t???t nh???t t???i Vi???t Nam',
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
                <h2>D??ng s???n ph???m n???i b???t</h2>
            </div>

            <div className={clsx(styles.home__product)}>
                <div className={clsx(styles.home_product)}>
                    {products.map((product) => {
                        return <Product key={product.id} product={product} onAdd={onAdd} />;
                    })}
                </div>
            </div>

            <div className={clsx(styles.box)}>
                <div className={clsx(styles.box_dark)}>
                    <div className={clsx(styles.box_info)}>
                        <h2>H??? th???ng ph??n ph???i & b??n l??? n???i th???t s??? 1 t???i Vi???t Nam</h2>
                        <p>Hotline: 0965420922 -Email: phamquangduc110@gmail.com</p>
                    </div>
                </div>
            </div>

            {/* <div className={clsx(styles.inner)}>
                <div className={clsx(styles.inner_container)}>
                    <h3 className={clsx(styles.inner_title)}>S???N PH???M B??N CH???Y</h3>
                    <div className={clsx(styles.inner_slider)}>
                        <Slider {...settings1}>
                            {products.map((product) => {
                                return <Product key={product.id} product={product} onAdd={onAdd} />;
                            })}
                        </Slider>
                    </div>
                </div>
            </div> */}

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
