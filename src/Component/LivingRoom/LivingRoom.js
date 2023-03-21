import React, { useState } from 'react';
import clsx from 'clsx';
import styles from '../LivingRoom/LivingRoom.module.scss';
import IconTop from '../IconTop/IconTop';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import useFetch from '../Customize/Fetch';
import Loading from '../Loading/Loading';

function LivingRoom() {
    const { api: products } = useFetch('https://6405c39a40597b65de406630.mockapi.io/api/Products');
    let newProducts = [];
    newProducts = products.slice(0, 7);
    const [product, setProduct] = useState([]);

    function handleFilterProducts() {
        var selectedOption = document.querySelector('select').value;

        if (selectedOption === '0') {
            setProduct('');
        }
        if (selectedOption === '1') {
            newProducts.sort((a, b) => {
                return parseFloat(a.sellingPrice) - parseFloat(b.sellingPrice);
            });
            setProduct(newProducts);
        }
        if (selectedOption === '2') {
            newProducts.sort((a, b) => {
                return parseFloat(b.sellingPrice) - parseFloat(a.sellingPrice);
            });
            setProduct(newProducts);
        }
    }
    return (
        <div style={{ backgroundColor: '#f8f9fb', paddingBottom: 60 }}>
            <div className={clsx(styles.room1)}>
                <div className={clsx(styles.medium)}>
                    <div className={clsx(styles.breadcrumbs)}>
                        <Link to="/" className={clsx(styles.Link)}>
                            Trang chủ
                        </Link>
                        <span className={clsx(styles.divider)}>/</span>
                        <span>Phòng Khách</span>
                    </div>

                    <ul>
                        <select
                            defaultValue="0"
                            onChange={() => handleFilterProducts()}
                            className={clsx(styles.select)}
                        >
                            <option style={{ display: 'none' }} disabled value="0">
                                Giá
                            </option>
                            <option value="1">Giá: thấp đến cao</option>
                            <option value="2">Giá: cao đến thấp</option>
                        </select>
                    </ul>
                </div>
            </div>

            <div className={clsx(styles.home__product)}>
                {newProducts.length === 0 ? (
                    <Loading />
                ) : (
                    <div className={clsx(styles.room_product)}>
                        {products && products.length && product.length === 0
                            ? newProducts.map((product) => {
                                  return <Product key={product.id} product={product} />;
                              })
                            : product.map((product) => {
                                  return <Product key={product.id} product={product} />;
                              })}
                    </div>
                )}
            </div>

            <IconTop />
        </div>
    );
}

export default LivingRoom;
