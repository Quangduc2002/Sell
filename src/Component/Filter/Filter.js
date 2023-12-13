import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Filter.module.scss';
import { fetchUser } from '../../services/UseServices';

function Filter(props) {
    const {
        priceActive,
        setPriceActive,
        isCheckedMaterial,
        setIsCheckedMaterial,
        setMinPrice,
        setMaxPrice,
        setDiscount,
        discount,
        ratings,
        setRatings,
    } = props;
    const [materials, setMaterials] = useState('');

    const sortPrices = [
        {
            id: 1,
            value: 'all',
            Content: 'Tất cả',
        },
        {
            id: 2,
            value: '0-10000000',
            Content: '0 ₫ - 10.000.000 ₫',
        },
        {
            id: 3,
            value: '10000000-20000000',
            Content: '10.000.000 ₫ - 20.000.000 ₫',
        },
        {
            id: 4,
            value: '20000000-30000000',
            Content: '20.000.000 ₫ - 30.000.000 ₫',
        },
        {
            id: 5,
            value: '30000000',
            Content: '30.000.000 ₫+',
        },
    ];

    useEffect(() => {
        getMeterial();
    }, []);

    const getMeterial = async () => {
        let res = await fetchUser('/products/meterial');
        setMaterials(res.data);
    };
    const handleFilterByRange = (min, max) => {
        if (min === 'all') {
            setMinPrice('');
            setMaxPrice('');
        } else {
            setMinPrice(min);
            setMaxPrice(max);
        }
    };

    const handleRadioChange = (value) => {
        switch (value) {
            case 'all':
                handleFilterByRange('all');
                break;
            case '0-10000000':
                handleFilterByRange(0, 10000000);
                break;
            case '10000000-20000000':
                handleFilterByRange(10000000, 20000000);
                break;
            case '20000000-30000000':
                handleFilterByRange(20000000, 30000000);
                break;
            case '30000000':
                handleFilterByRange(30000000);
                break;
            default:
                handleFilterByRange('all');
        }
    };

    const handleCheckBoxMaterial = (value, checked) => {
        if (checked) {
            setIsCheckedMaterial([...isCheckedMaterial, parseInt(value)]);
        } else {
            setIsCheckedMaterial(isCheckedMaterial.filter((tenCL) => parseInt(value) !== tenCL));
        }
    };

    const handleCheckRadioRatings = (value) => {
        if (value && value === ratings) {
            setRatings('');
        } else {
            setRatings(value);
        }
    };

    const deleteAllFilter = () => {
        setIsCheckedMaterial('');
        setMinPrice('');
        setMaxPrice('');
        setDiscount(false);
        setPriceActive(1);
        setRatings('');
    };

    const stars = [
        { id: 1, class: 'star-1' },
        { id: 2, class: 'star-2' },
        { id: 3, class: 'star-3' },
        { id: 4, class: 'star-4' },
        { id: 5, class: 'star-5' },
    ];

    return (
        <div className={clsx(styles.panelFilter)}>
            <div className={clsx(styles.panelFilter_container)}>
                <div className={clsx(styles.panelFilter_wrapFilter)}>
                    <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
                        <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Đánh giá</div>
                        <ul>
                            <li>
                                {stars.map((star, index) => {
                                    return (
                                        <div
                                            className={clsx(
                                                +ratings === star.id ? styles.activeRating : '',
                                                styles.comtainerRating,
                                            )}
                                            key={star.id}
                                            onClick={() => handleCheckRadioRatings(star.id)}
                                        >
                                            <div className="stars-outer" style={{ margin: 0 }}>
                                                <div
                                                    className={clsx(
                                                        'stars-inner',
                                                        index + 1 === star.id ? `stars-inner-${index + 1}` : '',
                                                    )}
                                                ></div>
                                            </div>
                                            &nbsp;&nbsp;
                                            <span className={clsx(star.id === 5 ? styles.visibility : '')}>
                                                trở lên
                                            </span>
                                        </div>
                                    );
                                })}
                            </li>
                        </ul>
                    </div>

                    <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
                        <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Chất liệu</div>
                        <ul>
                            {materials &&
                                materials.map((material) => {
                                    return (
                                        <li key={material.id}>
                                            <label
                                                className={clsx(
                                                    isCheckedMaterial.includes(material.id) ? styles.sortPrice : '',
                                                )}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <input
                                                    style={{ width: 16, height: 16 }}
                                                    checked={isCheckedMaterial.includes(material.id)}
                                                    type="checkbox"
                                                    name="materialFilter"
                                                    value={material.id}
                                                    onChange={(e) =>
                                                        handleCheckBoxMaterial(e.target.value, e.target.checked)
                                                    }
                                                />
                                                &nbsp;&nbsp;
                                                {material.tenChatLieu}
                                            </label>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>

                    <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
                        <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Giá bán</div>
                        <ul>
                            {sortPrices.map((sortPrice) => {
                                return (
                                    <li key={sortPrice.id}>
                                        <label className={clsx(sortPrice.id === priceActive ? styles.sortPrice : '')}>
                                            <input
                                                style={{ display: 'none' }}
                                                type="radio"
                                                name="priceFilter"
                                                value={sortPrice.value}
                                                onClick={() => setPriceActive(sortPrice.id)}
                                                onChange={(e) => handleRadioChange(e.target.value)}
                                            />
                                            {sortPrice.Content}
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className={clsx(styles.panelFilter_wrapFilter__filter)}>
                        <div className={clsx(styles.panelFilter_wrapFilter__filter__mtext)}>Dịch Vụ & Khuyến Mãi</div>
                        <ul>
                            <li>
                                <label
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    className={clsx(discount ? styles.sortPrice : '')}
                                >
                                    <input
                                        style={{ width: 16, height: 16 }}
                                        value={'discount'}
                                        type="checkbox"
                                        checked={discount}
                                        name="materialFilter"
                                        onChange={(e) => setDiscount(e.target.checked)}
                                    />
                                    &nbsp;&nbsp;Đang giảm giá
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={clsx(styles.filters)}>
                    <button onClick={deleteAllFilter} className={clsx(styles.filters_btn)}>
                        Xóa tất cả
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
