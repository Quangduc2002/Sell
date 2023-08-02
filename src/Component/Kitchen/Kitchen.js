import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from '../Kitchen/Kitchen.module.scss';
import IconTop from '../IconTop/IconTop';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { fetchUser } from '../../services/UseServices';

function Kitchen() {
    const [products, setProducts] = useState([]);
    let newProducts = [];
    newProducts = products.slice(0);
    useEffect(() => {
        // axios
        //     .get('http://localhost:8080/producttypes/2')
        //     .then((res) => {
        //         setTimeout(() => setProducts(res.data.Product), 1000);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('/products/2/ProductType');
        // let res = await fetchUser('http://localhost:8686/products/2/ProductType');
        setTimeout(() => setProducts(res.data), 1000);
    };

    function handleFilterProducts() {
        var selectedOption = document.querySelector('select').value;
        if (selectedOption === '1') {
            newProducts.sort((a, b) => {
                return (
                    parseFloat(a.giaBan - (a.giaBan * a.giamGia) / 100) -
                    parseFloat(b.giaBan - (b.giaBan * b.giamGia) / 100)
                );
            });
            setProducts(newProducts);
        }
        if (selectedOption === '2') {
            newProducts.sort((a, b) => {
                return (
                    parseFloat(b.giaBan - (b.giaBan * b.giamGia) / 100) -
                    parseFloat(a.giaBan - (a.giaBan * a.giamGia) / 100)
                );
            });
            setProducts(newProducts);
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
                        <span>Phòng bếp</span>
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
                {products.length === 0 ? (
                    <Loading />
                ) : (
                    <div className={clsx(styles.room_product)}>
                        {products.map((product) => {
                            return <Product key={product._id} product={product} />;
                        })}
                    </div>
                )}
            </div>
            <IconTop />
        </div>
    );
}

export default Kitchen;
