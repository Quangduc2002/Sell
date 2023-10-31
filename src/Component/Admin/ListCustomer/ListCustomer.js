import React from 'react';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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
    const [show1, setShow1] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surName, setSurName] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [Day, setDay] = useState('');
    const [Month, setMonth] = useState('');
    const [Year, setYear] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // search
    const search = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    useEffect(() => {
        getUser(showUsers);
    }, [showUsers]);

    const Days = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
    ];

    const Months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const Years = [
        '2023',
        '2022',
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008',
        '2007',
        '2006',
        '2005',
        '2004',
        '2003',
        '2002',
        '2001',
        '2000',
        '1999',
        '1998',
        '1997',
        '1996',
        '1995',
        '1994',
        '1993',
        '1992',
        '1991',
        '1990',
        '1989',
        '1988',
        '1987',
        '1986',
        '1985',
        '1984',
        '1983',
        '1982',
        '1981',
        '1980',
        '1979',
        '1978',
        '1977',
        '1976',
        '1975',
        '1974',
        '1973',
        '1972',
        '1971',
        '1970',
        '1969',
        '1968',
        '1967',
        '1966',
        '1965',
        '1964',
        '1963',
        '1962',
        '1961',
        '1960',
        '1959',
        '1958',
        '1957',
        '1956',
        '1955',
        '1954',
        '1953',
        '1952',
        '1951',
        '1950',
        '1949',
        '1948',
        '1947',
        '1946',
        '1945',
        '1944',
        '1943',
        '1942',
        '1941',
        '1940',
        '1939',
        '1938',
        '1937',
        '1936',
        '1935',
        '1934',
        '1933',
        '1932',
        '1931',
        '1930',
        '1929',
        '1928',
        '1927',
        '1926',
        '1925',
        '1924',
        '1923',
        '1922',
        '1921',
        '1920',
        '1919',
        '1918',
        '1917',
        '1916',
        '1915',
        '1914',
        '1913',
        '1912',
        '1911',
        '1910',
        '1909',
        '1908',
        '1907',
        '1906',
        '1905',
    ];

    const Sexs = [
        { id: 0, name: 'nam' },
        { id: 1, name: 'nữ' },
        { id: 2, name: 'khác' },
    ];

    // curDate sẽ lưu trữ thời gian hiện tại
    var curDate = new Date();
    // Lấy ngày hiện tại
    var curDay = curDate.getDate();
    // Lấy tháng hiện tại
    var curMonth = curDate.getMonth() + 1;
    // Lấy năm hiện tại
    var curYear = curDate.getFullYear();

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (!email) {
            errors.email = 'Please enter Email !';
            isValid = false;
        } else if (!regex.test(email)) {
            errors.email = 'Please enter correct email format !';
            isValid = false;
        }

        if (!password) {
            errors.password = 'Please enter Password !';
            isValid = false;
        } else if (password.length < 6) {
            errors.password = 'Please enter at least 6 characters !';
            isValid = false;
        }

        if (!surName || !name) {
            errors.name = 'Please enter full name !';
            isValid = false;
        }

        if (!gioiTinh) {
            errors.gioiTinh = 'Please enter sex !';
            isValid = false;
        }

        if (!role) {
            errors.role = 'Please enter permissions !';
            isValid = false;
        }

        if (!Day || !Month || !Year) {
            errors.ngaySinh = 'Please enter DateOfBirth !';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

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

    const handleAddUser = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios
                .post('http://localhost:8080/user/register', {
                    email: email,
                    password: password,
                    name: surName + ' ' + name,
                    roleId: role,
                    ngaySinh: Day,
                    thangSinh: Month,
                    namSinh: Year,
                    image: 'avt-default.jpg',
                })
                .then((res) => {
                    toast.success('Thêm người dùng thành công !');
                    setEmail('');
                    setPassword('');
                    setSurName('');
                    setGioiTinh('');
                    setRole('');
                    setName('');
                    setDay('');
                    setMonth('');
                    setYear('');
                })
                .catch((err) => {
                    if (err.response.data.errCode === 1) {
                        toast.error(err.response.data.message);
                    }
                });
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
                        <button onClick={() => setShow1(!show1)} className={clsx(styles.listProduct_user)}>
                            <i className="fa-regular fa-square-plus" style={{ style: '#fff', marginRight: 6 }}></i>
                            Thêm người dùng
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
                                <th>{showUsers ? 'Tên khách hàng' : 'Tên nhân viên'}</th>
                                <th>Ngày sinh</th>
                                <th style={{ textAlign: 'center' }}>Giới tính</th>
                                <th style={{ textAlign: 'center' }}>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUserSearch.length === 0
                                ? currentUsers.map((user) => {
                                      return (
                                          <tr key={user.ID}>
                                              <td style={{ minWidth: 300 }}>{user.email}</td>
                                              <td>{user.name}</td>
                                              <td>{user.ngaySinh + '/' + user.thangSinh + '/' + user.namSinh}</td>
                                              <td style={{ textAlign: 'center' }}>
                                                  {Sexs.map((sex) => {
                                                      return sex.id === user.gioiTinh ? sex.name : '';
                                                  })}
                                              </td>
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
                                              <td style={{ minWidth: 300 }}>{user.email}</td>
                                              <td>{user.name}</td>
                                              <td>{user.ngaySinh + '/' + user.thangSinh + '/' + user.namSinh}</td>
                                              <td style={{ textAlign: 'center' }}>
                                                  {Sexs.map((sex) => {
                                                      return sex.id === user.gioiTinh ? sex.name : '';
                                                  })}
                                              </td>
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

                {show1 && (
                    <>
                        <div onClick={() => setShow1(!show1)} className={clsx(styles.modal1)}></div>

                        <div className={clsx(styles.modalAdd_container)}>
                            <div className={clsx(styles.modalAdd_header)}>
                                <h5 className="modal-title">Thêm người dùng</h5>
                                <button
                                    type="button"
                                    className={clsx(styles.modalAdd_close)}
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span onClick={() => setShow1(!show1)} aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                            </div>

                            <div className={clsx(styles.modalAdd_inform)}>
                                <div className={clsx(styles.auth_froup__left)}>
                                    <div className={clsx(styles.auth_froup)}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Email:</label>
                                            <br />
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text"
                                                className={clsx(
                                                    styles.auth_input,
                                                    formErrors.email ? styles.auth_isValid : '',
                                                )}
                                                placeholder="Nhập email..."
                                            />
                                        </div>
                                        <div>
                                            {formErrors.email && (
                                                <p className={clsx(styles.form_message)}>{formErrors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={clsx(styles.auth_froup)}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Họ tên:</label>
                                            <br />
                                            <div className={clsx(styles.auth_froup_name)}>
                                                <input
                                                    value={surName}
                                                    onChange={(e) => setSurName(e.target.value)}
                                                    type="text"
                                                    className={clsx(
                                                        styles.auth_input,
                                                        styles.auth_input__name,
                                                        formErrors.name ? styles.auth_isValid : '',
                                                    )}
                                                    placeholder="Nhập Họ"
                                                />
                                                <input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    type="text"
                                                    className={clsx(
                                                        styles.auth_input,
                                                        styles.auth_input__name,
                                                        formErrors.name ? styles.auth_isValid : '',
                                                    )}
                                                    placeholder="Nhập Tên"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            {formErrors.name && (
                                                <p className={clsx(styles.form_message)}>{formErrors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={clsx(styles.auth_froup)}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Giới tính:</label>
                                            <br />
                                            <select
                                                value={gioiTinh}
                                                onChange={(e) => setGioiTinh(e.target.value)}
                                                className={clsx(
                                                    styles.auth_select,
                                                    formErrors.gioiTinh ? styles.auth_isValid : '',
                                                )}
                                            >
                                                <option disabled value="" style={{ display: 'none' }}>
                                                    Giới tính
                                                </option>
                                                {Sexs.map((sex) => {
                                                    return (
                                                        <option value={sex.id} key={sex.id}>
                                                            {sex.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            {formErrors.gioiTinh && (
                                                <p className={clsx(styles.form_message)}>{formErrors.gioiTinh}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={clsx(styles.auth_froup__right)}>
                                    <div className={clsx(styles.auth_froup)}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Password:</label>
                                            <br />
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="text"
                                                className={clsx(
                                                    styles.auth_input,
                                                    formErrors.password ? styles.auth_isValid : '',
                                                )}
                                                placeholder="Nhập password"
                                            />
                                        </div>
                                        <div>
                                            {formErrors.password && (
                                                <p className={clsx(styles.form_message)}>{formErrors.password}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={clsx(styles.auth_froup)}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Ngày sinh:</label>
                                            <br />
                                            <div className={clsx(styles.auth_froup_date)}>
                                                <select
                                                    className={clsx(
                                                        formErrors.ngaySinh ? styles.auth_isValid : '',
                                                        styles.auth_selectDate,
                                                    )}
                                                    value={Day}
                                                    onChange={(e) => setDay(e.target.value)}
                                                >
                                                    <option style={{ display: 'none' }}>{curDay}</option>
                                                    {Days.map((day, index) => {
                                                        return (
                                                            <option key={index} value={day}>
                                                                {day}
                                                            </option>
                                                        );
                                                    })}
                                                </select>

                                                <select
                                                    className={clsx(
                                                        formErrors.ngaySinh ? styles.auth_isValid : '',
                                                        styles.auth_selectDate,
                                                    )}
                                                    value={Month}
                                                    onChange={(e) => setMonth(e.target.value)}
                                                >
                                                    <option style={{ display: 'none' }}>Tháng {curMonth}</option>
                                                    {Months.map((month) => {
                                                        return (
                                                            <option key={month} value={month}>
                                                                Tháng {month}
                                                            </option>
                                                        );
                                                    })}
                                                </select>

                                                <select
                                                    className={clsx(
                                                        formErrors.ngaySinh ? styles.auth_isValid : '',
                                                        styles.auth_selectDate,
                                                    )}
                                                    value={Year}
                                                    onChange={(e) => setYear(e.target.value)}
                                                >
                                                    <option style={{ display: 'none' }}>{curYear}</option>
                                                    {Years.map((year) => {
                                                        return (
                                                            <option key={year} value={year}>
                                                                {year}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                {formErrors.ngaySinh && (
                                                    <p className={clsx(styles.form_message)}>{formErrors.ngaySinh}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={clsx(styles.auth_froup)}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Group:</label>
                                            <br />
                                            <select
                                                onChange={(e) => setRole(e.target.value)}
                                                value={role}
                                                className={clsx(
                                                    styles.auth_select,
                                                    formErrors.role ? styles.auth_isValid : '',
                                                )}
                                            >
                                                <option disabled value="" style={{ display: 'none' }}>
                                                    Group
                                                </option>
                                                <option value={1}>khách hàng</option>
                                                <option value={2}>Nhân viên</option>
                                            </select>
                                        </div>
                                        <div>
                                            {formErrors.role && (
                                                <p className={clsx(styles.form_message)}>{formErrors.role}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={clsx(styles.modalAdd_footer)}>
                                <button onClick={(e) => handleAddUser(e)} className={clsx(styles.modalAdd__btn)}>
                                    Thêm
                                </button>
                                <button onClick={() => setShow1(!show1)} className={clsx(styles.modalAdd__btn__cancel)}>
                                    Trở lại
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ListCustomer;
