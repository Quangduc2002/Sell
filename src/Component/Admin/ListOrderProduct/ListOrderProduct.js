import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ListOrderProduct.module.scss';
import { fetchUser, axiosPost } from '../../../services/UseServices';
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

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [listOrder, setListOrder] = useState([]);
    const [annouce, setAnnouce] = useState([]);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(false);
    const [orderDetail, setOrderDetail] = useState([]);

    // search
    const search = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    useEffect(() => {
        getOrder();
        getAnnouceOrder();
    }, [status]);

    const handleModal = async (id) => {
        setShowModal(!showModal);
        let res = await fetchUser(`/orderItem/${id}`);
        setOrderDetail(res.data);
    };

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
        axiosPost('/order/Email', {
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

    let total = 0;
    for (let i = 0; i < orderDetail.length; i++) {
        total += orderDetail[i].donGia;
    }

    return (
        <div className={clsx(styles.listOrderProduct, 'xs:w-full md:w-[80%]')}>
            <div className={clsx(styles.listOrderProduct_header, 'flex-wrap')}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Quản lý đơn hàng
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Danh sách đơn hàng</span>
                </div>

                <div className="flex my-4">
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

            <div className={clsx(styles.listOrderProduct_PD, 'overflow-hidden overflow-x-scroll')}>
                <div className={clsx(styles.listOrderProduct_title, 'flex-wrap')}>
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
                                <tr className="border-collapse p-2 ">
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Mã ĐH</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Tên khách hàng</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Địa chỉ</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Số điện thoại</th>
                                    <th className="bg-[#ddd] border-collapse p-2 text-center">
                                        Phương thức thanh toán
                                    </th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Trạng thái đơn hàng</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Chi tiết đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUserSearch.length === 0
                                    ? currentListOrder.map((order) => {
                                          return (
                                              <tr className="border-collapse p-2 " key={order.ID}>
                                                  <td className="border-collapse p-2">MDH{order.ID}</td>
                                                  <td className="border-collapse p-2">{order.tenKH}</td>
                                                  <td className="border-collapse p-2">{order.diaChi}</td>
                                                  <td className="border-collapse p-2">{order.soDT}</td>
                                                  <td className="border-collapse p-2 text-center">
                                                      {order.isPay === true
                                                          ? 'Đã thanh toán'
                                                          : 'Thanh toán khi nhận hàng'}
                                                  </td>
                                                  <td className="border-collapse p-2">
                                                      {order.trangThaiDH === 1 ? (
                                                          <button className={clsx(styles.table_confirmed, 'text-sm')}>
                                                              Đã xác nhận
                                                          </button>
                                                      ) : order.trangThaiDH === 0 ? (
                                                          <button
                                                              className={clsx(styles.table_status, 'text-sm')}
                                                              onClick={() => handleSendEmail(order)}
                                                          >
                                                              Xác nhận đơn hàng
                                                          </button>
                                                      ) : (
                                                          <button className={clsx(styles.table_cancel, 'text-sm')}>
                                                              Đã hủy
                                                          </button>
                                                      )}
                                                  </td>
                                                  <td className="border-collapse p-2 text-center">
                                                      <button
                                                          onClick={() => handleModal(order.ID)}
                                                          className={clsx(
                                                              'bg-[#3ABAF4] text-white py-1.5 px-3 rounded-md ',
                                                          )}
                                                      >
                                                          Chi tiết
                                                      </button>
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : currentUserSearch.map((order) => {
                                          return (
                                              <tr className="border-collapse p-2 p-2" key={order.ID}>
                                                  <td className="border-collapse p-2">MDH{order.ID}</td>
                                                  <td className="border-collapse p-2">{order.tenKH}</td>
                                                  <td className="border-collapse p-2">{order.diaChi}</td>
                                                  <td className="border-collapse p-2">{order.soDT}</td>
                                                  <td className="border-collapse p-2">{order.phuongThucTT}</td>
                                                  <td className="border-collapse p-2">
                                                      {order.trangThaiDH === 1 ? (
                                                          <button className={clsx(styles.table_confirmed, 'text-sm')}>
                                                              Đã xác nhận
                                                          </button>
                                                      ) : order.trangThaiDH === 0 ? (
                                                          <button
                                                              className={clsx(styles.table_status, 'text-sm')}
                                                              onClick={() => handleSendEmail(order)}
                                                          >
                                                              Xác nhận đơn hàng
                                                          </button>
                                                      ) : (
                                                          <button className={clsx(styles.table_cancel, 'text-sm')}>
                                                              Đã hủy
                                                          </button>
                                                      )}
                                                  </td>
                                                  <td className="border-collapse p-2">
                                                      <button
                                                          onClick={() => handleModal(order.ID)}
                                                          className={clsx(styles.table_action)}
                                                      >
                                                          Chi tiết
                                                      </button>
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

                {showModal && (
                    <>
                        <div onClick={() => setShowModal(!showModal)} className={clsx(styles.modal1, ' z-10')}></div>

                        <div className={clsx(styles.modal, 'z-20')} tabindex="-1" role="dialog">
                            <div className={clsx(styles.modal_header)}>
                                <h5 className="modal-title">Chi tiết hóa đơn</h5>
                                <button
                                    type="button"
                                    className={clsx(styles.modal_close)}
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span onClick={() => setShowModal(!showModal)} aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                            </div>

                            <table
                                style={{ border: '1px solid #e5e7eb' }}
                                className={clsx(styles.table, 'w-full  border-gray-400 border-collapse p-2')}
                            >
                                <thead className="border-collapse p-2">
                                    <tr className="border-collapse p-2">
                                        <th className="bg-[#ddd] text-left border-collapse p-2">Mã đơn hàng</th>
                                        <th className="bg-[#ddd] text-left border-collapse p-2">Mã sản phẩm</th>
                                        <th className="bg-[#ddd] text-left border-collapse p-2">Ảnh sản phẩm</th>
                                        <th className="bg-[#ddd] text-left border-collapse p-2">Tên sản phẩm</th>
                                        <th className="bg-[#ddd] text-left border-collapse p-2">Số lượng</th>
                                        <th className="bg-[#ddd] text-left border-collapse p-2">tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetail.map((order, index) => {
                                        return (
                                            <tr className="border-collapse p-2 " key={order.ID}>
                                                <td className="border-collapse p-2">MDH{order.orderID}</td>
                                                <td className="border-collapse p-2">SP{order.productID}</td>
                                                <td className="border-collapse p-2">
                                                    <img
                                                        className={clsx(styles.table_image, 'w-[100px] h-[50px]')}
                                                        src={`http://localhost:3000/Image/${order.image}`}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="border-collapse p-2">{order.tenSp}</td>
                                                <td className="border-collapse p-2">{order.soLuong}</td>
                                                <td className="border-collapse p-2">{VND.format(order.donGia)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className={clsx(styles.modal_footer)}>
                                <p>Tổng tiền hóa đơn: {VND.format(total)}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ListOrderProduct;
