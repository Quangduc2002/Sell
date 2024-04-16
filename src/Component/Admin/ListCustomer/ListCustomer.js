import React, { useContext } from 'react';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import styles from './ListCustomer.module.scss';
import { axiosPost, fetchUser } from '../../../services/UseServices';
import Loading from '../../Loading/Loading';
import Pagination from '../../Pagination/Pagination';
import { fetchDelete } from '../../../services/UseServices';
import { UserContext } from '../../../Context/UserContext';

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
    const [statisticCustomer, setStatisticCustomer] = useState('');
    const { user } = useContext(UserContext);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    // search
    const search = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [succeSearch, setSucceSearch] = useState([]);
    useEffect(() => {
        getUser(showUsers);
    }, [showUsers]);

    const Sexs = [
        { id: 0, name: 'nam' },
        { id: 1, name: 'nữ' },
        { id: 2, name: 'khác' },
    ];

    // curDate sẽ lưu trữ thời gian hiện tại
    var curDate = new Date();
    // Lấy năm hiện tại
    var curYear = curDate.getFullYear();

    const Days = [];
    for (let Day = 1; Day <= 31; Day++) {
        Days.push(Day);
    }

    const Months = [];
    for (let Month = 1; Month <= 12; Month++) {
        Months.push(Month);
    }

    const Years = [];
    for (let Year = curYear; Year >= 1990; Year--) {
        Years.push(Year);
    }
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
        if (user.account.getUser.RoleId === '3') {
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

    const handleStatisticCustomers = async () => {
        await axiosPost('/user/statistic', { statisticCustomer: statisticCustomer })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {});
    };
    const currentUsers = users.slice(indeOfFirstProduct, indexOfLastProduct);
    const currentUserSearch = succeSearch.slice(indeOfFirstProduct, indexOfLastProduct);
    return (
        <div className={clsx(styles.listProduct, 'xs:w-full md:w-[80%]')}>
            <div className={clsx(styles.listProduct_header, 'flex-wrap')}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Trang
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Quản lý người dùng</span>
                </div>
                <div className="flex my-4">
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

                    <div className="flex flex-wrap gap-2 my-4">
                        <button onClick={() => setShowUsers(!showUsers)} className={clsx(styles.listProduct_user)}>
                            {showUsers ? 'Danh sách nhân viên' : 'Danh sách khách hàng'}
                        </button>
                        <button onClick={() => setShow1(!show1)} className={clsx(styles.listProduct_user)}>
                            <i className="fa-regular fa-square-plus" style={{ style: '#fff', marginRight: 6 }}></i>
                            Thêm người dùng
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <p>Chọn phương thức thống kê:</p>
                    <div className="flex justify-between flex-wrap gap-3 mt-2">
                        <div className="flex flex-wrap gap-3 ">
                            <select
                                onChange={(e) => setStatisticCustomer(e.target.value)}
                                className="py-2 px-2 xxs:w-auto xs:w-full  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                            >
                                <option className="hidden">--Chọn hành động--</option>
                                <option value={'2 khách hàng có tiền hàng lớn nhất'}>
                                    2 khách hàng có tiền hàng lớn nhất
                                </option>
                                <option value={'Doanh thu khách hàng giảm dần'}>Doanh thu khách hàng giảm dần</option>
                            </select>
                            <button
                                onClick={handleStatisticCustomers}
                                className="lg:block xs:hidden rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]"
                            >
                                Thống kê
                            </button>
                        </div>

                        {/* {methodStatistic === 'Sản phẩm đã bán trong tháng' ? (
                                <div className="flex gap-3 flex-wrap">
                                    <select
                                        onChange={(e) => setMonth(e.target.value)}
                                        className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                    >
                                        <option className="hidden">Chọn tháng</option>
                                        {Months.map((month, index) => (
                                            <option key={index} value={month}>
                                                tháng {month}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        onChange={(e) => setYear(e.target.value)}
                                        className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                    >
                                        <option className="hidden">Chọn năm</option>
                                        {Years.map((Year, index) => (
                                            <option key={index} value={Year}>
                                                {Year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : methodStatistic === 'Sản phẩm đã bán theo quý' ? (
                                <div className="flex gap-3 flex-wrap">
                                    <select
                                        onChange={(e) => setPrecious(e.target.value)}
                                        className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                    >
                                        <option className="hidden">Chọn quý</option>
                                        <option value={1}>Qúy 1</option>
                                        <option value={2}>Qúy 2</option>
                                        <option value={3}>Qúy 3</option>
                                        <option value={4}>Qúy 4</option>
                                    </select>
                                    <select
                                        onChange={(e) => setYear(e.target.value)}
                                        className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                    >
                                        <option className="hidden">Chọn năm</option>
                                        {Years.map((Year, index) => (
                                            <option key={index} value={Year}>
                                                {Year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                ''
                            )} */}
                    </div>
                </div>
                {currentUsers.length === 0 ? (
                    <Loading />
                ) : (
                    <div className="overflow-x-auto overflow-hidden pb-5">
                        <motion.table
                            className={clsx(styles.table, ' border-collapse p-2 border xs:w-[1070px]')}
                            initial={{ y: '4rem', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                type: spring,
                            }}
                        >
                            <thead className="border-collapse p-2">
                                <tr className="border-collapse p-2 p-2">
                                    <th className="bg-[#ddd] text-left border-collapse p-2">Email</th>
                                    <th className="bg-[#ddd] text-left border-collapse p-2">
                                        {showUsers ? 'Tên khách hàng' : 'Tên nhân viên'}
                                    </th>
                                    {showUsers ? (
                                        ''
                                    ) : (
                                        <>
                                            <th className="bg-[#ddd] text-left border-collapse p-2">Ngày sinh</th>
                                            <th className="bg-[#ddd] text-left border-collapse p-2 text-center">
                                                Giới tính
                                            </th>
                                        </>
                                    )}
                                    {showUsers ? (
                                        <th className="bg-[#ddd] text-left border-collapse p-2">Tiền hàng</th>
                                    ) : (
                                        ''
                                    )}
                                    <th className="bg-[#ddd] text-left border-collapse p-2 text-center">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUserSearch.length === 0
                                    ? currentUsers.map((user) => {
                                          return (
                                              <tr className="border-collapse p-2 p-2" key={user.ID}>
                                                  <td className="border-collapse p-2" style={{ minWidth: 300 }}>
                                                      {user.email}
                                                  </td>
                                                  <td className="border-collapse p-2">{user.name}</td>
                                                  {showUsers ? (
                                                      ''
                                                  ) : (
                                                      <>
                                                          <td className="border-collapse p-2">
                                                              {user.ngaySinh +
                                                                  '/' +
                                                                  user.thangSinh +
                                                                  '/' +
                                                                  user.namSinh}
                                                          </td>
                                                          <td className="border-collapse p-2 text-center">
                                                              {Sexs.map((sex) => {
                                                                  return sex.id === user.gioiTinh ? sex.name : '';
                                                              })}
                                                          </td>
                                                      </>
                                                  )}
                                                  {showUsers ? (
                                                      <td className="border-collapse p-2">
                                                          {VND.format(user.totalPrice)}
                                                      </td>
                                                  ) : (
                                                      ''
                                                  )}
                                                  <td className="border-collapse p-2 text-center">
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
                                              <tr className="border-collapse p-2 p-2" key={user.ID}>
                                                  <td className="border-collapse p-2" style={{ minWidth: 300 }}>
                                                      {user.email}
                                                  </td>
                                                  <td className="border-collapse p-2">{user.name}</td>
                                                  {showUsers ? (
                                                      ''
                                                  ) : (
                                                      <>
                                                          <td className="border-collapse p-2">
                                                              {user.ngaySinh +
                                                                  '/' +
                                                                  user.thangSinh +
                                                                  '/' +
                                                                  user.namSinh}
                                                          </td>
                                                          <td className="border-collapse p-2 text-center">
                                                              {Sexs.map((sex) => {
                                                                  return sex.id === user.gioiTinh ? sex.name : '';
                                                              })}
                                                          </td>
                                                      </>
                                                  )}
                                                  {showUsers ? (
                                                      <td className="border-collapse p-2">
                                                          {VND.format(user.totalPrice)}
                                                      </td>
                                                  ) : (
                                                      ''
                                                  )}
                                                  <td className="border-collapse p-2 text-center">
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
                    </div>
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
                                        className={clsx(styles.modal_btnClose, 'leading-normal')}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        type="button"
                                        className={clsx(styles.modal_btnSave, 'leading-normal')}
                                    >
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
                                <button
                                    onClick={(e) => handleAddUser(e)}
                                    className={clsx(styles.modalAdd__btn, 'leading-normal')}
                                >
                                    Thêm
                                </button>
                                <button
                                    onClick={() => setShow1(!show1)}
                                    className={clsx(styles.modalAdd__btn__cancel, 'leading-normal')}
                                >
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
