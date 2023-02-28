import React from 'react';
import clsx from 'clsx';
import styles from '../WorkRoom/WorkRoom.module.scss';
import IconTop from '../IconTop/IconTop';
import AVT1 from '../../assets/Image/ban-lam-viec-1.jpg';
import AVT2 from '../../assets/Image/ban-lam-viec-2.jpg';
import AVT3 from '../../assets/Image/ban-lam-viec-3.jpg';
import AVT4 from '../../assets/Image/ban-lam-viec-4.jpg';
import AVT5 from '../../assets/Image/ban-lam-viec-5.jpg';
import AVT7 from '../../assets/Image/avt7.jpg';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
function WorkRoom(props) {
    const { onAdd } = props;
    const products = [
        {
            id: 11,
            image: AVT1,
            discount: '-8%',
            text: 'Bàn làm việc hòa phát HP120HL3CPO',
            originalPrice: '7.150.000 đ',
            sellingPrice: '6.600.000 đ',
        },
        {
            id: 12,
            image: AVT2,
            discount: '-12%',
            text: 'Phòng làm việc B1',
            originalPrice: '85.000.000 đ',
            sellingPrice: '72.000.000 đ',
        },
        {
            id: 13,
            image: AVT3,
            discount: '-12%',
            text: 'Phòng làm việc B2',
            originalPrice: '7.150.000 đ',
            sellingPrice: '6.600.000 đ',
        },
        {
            id: 14,
            image: AVT4,
            discount: '-10%',
            text: 'Phòng làm việc B3',
            originalPrice: '50.000.000 đ',
            sellingPrice: '45.000.000 đ',
        },
        {
            id: 15,
            image: AVT5,
            discount: '-10%',
            text: 'Phòng làm việc B4',
            originalPrice: '50.000.000 đ',
            sellingPrice: '45.000.000 đ',
        },
        {
            id: 24,
            image: AVT7,
            discount: '-10%',
            text: 'Bàn làm việc',
            originalPrice: '15.000.000 đ',
            sellingPrice: '13.500.000 đ',
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
                        <span>Phòng làm việc</span>
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
                        return <Product key={product.id} onAdd={onAdd} product={product} />;
                    })}
                </div>
            </div>

            <IconTop />
        </div>
    );
}

export default WorkRoom;
