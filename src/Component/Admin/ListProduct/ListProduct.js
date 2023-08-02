import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import _ from 'lodash';
import styles from '../ListProduct/ListProduct.module.scss';
import { fetchUser, fetchDelete } from '../../../services/UseServices';
import Pagination from '../../Pagination/Pagination';
import Loading from '../../Loading/Loading';

function ListProduct(props) {
    const {
        toast,
        indexOfLastProduct,
        indeOfFirstProduct,
        productPerPage,
        pagination,
        isActive,
        handleNext,
        handlePrevious,
    } = props;
    const search = useRef();
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    // search
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    const [showSort, setShowSort] = useState(true);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('/products');
        setTimeout(() => setProducts(res.data), 1000);
    };

    const handleId = (_id) => {
        setShow(!show);
        setId(_id);
    };

    // [DELETE] /products/:id/delete
    const handleDeleteProduct = async () => {
        setShow(!show);
        let res = await fetchDelete(`/products/${id}/delete`);
        if (res && res.status === 200) {
            setProducts(products.filter((product) => id !== product.id));
            setSucceSearch(products.filter((product) => id !== product.id));
            toast.success('Xóa sản phẩm thành công !');
        }
    };

    const HandleClear = () => {
        setSearchQuery('');
    };

    //search
    const HandleOnSubmit = (event) => {
        setSucceSearch(filteredItems);
        setSearchQuery('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Handle the Enter key press event
            HandleOnSubmit();
        }
    };
    const filteredItems = products.filter((item) => {
        return item.tenSp.toLowerCase().includes(searchQuery.toLowerCase());
    });

    //phân trang
    const paginationProduct = products.slice(indeOfFirstProduct, indexOfLastProduct);
    const currentProductSearch = succeSearch.slice(indeOfFirstProduct, indexOfLastProduct);
    // sắp xếp
    const hanldeSort = (sort, sortField) => {
        const sortOrderBy = _.orderBy(products, [sortField], [sort]);
        setProducts(sortOrderBy);
        if (currentProductSearch.length > 0) {
            setSucceSearch(sortOrderBy);
        }
        setShowSort(!showSort);
    };

    return (
        <div className={clsx(styles.listProduct)}>
            <div className={clsx(styles.listProduct_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Trang
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Quản lý sản phẩm</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className={clsx(styles.listProduct_header__search)}>
                        <input
                            type="text"
                            value={searchQuery}
                            placeholder="Tìm kiếm..."
                            ref={search}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        {searchQuery && (
                            <i
                                onClick={HandleClear}
                                className={clsx(styles.listProduct_header__xmark, 'fa-solid fa-xmark')}
                            ></i>
                        )}
                    </div>
                    <div className={clsx(styles.listProduct_annouce)}>
                        <div>
                            <i className="fa-sharp fa-solid fa-bell"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.listProduct_PD)}>
                <div className={clsx(styles.listProduct_title)}>
                    <div>
                        <h1>Danh sách sản phẩm</h1>
                        {paginationProduct && products ? (
                            <p>
                                Hiển thị 1 đến{' '}
                                {currentProductSearch.length !== 0
                                    ? currentProductSearch.length
                                    : paginationProduct.length}{' '}
                                trong {products.length} sản phẩm
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                    <Link to="/admin/ThemSp" className={clsx(styles.listProduct_add)}>
                        <i className="fa-regular fa-square-plus" style={{ style: '#fff', marginRight: 6 }}></i>
                        Thêm sản phẩm
                    </Link>
                </div>
                {paginationProduct.length === 0 ? (
                    <Loading />
                ) : (
                    <motion.div
                        initial={{ y: '4rem', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: spring,
                        }}
                    >
                        <table className={clsx(styles.table)}>
                            <thead>
                                <tr>
                                    <th>
                                        Tên sản phẩm
                                        {showSort ? (
                                            <i
                                                style={{ marginLeft: 6, cursor: 'pointer' }}
                                                onClick={() => hanldeSort('asc', 'tenSp')}
                                                className="fa-solid fa-arrow-up-wide-short"
                                            ></i>
                                        ) : (
                                            <i
                                                style={{ marginLeft: 6, cursor: 'pointer' }}
                                                onClick={() => hanldeSort('desc', 'tenSp')}
                                                className="fa-solid fa-arrow-up-short-wide"
                                            ></i>
                                        )}
                                    </th>
                                    <th>Chất liệu</th>
                                    <th>Giá nhập</th>
                                    <th>Giá bán</th>
                                    <th>Số lượng</th>
                                    <th style={{ textAlign: 'center' }}>Sửa </th>
                                    <th style={{ textAlign: 'center' }}>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProductSearch.length === 0
                                    ? paginationProduct.map((product) => {
                                          return (
                                              <tr key={product.id}>
                                                  <td style={{ minWidth: 300 }}>{product.tenSp}</td>
                                                  <td>{product.chatLieu}</td>
                                                  <td>{VND.format(product.giaNhap)}</td>
                                                  <td>{VND.format(product.giaBan)}</td>
                                                  <td>{product.soLuong}</td>

                                                  <td style={{ textAlign: 'center' }}>
                                                      <button className={clsx(styles.table_button)}>
                                                          <Link to={`/admin/DSSP/products/${product.id}/edit`}>
                                                              <i
                                                                  style={{ color: '#0d6efd' }}
                                                                  className={clsx('fa-solid fa-pen-to-square')}
                                                              ></i>
                                                          </Link>
                                                      </button>
                                                  </td>
                                                  <td style={{ textAlign: 'center' }}>
                                                      <button
                                                          className={clsx(styles.table_button)}
                                                          onClick={() => handleId(product.id)}
                                                      >
                                                          <i
                                                              style={{ color: '#eb1336' }}
                                                              className={clsx('fas fa-trash')}
                                                          ></i>
                                                      </button>
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : currentProductSearch.map((product) => {
                                          return (
                                              <tr key={product.id}>
                                                  <td style={{ minWidth: 300 }}>{product.tenSp}</td>
                                                  <td>{product.chatLieu}</td>
                                                  <td>{VND.format(product.giaNhap)}</td>
                                                  <td>{VND.format(product.giaBan)}</td>
                                                  <td>{product.soLuong}</td>
                                                  <td style={{ textAlign: 'center' }}>
                                                      <button className={clsx(styles.table_button)}>
                                                          <Link to={`/admin/DSSP/products/${product.id}/edit`}>
                                                              <i
                                                                  style={{ color: '#0d6efd' }}
                                                                  className={clsx('fa-solid fa-pen-to-square')}
                                                              ></i>
                                                          </Link>
                                                      </button>
                                                  </td>
                                                  <td style={{ textAlign: 'center' }}>
                                                      <button
                                                          className={clsx(styles.table_button)}
                                                          onClick={() => handleId(product.id)}
                                                      >
                                                          <i
                                                              style={{ color: '#eb1336' }}
                                                              className={clsx('fas fa-trash')}
                                                          ></i>
                                                      </button>
                                                  </td>
                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>

                        {paginationProduct.length > 0 && (
                            <Pagination
                                productPerPage={productPerPage}
                                pagination={pagination}
                                totalProduct={currentProductSearch.length !== 0 ? succeSearch.length : products.length}
                                isActive={isActive}
                                handleNext={handleNext}
                                handlePrevious={handlePrevious}
                            />
                        )}
                    </motion.div>
                )}

                {show && (
                    <div className={clsx(styles.modal)}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className={clsx(styles.modal_header)}>
                                    <h5 className="modal-title">Xóa sản phẩm</h5>
                                    <button type="button" className={clsx(styles.modal_close)}>
                                        <span onClick={() => setShow(!show)} aria-hidden="true">
                                            &times;
                                        </span>
                                    </button>
                                </div>
                                <div className={clsx(styles.modal_body)}>
                                    <p>Bạn chắc chắn muốn xóa sản phẩm không ?</p>
                                </div>
                                <div className={clsx(styles.modal_footer)}>
                                    <button
                                        onClick={() => setShow(!show)}
                                        type="button"
                                        className={clsx(styles.modal_btnClose)}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={handleDeleteProduct}
                                        type="button"
                                        className={clsx(styles.modal_btnSave)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListProduct;
