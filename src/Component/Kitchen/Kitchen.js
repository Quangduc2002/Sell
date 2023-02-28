import React from 'react';
import clsx from 'clsx';
import styles from '../Kitchen/Kitchen.module.scss';
import IconTop from '../IconTop/IconTop';
import AVT1 from '../../assets/Image/ban-ghe-an-1.jpg';
import AVT2 from '../../assets/Image/ban-ghe-an-2.jpg';
import AVT3 from '../../assets/Image/ban-ghe-an-3.jpg';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

function Kitchen(props) {
    const products = [
        {
            id: 8,
            image: AVT1,
            discount: '-50%',
            text: 'Bàn ghế ăn mã XBA186',
            originalPrice: '22.000.000 đ',
            sellingPrice: '11.000.000 đ',
        },

        {
            id: 9,
            image: AVT2,
            discount: '-10%',
            text: 'Bàn ghế ăn mã XBA185',
            originalPrice: '11.000.000 đ',
            sellingPrice: '9.900.000 đ',
        },
        {
            id: 10,
            image: AVT3,
            discount: '-25%',
            text: 'Bàn ghế ăn mã XBA188',
            originalPrice: '44.000.000 đ',
            sellingPrice: ' 33.000.000 đ',
        },
    ];
    const { onAdd } = props;
    return (
        <div style={{ backgroundColor: '#ebebeb', paddingBottom: 60 }}>
            <div className={clsx(styles.room1)}>
                <div className={clsx(styles.medium)}>
                    <div className={clsx(styles.breadcrumbs)}>
                        <Link to="/" className={clsx(styles.Link)}>
                            Trang chủ
                        </Link>
                        <span className={clsx(styles.divider)}>/</span>
                        <span>Phòng bếp</span>
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

export default Kitchen;
