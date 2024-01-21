import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import { motion, spring } from 'framer-motion';
import _ from 'lodash';
import styles from '../ListProduct/ListProduct.module.scss';
import { fetchUser } from '../../../services/UseServices';
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
        setProductPerPage,
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
    const [showSortPrice, setShowSortPrice] = useState(true);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        getUsers();
    }, [delAll]);

    const getUsers = async () => {
        let res = await fetchUser('/products');
        setTimeout(() => setProducts(res.data), 500);
    };

    const handleId = (_id) => {
        setShow(!show);
        setId(_id);
    };

    // [DELETE] /products/:id/delete
    const handleDeleteProduct = async () => {
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
    };

    const handleDeleteAllProduct = async () => {
        var selectedOption = document.querySelector('select').value;
        if (isChecked.length > 0) {
            if (selectedOption === '') {
                toast.warn('Vui lòng chọn hành động !');
            } else {
                axios
                    .put(`http://localhost:8080/products/deleteAll`, {
                        trangThai: 0,
                        isChecked: isChecked,
                        action: selectedOption,
                    })
                    .then((res) => {
                        setDelAll(!delAll);
                        toast.success('Xóa sản phẩm thành công !');
                    })
                    .catch((err) => {
                        toast.error(err);
                    });
            }
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

    // sắp xếp tên sản phẩm
    const hanldeSort = (sort, sortField) => {
        const sortOrderBy = _.orderBy(products, [sortField], [sort]);
        setProducts(sortOrderBy);
        if (currentProductSearch.length > 0) {
            setSucceSearch(sortOrderBy);
        }
        setShowSort(!showSort);
    };

    // sắp xếp giá
    const hanldeSortPrice = (sort, sortField) => {
        const sortOrderByPrice = _.orderBy(products, [sortField], [sort]);
        setProducts(sortOrderByPrice);
        if (currentProductSearch.length > 0) {
            setSucceSearch(sortOrderByPrice);
        }
        setShowSortPrice(!showSortPrice);
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
        <div className={clsx(styles.listProduct, 'xs:w-full md:w-[80%]')}>
            <div className={clsx(styles.listProduct_header, 'flex-wrap')}>
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

            <div className={clsx(styles.listProduct_PD, 'overflow-hidden overflow-x-scroll')}>
                <div className={clsx(styles.listProduct_title, 'flex-wrap')}>
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
                        <div className={clsx(styles.listProduct_action, 'flex-wrap gap-4')}>
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
                    </div>

                    <div className={clsx(styles.listProduct_title__right, 'my-4 flex-wrap gap-2 pl-2.5')}>
                        <Link to="/admin/ThemSp" className={clsx(styles.listProduct_add)}>
                            <i className="fa-regular fa-square-plus" style={{ style: '#fff', marginRight: 6 }}></i>
                            Thêm sản phẩm
                        </Link>

                        <div className={clsx(styles.listProduct_title__right__show)}>
                            <select
                                className={clsx(styles.home_title__show)}
                                onChange={(e) => setProductPerPage(e.target.value)}
                            >
                                <option style={{ display: 'none' }}>Hiển thị</option>
                                <option value={products.length}>Tất cả</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                    </div>
                </div>
                {paginationProduct.length === 0 ? (
                    <Loading />
                ) : (
                    <motion.div
                        className="overflow-hidden  overflow-x-auto pb-5"
                        initial={{ y: '4rem', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: spring,
                        }}
                    >
                        <table className={clsx(styles.table, 'border-collapse p-2 border w-[1070px]')}>
                            <thead className="border-collapse p-2">
                                <tr className="border-collapse p-2 p-2">
                                    <th className="bg-[#ddd] text-left border-collapse p-2"></th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">STT</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">
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
                                    <th className="bg-[#ddd] text-left border-collapse p-2" style={{ minWidth: 150 }}>
                                        Chất liệu
                                    </th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Giá nhập</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">
                                        Giá bán
                                        {showSortPrice ? (
                                            <i
                                                style={{ marginLeft: 6, cursor: 'pointer' }}
                                                onClick={() => hanldeSortPrice('asc', 'giaBan')}
                                                className="fa-solid fa-arrow-up-wide-short"
                                            ></i>
                                        ) : (
                                            <i
                                                style={{ marginLeft: 6, cursor: 'pointer' }}
                                                onClick={() => hanldeSortPrice('desc', 'giaBan')}
                                                className="fa-solid fa-arrow-up-short-wide"
                                            ></i>
                                        )}
                                    </th>
                                    <th className="text-center bg-[#ddd] text-left border-collapse p-2">Số lượng</th>
                                    <th className="text-center bg-[#ddd] text-left border-collapse p-2">Sửa </th>
                                    <th className="text-center bg-[#ddd] text-left border-collapse p-2">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProductSearch.length === 0
                                    ? paginationProduct.map((product) => {
                                          return (
                                              <tr className="border-collapse p-2 p-2" key={product.ID}>
                                                  <td className="border-collapse p-2">
                                                      <input
                                                          checked={isChecked.includes(product.ID)}
                                                          value={product.ID}
                                                          type="checkbox"
                                                          onChange={handleCheckboxChange}
                                                      />
                                                  </td>
                                                  <td className="border-collapse p-2">{product.ID}</td>
                                                  <td className="border-collapse p-2" style={{ minWidth: 300 }}>
                                                      {product.tenSp}
                                                  </td>
                                                  <td className="border-collapse p-2">
                                                      {product.Meterial.tenChatLieu}
                                                  </td>
                                                  <td className="border-collapse p-2">{VND.format(product.giaNhap)}</td>
                                                  <td className="border-collapse p-2">{VND.format(product.giaBan)}</td>
                                                  <td className="border-collapse p-2" style={{ textAlign: 'center' }}>
                                                      {product.soLuong}
                                                  </td>
                                                  <td className="border-collapse p-2" style={{ textAlign: 'center' }}>
                                                      <button className={clsx(styles.table_button)}>
                                                          <Link to={`/admin/DSSP/products/${product.ID}/edit`}>
                                                              <i
                                                                  style={{ color: '#0d6efd' }}
                                                                  className={clsx('fa-solid fa-pen-to-square')}
                                                              ></i>
                                                          </Link>
                                                      </button>
                                                  </td>
                                                  <td className="border-collapse p-2" style={{ textAlign: 'center' }}>
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
                                              <tr className="border-collapse p-2 p-2" key={product.ID}>
                                                  <td className="border-collapse p-2">
                                                      <input
                                                          checked={isChecked.includes(product.ID)}
                                                          value={product.ID}
                                                          type="checkbox"
                                                          onChange={handleCheckboxChange}
                                                      />
                                                  </td>
                                                  <td className="border-collapse p-2">{product.ID}</td>
                                                  <td className="border-collapse p-2" style={{ minWidth: 300 }}>
                                                      {product.tenSp}
                                                  </td>
                                                  <td className="border-collapse p-2">{product.chatLieu}</td>
                                                  <td className="border-collapse p-2">{VND.format(product.giaNhap)}</td>
                                                  <td className="border-collapse p-2">{VND.format(product.giaBan)}</td>
                                                  <td className="border-collapse p-2" style={{ textAlign: 'center' }}>
                                                      {product.soLuong}
                                                  </td>
                                                  <td className="border-collapse p-2" style={{ textAlign: 'center' }}>
                                                      <button className={clsx(styles.table_button)}>
                                                          <Link to={`/admin/DSSP/products/${product.ID}/edit`}>
                                                              <i
                                                                  style={{ color: '#0d6efd' }}
                                                                  className={clsx('fa-solid fa-pen-to-square')}
                                                              ></i>
                                                          </Link>
                                                      </button>
                                                  </td>
                                                  <td className="border-collapse p-2" style={{ textAlign: 'center' }}>
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

export default ListProduct;
