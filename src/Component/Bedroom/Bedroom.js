import React from 'react';
import clsx from 'clsx';
import IconTop from '../IconTop/IconTop';
import styles from '../Bedroom/Bedroom.module.scss';
import AVT1 from '../../assets/Image/avt4.1.jpg';
import AVT2 from '../../assets/Image/avt4.jpg';
import AVT3 from '../../assets/Image/avt6.jpg';
import AVT4 from '../../assets/Image/avt10.jpg';
import AVT5 from '../../assets/Image/avt11.jpg';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
function Bedroom(props) {
    const { onAdd } = props;
    const products = [
        {
            id: 16,
            image: AVT1,
            discount: '0%',
            text: 'Bàn trang điểm',
            originalPrice: '',
            sellingPrice: '12.000.000 đ',
        },
        {
            id: 17,
            image: AVT2,
            discount: '0%',
            text: 'Bàn trang điểm PU',
            originalPrice: '',
            sellingPrice: '14.000.000 đ',
        },
        {
            id: 18,
            image: AVT3,
            discount: '0%',
            text: 'Giường hoàng gia',
            originalPrice: '',
            sellingPrice: ' 21.000.000 đ',
        },
        {
            id: 19,
            image: AVT4,
            discount: '0%',
            text: 'Giường PU',
            originalPrice: '',
            sellingPrice: '17.000.000 đ',
        },
        {
            id: 20,
            image: AVT5,
            discount: '0%',
            text: 'Giường chữ X',
            originalPrice: '',
            sellingPrice: '18.000.000 đ',
        },
    ];
    return (
        <div style={{ backgroundColor: '#ebebeb', paddingBottom: 60 }}>
            <div className={clsx(styles.room1)}>
                <div className={clsx(styles.medium)}>
                    <div className={clsx(styles.breadcrumbs)}>
                        <Link to="/" className={clsx(styles.Link)}>
                            Trang chủ
                        </Link>
                        <span className={clsx(styles.divider)}>/</span>
                        <span>Phòng ngủ</span>
                    </div>

                    <ul>
                        <select defaultValue="2" className={clsx(styles.select)}>
                            <option value="0">Thứ tự theo mức độ phổ biến</option>
                            <option value="1">Thứ tự theo điểm đánh giá</option>
                            <option value="2">Mới nhất</option>
                            <option value="3">Thứ tự theo giá: thấp đến cao</option>
                            <option value="4">Thứ tự theo giá: cao đến thấp</option>
                        </select>
                    </ul>
                </div>
            </div>
            <div className={clsx(styles.home__product)}>
                <div className={clsx(styles.room_product)}>
                    {products.map((product) => {
                        return <Product key={product.id} product={product} onAdd={onAdd} />;
                    })}
                </div>
            </div>
            <IconTop />
        </div>
    );
}

export default Bedroom;
