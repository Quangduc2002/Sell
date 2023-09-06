import React from 'react';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import styles from './ListCustomer.module.scss';
import { fetchUser } from '../../../services/UseServices';
import Loading from '../../Loading/Loading';
import Pagination from '../../Pagination/Pagination';
import { fetchDelete } from '../../../services/UseServices';

function ListCustomer(props) {
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
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(true);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');

    // search
    const search = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    useEffect(() => {
        getUser(showUsers);
    }, [showUsers]);

    const getUser = async (showUsers) => {
        let res = await fetchUser(`/user/${showUsers ? 'Customer' : 'Staff'}`);
        setUsers(res.data);
    };

    const handleId = (_id) => {
        setShow(!show);
        setId(_id);
    };

    const handleDelete = async () => {
        if (localStorage.RoleId === '3') {
            setShow(!show);
            let res = await fetchDelete(`/user/${id}/Customer`);
            if (res && res.status === 200) {
                setUsers(users.filter((user) => id !== user.ID));
                setSucceSearch(users.filter((user) => id !== user.ID));
                setShow(!show);
                toast.success('Xóa khách hàng thành công !');
            }
        } else {
            setShow(!show);
            toast.warn('Bạn không có quyền xóa khách hàng ');
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

    const filteredItems = users.filter((item) => {
        return item.email.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const currentUsers = users.slice(indeOfFirstProduct, indexOfLastProduct);
    const currentUserSearch = succeSearch.slice(indeOfFirstProduct, indexOfLastProduct);

    return (
        <div className={clsx(styles.listProduct)}>
            <div className={clsx(styles.listProduct_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Trang
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Quản lý người dùng</span>
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
                        <h1>{showUsers ? 'Danh sách khách hàng' : 'Danh sách nhân viên'} </h1>
                        {users && currentUsers ? (
                            <p style={{ marginBottom: 10 }}>
                                Hiển thị 1 đến{' '}
                                {currentUserSearch.length !== 0 ? currentUserSearch.length : currentUsers.length} trong{' '}
                                {users.length} {showUsers ? 'khách hàng' : 'nhân viên'}
                            </p>
                        ) : (
                            ''
                        )}
                    </div>

                    <div>
                        <button onClick={() => setShowUsers(!showUsers)} className={clsx(styles.listProduct_user)}>
                            {showUsers ? 'Danh sách nhân viên' : 'Danh sách khách hàng'}
                        </button>
                    </div>
                </div>
                {currentUsers.length === 0 ? (
                    <Loading />
                ) : (
                    <motion.table
                        className={clsx(styles.table)}
                        initial={{ y: '4rem', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: spring,
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Mật khẩu</th>
                                <th>{showUsers ? 'Tên khách hàng' : 'Tên nhân viên'}</th>
                                <th style={{ textAlign: 'center' }}>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUserSearch.length === 0
                                ? currentUsers.map((user) => {
                                      return (
                                          <tr key={user.ID}>
                                              <td style={{ minWidth: 300 }}>{user.email}</td>
                                              <td>{user.password}</td>
                                              <td>{user.name}</td>
                                              <td style={{ textAlign: 'center' }}>
                                                  <button
                                                      className={clsx(styles.table_button)}
                                                      onClick={() => handleId(user.ID)}
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
                                : currentUserSearch.map((user) => {
                                      return (
                                          <tr key={user.ID}>
                                              <td>{user.name}</td>
                                              <td style={{ minWidth: 300 }}>{user.email}</td>
                                              <td>{user.password}</td>
                                              <td style={{ textAlign: 'center' }}>
                                                  <button
                                                      className={clsx(styles.table_button)}
                                                      onClick={() => handleId(user.ID)}
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
                    </motion.table>
                )}
                {currentUsers.length > 0 && (
                    <Pagination
                        productPerPage={productPerPage}
                        pagination={pagination}
                        totalProduct={currentUserSearch.length !== 0 ? succeSearch.length : users.length}
                        isActive={isActive}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                    />
                )}

                {show && (
                    <div className={clsx(styles.modal)}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className={clsx(styles.modal_header)}>
                                    <h5 className="modal-title">Xóa khách hàng</h5>
                                    <button type="button" className={clsx(styles.modal_close)}>
                                        <span onClick={() => setShow(!show)} aria-hidden="true">
                                            &times;
                                        </span>
                                    </button>
                                </div>
                                <div className={clsx(styles.modal_body)}>
                                    <p>Bạn chắc chắn muốn xóa khách hàng này không ?</p>
                                </div>
                                <div className={clsx(styles.modal_footer)}>
                                    <button
                                        onClick={() => setShow(!show)}
                                        type="button"
                                        className={clsx(styles.modal_btnClose)}
                                    >
                                        Hủy
                                    </button>
                                    <button onClick={handleDelete} type="button" className={clsx(styles.modal_btnSave)}>
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

export default ListCustomer;
