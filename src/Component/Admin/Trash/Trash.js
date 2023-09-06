import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import { motion, spring } from 'framer-motion';
import _ from 'lodash';
import styles from './Trash.module.scss';
import { fetchUser } from '../../../services/UseServices';
import Pagination from '../../Pagination/Pagination';

function Trash(props) {
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
    const [delAll, setDelAll] = useState(false);
    const [id, setId] = useState('');
    // search
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [showSort, setShowSort] = useState(true);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
    }, [delAll]);

    const getUsers = async () => {
        let res = await fetchUser('/products/getTrash');
        setTimeout(() => setProducts(res.data), 500);
    };

    const handleId = (_id) => {
        setShow(!show);
        setId(_id);
    };

    // [DELETE] /products/:id/delete
    const handleDeleteProduct = async () => {
        if (JSON.parse(localStorage.account).roleId === 3) {
            setShow(!show);
            axios
                .put(`http://localhost:8080/products/${id}/delete`, {
                    trangThai: 0,
                })
                .then((res) => {
                    setProducts(products.filter((product) => id !== product.ID));
                    setSucceSearch(products.filter((product) => id !== product.ID));
                    toast.success('Xóa sản phẩm thành công !');
                })
                .catch((err) => {
                    toast.error(err);
                });
        } else {
            setShow(!show);
            toast.warn('Bạn không có quyền xóa sản phẩm !');
        }
    };

    const handleDeleteAllProduct = async () => {
        var selectedOption = document.querySelector('select').value;
        if (JSON.parse(localStorage.account).roleId === 3) {
            if (isChecked.length > 0) {
                if (selectedOption === '') {
                    toast.warn('Vui lòng chọn hành động !');
                } else {
                    axios
                        .put(`http://localhost:8080/products/trash`, {
                            trangThai: 1,
                            isChecked: isChecked,
                            action: selectedOption,
                        })
                        .then((res) => {
                            setDelAll(!delAll);
                            selectedOption === 'delete'
                                ? toast.success('Xóa sản phẩm thành công !')
                                : toast.success('Khôi phục sản phẩm thành công !');
                        })
                        .catch((err) => {
                            toast.error(err);
                        });
                }
            }
        } else {
            toast.warn('Bạn không có quyền xóa sản phẩm !');
        }
    };

    console.log(isChecked);
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

    // checkALL Products
    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        const value = parseInt(e.target.value);
        if (checked) {
            setIsChecked([...isChecked, value]);
        } else {
            setIsChecked(isChecked.filter((check) => value !== check));
        }
    };

    const handleSelectAll = () => {
        if (products.length === isChecked.length) {
            setIsChecked([]);
        } else {
            const postId = products.map((product) => {
                return product.ID;
            });
            setIsChecked(postId);
        }
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
                        <h1>Sản phẩm đã xóa</h1>
                        {paginationProduct.length !== 0 ? (
                            <>
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
                                <div className={clsx(styles.listProduct_action)}>
                                    <div className={clsx(styles.listProduct_action__checkAll)}>
                                        <input
                                            id="checkAll"
                                            type="checkbox"
                                            name="chekAll"
                                            checked={products.length === isChecked.length}
                                            onChange={handleSelectAll}
                                        />
                                        <label htmlFor="checkAll" style={{ marginLeft: 4 }}>
                                            Chọn tất cả
                                        </label>
                                    </div>
                                    <select className={clsx(styles.listProduct_action__select)} required>
                                        <option value="">--Chọn hành động--</option>
                                        <option value="restore">Khôi phục</option>
                                        <option value="delete">Xóa</option>
                                    </select>
                                    <button
                                        className={clsx(
                                            styles.listProduct_action__btnDelAll,
                                            isChecked.length === 0 ? styles.listProduct_action__btnDelAll__active : '',
                                        )}
                                        onClick={handleDeleteAllProduct}
                                    >
                                        Thực hiện
                                    </button>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                {paginationProduct.length === 0 ? (
                    <p>Chưa có sản phẩm bị xóa</p>
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
                                    <th></th>
                                    <th>STT</th>
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
                                              <tr key={product.ID}>
                                                  <td>
                                                      <input
                                                          checked={isChecked.includes(product.ID)}
                                                          value={product.ID}
                                                          type="checkbox"
                                                          onChange={handleCheckboxChange}
                                                      />
                                                  </td>
                                                  <td>{product.ID}</td>
                                                  <td style={{ minWidth: 300 }}>{product.tenSp}</td>
                                                  <td>{product.chatLieu}</td>
                                                  <td>{VND.format(product.giaNhap)}</td>
                                                  <td>{VND.format(product.giaBan)}</td>
                                                  <td>{product.soLuong}</td>
                                                  <td style={{ textAlign: 'center' }}>
                                                      <button className={clsx(styles.table_button)}>
                                                          <Link to={`/admin/DSSP/products/${product.ID}/edit`}>
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
                                                          onClick={() => handleId(product.ID)}
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
                                              <tr key={product.ID}>
                                                  <td>
                                                      <input
                                                          checked={isChecked.includes(product.ID)}
                                                          value={product.ID}
                                                          type="checkbox"
                                                          onChange={handleCheckboxChange}
                                                      />
                                                  </td>
                                                  <td>{product.ID}</td>
                                                  <td style={{ minWidth: 300 }}>{product.tenSp}</td>
                                                  <td>{product.chatLieu}</td>
                                                  <td>{VND.format(product.giaNhap)}</td>
                                                  <td>{VND.format(product.giaBan)}</td>
                                                  <td>{product.soLuong}</td>
                                                  <td style={{ textAlign: 'center' }}>
                                                      <button className={clsx(styles.table_button)}>
                                                          <Link to={`/admin/DSSP/products/${product.ID}/edit`}>
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
                                                          onClick={() => handleId(product.ID)}
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

export default Trash;
