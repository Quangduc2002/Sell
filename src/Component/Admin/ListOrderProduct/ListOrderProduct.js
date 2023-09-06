import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { motion, spring } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ListOrderProduct.module.scss';
import { fetchUser } from '../../../services/UseServices';
import Loading from '../../Loading/Loading';
import Pagination from '../../Pagination/Pagination';

function ListOrderProduct(props) {
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

    const [listOrder, setListOrder] = useState([]);
    const [annouce, setAnnouce] = useState([]);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);

    // search
    const search = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    useEffect(() => {
        getOrder();
        getAnnouceOrder();
    }, [status]);

    const getOrder = async () => {
        let res = await fetchUser('/order/listOrder');
        setTimeout(() => setListOrder(res.data), 1000);
    };

    const getAnnouceOrder = async () => {
        let res = await fetchUser('/order/annouce');
        setTimeout(() => setAnnouce(res.data), 1000);
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

    const filteredItems = listOrder.filter((item) => {
        return item.tenKH.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const currentListOrder = listOrder.slice(indeOfFirstProduct, indexOfLastProduct);
    const currentUserSearch = succeSearch.slice(indeOfFirstProduct, indexOfLastProduct);

    const handleSendEmail = (orderProduct) => {
        axios
            .post('http://localhost:8080/order/Email', {
                orderProduct: orderProduct,
                trangThaiDH: 1,
            })
            .then((res) => {
                setStatus(true);
                toast.success('Xác nhận đơn hàng thành công !');
            })
            .catch((err) => {
                toast.error('Xác nhận đơn hàng không thành công !');
            });
    };

    return (
        <div className={clsx(styles.listOrderProduct)}>
            <div className={clsx(styles.listOrderProduct_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Quản lý đơn hàng
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Danh sách đơn hàng</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className={clsx(styles.listOrderProduct_header__search)}>
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
                                className={clsx(styles.listOrderProduct_header__xmark, 'fa-solid fa-xmark')}
                            ></i>
                        )}
                    </div>
                    <div
                        onClick={() => setShow(!show)}
                        className={clsx(
                            styles.listOrderProduct_annouce,
                            show ? styles.listOrderProduct_annouce_active : '',
                        )}
                    >
                        <div>
                            <i className="fa-sharp fa-solid fa-bell"></i>
                            <span>{annouce.length}</span>
                        </div>
                        {show && (
                            <div className={clsx(styles.listOrderProduct_detailannouce)}>
                                <div className={clsx(styles.listOrderProduct_detailannouce__title)}>
                                    <p>Bạn có {annouce.length} thông báo</p>
                                </div>

                                {annouce.map((annouce) => {
                                    return (
                                        <div className={clsx(styles.listOrderProduct_detailannouce1)}>
                                            <div className={clsx(styles.listOrderProduct_detailannouce1__icon)}>
                                                <i className="fa-solid fa-clipboard"></i>
                                            </div>

                                            <div className={clsx(styles.listOrderProduct_detailannouce1__inform)}>
                                                <p>
                                                    {annouce.tenKH} (MDH{annouce.ID})
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={clsx(styles.listOrderProduct_PD)}>
                <div className={clsx(styles.listOrderProduct_title)}>
                    <div>
                        <h1>Danh sách đơn hàng</h1>
                        {listOrder && currentListOrder ? (
                            <p style={{ marginBottom: 10 }}>
                                Hiển thị 1 đến{' '}
                                {currentUserSearch.length !== 0 ? currentUserSearch.length : currentListOrder.length}{' '}
                                trong {listOrder.length} đơn hàng
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                {listOrder.length === 0 ? (
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
                                    <th>Mã ĐH</th>
                                    <th>Tên khách hàng</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Phương thức thanh toán</th>
                                    <th>Trạng thái đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUserSearch.length === 0
                                    ? currentListOrder.map((order) => {
                                          return (
                                              <tr key={order.ID}>
                                                  <td>MDH{order.ID}</td>
                                                  <td>{order.tenKH}</td>
                                                  <td>{order.diaChi}</td>
                                                  <td>{order.soDT}</td>
                                                  <td>{order.phuongThucTT}</td>
                                                  <td>
                                                      {order.trangThaiDH === 1 ? (
                                                          <button className={clsx(styles.table_confirmed)}>
                                                              Đã xác nhận
                                                          </button>
                                                      ) : order.trangThaiDH === 0 ? (
                                                          <button
                                                              className={clsx(styles.table_status)}
                                                              onClick={() => handleSendEmail(order)}
                                                          >
                                                              Xác nhận đơn hàng
                                                          </button>
                                                      ) : (
                                                          <button className={clsx(styles.table_cancel)}>Đã hủy</button>
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : currentUserSearch.map((order) => {
                                          return (
                                              <tr key={order.ID}>
                                                  <td>MDH{order.ID}</td>
                                                  <td>{order.tenKH}</td>
                                                  <td>{order.diaChi}</td>
                                                  <td>{order.soDT}</td>
                                                  <td>{order.phuongThucTT}</td>
                                                  <td>
                                                      {order.trangThaiDH === 1 ? (
                                                          <button className={clsx(styles.table_confirmed)}>
                                                              Đã xác nhận
                                                          </button>
                                                      ) : order.trangThaiDH === 0 ? (
                                                          <button
                                                              className={clsx(styles.table_status)}
                                                              onClick={() => handleSendEmail(order)}
                                                          >
                                                              Xác nhận đơn hàng
                                                          </button>
                                                      ) : (
                                                          <button className={clsx(styles.table_cancel)}>Đã hủy</button>
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>
                        {currentListOrder.length > 0 && (
                            <Pagination
                                productPerPage={productPerPage}
                                pagination={pagination}
                                totalProduct={currentUserSearch.length !== 0 ? succeSearch.length : listOrder.length}
                                isActive={isActive}
                                handleNext={handleNext}
                                handlePrevious={handlePrevious}
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ListOrderProduct;
