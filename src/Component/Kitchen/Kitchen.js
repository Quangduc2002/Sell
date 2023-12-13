import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import styles from '../Kitchen/Kitchen.module.scss';
import IconTop from '../IconTop/IconTop';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { fetchUser } from '../../services/UseServices';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';

function Kitchen(props) {
    const { indexOfLastProduct, indeOfFirstProduct, productPerPage, pagination, isActive, handleNext, handlePrevious } =
        props;
    const [products, setProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [priceActive, setPriceActive] = useState(1);
    const [isCheckedMaterial, setIsCheckedMaterial] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [discount, setDiscount] = useState(false);
    const [ratings, setRatings] = useState('');
    // let newProducts = [];
    // newProducts = products.slice(0);
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
        setTimeout(() => setProducts(res.data), 1000);
    };

    // function handleFilterProducts() {
    //     var selectedOption = document.querySelector('select').value;
    //     if (selectedOption === '1') {
    //         newProducts.sort((a, b) => {
    //             return (
    //                 parseFloat(a.giaBan - (a.giaBan * a.giamGia) / 100) -
    //                 parseFloat(b.giaBan - (b.giaBan * b.giamGia) / 100)
    //             );
    //         });
    //         setProducts(newProducts);
    //     }
    //     if (selectedOption === '2') {
    //         newProducts.sort((a, b) => {
    //             return (
    //                 parseFloat(b.giaBan - (b.giaBan * b.giamGia) / 100) -
    //                 parseFloat(a.giaBan - (a.giaBan * a.giamGia) / 100)
    //             );
    //         });
    //         setProducts(newProducts);
    //     }
    // }

    const filterProducts = products.filter(
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
    const kitChen = filterProducts.slice(indeOfFirstProduct, indexOfLastProduct);
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

                    <div
                        className={clsx(styles.filter, showFilters ? styles.showFilter : '')}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <i class="fa-solid fa-filter" style={{ color: '#fff', marginRight: 4 }}></i>Lọc
                    </div>

                    {/* <ul>
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
                    </ul> */}
                </div>
            </div>
            <div className={clsx(styles.home__product)}>
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
                {products.length === 0 ? (
                    <Loading />
                ) : kitChen.length === 0 ? (
                    <div style={{ fontSize: 24, color: '#ee4d2d', textAlign: 'center', marginTop: 30 }}>
                        Sản phẩm tìm kiếm không tồn tại
                    </div>
                ) : (
                    <motion.div
                        className={clsx(styles.home__product)}
                        initial={{ y: '4rem', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: spring,
                        }}
                    >
                        <div className={clsx(styles.room_product)}>
                            {kitChen.map((product) => {
                                return <Product key={product.ID} product={product} />;
                            })}
                        </div>
                        <Pagination
                            productPerPage={productPerPage}
                            totalProduct={filterProducts.length}
                            pagination={pagination}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    </motion.div>
                )}
            </div>
            <IconTop />
        </div>
    );
}

export default Kitchen;
