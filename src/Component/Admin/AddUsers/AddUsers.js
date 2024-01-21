import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './AddUsers.module.scss';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Bars from '../Bars/Bars';

function AddUsers(props) {
    const { toast, setMenu, menu } = props;
    const [formErrors, setFormErrors] = useState({});
    const [check, setCheck] = useState(false);
    const [listUsers, setListUsers] = useState({
        user1: {
            email: '',
            surName: '',
            name: '',
            sex: '',
            password: '',
            ngaySinh: '',
            thangSinh: '',
            namSinh: '',
            groupRole: '',
            image: 'avt-default.jpg',
        },
    });

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

    const handlOnchange = (name, value, key) => {
        let _listUsers = _.cloneDeep(listUsers);
        _listUsers[key][name] = value;
        setListUsers(_listUsers);
    };

    const handleAddNewUser = () => {
        let _listUsers = _.cloneDeep(listUsers);
        _listUsers[`user${uuidv4()}`] = {
            email: '',
            surName: '',
            name: '',
            sex: '',
            password: '',
            ngaySinh: '',
            thangSinh: '',
            namSinh: '',
            groupRole: '',
            image: 'avt-default.jpg',
        };
        setListUsers(_listUsers);
    };

    const handleDeleteUser = (key) => {
        let _listUsers = _.cloneDeep(listUsers);
        delete _listUsers[key];
        setListUsers(_listUsers);
    };

    const validateForm = () => {
        let errors = {};
        var isValid = true;
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        Object.entries(listUsers).map(([key, value]) => {
            const emails = Object.values(listUsers).map((user) => user.email);
            if (!value.email) {
                errors[`${key}-email`] = 'Vui lòng nhập email !';
                isValid = false;
            } else if (!regex.test(value.email)) {
                errors[`${key}-email`] = 'Email không đúng định dạng !';
                isValid = false;
            } else if (value.email && regex.test(value.email)) {
                for (let i = 0; i < emails.length; i++) {
                    if (emails[i] === emails[i + 1]) {
                        errors[`${key}-email`] = 'Email không được trùng lặp !';
                        isValid = false;
                    }
                }
            }

            if (!value.password) {
                errors[`${key}-password`] = 'Vui lòng nhập Password !';
                isValid = false;
            } else if (value.password.length < 6) {
                errors[`${key}-password`] = 'Vui lòng nhập ít nhất 6 ký tự !';
                isValid = false;
            }

            if (!value.surName || !value.name) {
                errors[`${key}-name`] = 'Vui lòng nhập họ tên !';
                isValid = false;
            }

            if (!value.sex) {
                errors[`${key}-gioiTinh`] = 'Vui lòng chọn giới tính !';
                isValid = false;
            }

            if (!value.groupRole) {
                errors[`${key}-groupRole`] = 'Vui lòng chọn quyền !';
                isValid = false;
            }

            if (!value.ngaySinh || !value.thangSinh || !value.namSinh) {
                errors[`${key}-ngaySinh`] = 'Vui lòng chọn ngày sinh !';
                isValid = false;
            }
            return isValid;
        });
        setFormErrors(errors);
        return isValid;
    };

    const buildData = () => {
        let _listUsers = _.cloneDeep(listUsers);
        let result = [];
        Object.entries(_listUsers).map(([key, listUser]) => {
            return result.push(listUser);
        });
        return result;
    };

    const resetData = () => {
        setListUsers({
            user1: {
                email: '',
                surName: '',
                name: '',
                sex: '',
                password: '',
                ngaySinh: '',
                thangSinh: '',
                namSinh: '',
                groupRole: '',
                image: 'avt-default.jpg',
            },
        });
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        let data = buildData();
        if (validateForm()) {
            axios
                .post('http://localhost:8080/user/addUsers', {
                    listUsers: data,
                })
                .then((res) => {
                    resetData();
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    if (err.response.data.errCode === 1) {
                        toast.error(err.response.data.message);
                    }
                });
        }
    };

    return (
        <div className={clsx(styles.modalAdd, 'xs:w-full md:w-[80%]')}>
            <Bars setMenu={setMenu} menu={menu} />

            <div className={clsx(styles.modalAdd_container)}>
                {Object.entries(listUsers).map(([key, listUsers], index) => {
                    return (
                        <div key={`user-${key}`} className={clsx(styles.modalAdd_inform, 'lg:flex xs:block', `${key}`)}>
                            <div className={clsx(styles.auth_froup__left)}>
                                <div className={clsx(styles.auth_froup, 'xs:w-auto lg:w-[350px]')}>
                                    <div>
                                        <label className={clsx(styles.auth_label)}>Email:</label>
                                        <br />
                                        <input
                                            value={listUsers.email}
                                            onChange={(e) => handlOnchange('email', e.target.value, key)}
                                            type="text"
                                            className={clsx(
                                                styles.auth_input,
                                                formErrors[`${key}-email`] ? styles.auth_isValid : '',
                                            )}
                                            placeholder="Nhập email..."
                                        />
                                    </div>
                                    <div>
                                        {formErrors[`${key}-email`] && (
                                            <p className={clsx(styles.form_message)}>{formErrors[`${key}-email`]}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.auth_froup, 'xs:w-auto lg:w-[350px]')}>
                                    <div>
                                        <label className={clsx(styles.auth_label)}>Họ tên:</label>
                                        <br />
                                        <div className={clsx(styles.auth_froup_name)}>
                                            <input
                                                value={listUsers.surName}
                                                onChange={(e) => handlOnchange('surName', e.target.value, key)}
                                                type="text"
                                                className={clsx(
                                                    styles.auth_input,
                                                    styles.auth_input__name,
                                                    formErrors[`${key}-name`] ? styles.auth_isValid : '',
                                                )}
                                                placeholder="Nhập Họ"
                                            />
                                            <input
                                                value={listUsers.name}
                                                onChange={(e) => handlOnchange('name', e.target.value, key)}
                                                type="text"
                                                className={clsx(
                                                    styles.auth_input,
                                                    styles.auth_input__name,
                                                    formErrors[`${key}-name`] ? styles.auth_isValid : '',
                                                )}
                                                placeholder="Nhập Tên"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {formErrors[`${key}-name`] && (
                                            <p className={clsx(styles.form_message)}>{formErrors[`${key}-name`]}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={clsx(styles.auth_froup, 'xs:w-auto lg:w-[350px]')}>
                                    <div>
                                        <label className={clsx(styles.auth_label)}>Giới tính:</label>
                                        <br />
                                        <select
                                            value={listUsers.sex}
                                            onChange={(e) => handlOnchange('sex', e.target.value, key)}
                                            className={clsx(
                                                styles.auth_select,
                                                formErrors[`${key}-gioiTinh`] ? styles.auth_isValid : '',
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
                                        {formErrors[`${key}-gioiTinh`] && (
                                            <p className={clsx(styles.form_message)}>{formErrors[`${key}-gioiTinh`]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={clsx(styles.auth_froup__right, 'lg:flex xs:block gap-4')}>
                                <div className={clsx(styles.auth_froup__container)}>
                                    <div className={clsx(styles.auth_froup, 'xs:w-auto lg:w-[350px]')}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Password:</label>
                                            <br />
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    value={listUsers.password}
                                                    onChange={(e) => handlOnchange('password', e.target.value, key)}
                                                    type={check === true ? 'text' : 'password'}
                                                    className={clsx(
                                                        styles.auth_input,
                                                        formErrors[`${key}-password`] ? styles.auth_isValid : '',
                                                    )}
                                                    placeholder="Nhập password"
                                                />
                                                <i
                                                    onClick={() => {
                                                        setCheck(!check);
                                                    }}
                                                    className={clsx(
                                                        styles.auth_froup__eye,
                                                        'fa-regular ',
                                                        check === true ? 'fa-eye' : 'fa-eye-slash',
                                                    )}
                                                ></i>
                                            </div>
                                        </div>
                                        <div>
                                            {formErrors[`${key}-password`] && (
                                                <p className={clsx(styles.form_message)}>
                                                    {formErrors[`${key}-password`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={clsx(styles.auth_froup, 'xs:w-auto lg:w-[350px]')}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Ngày sinh:</label>
                                            <br />
                                            <div className={clsx(styles.auth_froup_date)}>
                                                <select
                                                    className={clsx(
                                                        formErrors[`${key}-ngaySinh`] ? styles.auth_isValid : '',
                                                        styles.auth_selectDate,
                                                    )}
                                                    value={listUsers.ngaySinh}
                                                    onChange={(e) => handlOnchange('ngaySinh', e.target.value, key)}
                                                >
                                                    <option style={{ display: 'none' }}>Chọn ngày</option>
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
                                                        formErrors[`${key}-ngaySinh`] ? styles.auth_isValid : '',
                                                        styles.auth_selectDate,
                                                    )}
                                                    value={listUsers.thangSinh}
                                                    onChange={(e) => handlOnchange('thangSinh', e.target.value, key)}
                                                >
                                                    <option style={{ display: 'none' }}>Chọn tháng </option>
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
                                                        formErrors[`${key}-ngaySinh`] ? styles.auth_isValid : '',
                                                        styles.auth_selectDate,
                                                    )}
                                                    value={listUsers.namSinh}
                                                    onChange={(e) => handlOnchange('namSinh', e.target.value, key)}
                                                >
                                                    <option style={{ display: 'none' }}>Chọn năm</option>
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
                                                {formErrors[`${key}-ngaySinh`] && (
                                                    <p className={clsx(styles.form_message)}>
                                                        {formErrors[`${key}-ngaySinh`]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={clsx(styles.auth_froup, 'xs:w-auto lg:w-[350px]')}>
                                        <div>
                                            <label className={clsx(styles.auth_label)}>Group:</label>
                                            <br />
                                            <select
                                                value={listUsers.groupRole}
                                                onChange={(e) => handlOnchange('groupRole', e.target.value, key)}
                                                className={clsx(
                                                    styles.auth_select,
                                                    formErrors[`${key}-groupRole`] ? styles.auth_isValid : '',
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
                                            {formErrors[`${key}-groupRole`] && (
                                                <p className={clsx(styles.form_message)}>
                                                    {formErrors[`${key}-groupRole`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <i
                                        onClick={() => handleAddNewUser()}
                                        className={clsx(styles.plus, 'fa-solid fa-circle-plus')}
                                    ></i>
                                    <i
                                        onClick={() => handleDeleteUser(key)}
                                        className={clsx(
                                            styles.trash,
                                            'fa-solid fa-trash',
                                            index === 0 ? styles.visibility : '',
                                        )}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className={clsx(styles.modalAdd_footer, 'flex gap-3 flex-wrap')}>
                    <button onClick={(e) => handleAddUser(e)} className={clsx(styles.modalAdd__btn)}>
                        Thêm
                    </button>
                    <button onClick={() => resetData()} className={clsx(styles.modalAdd__btn__cancel)}>
                        Xóa
                    </button>
                    <button className={clsx(styles.modalAdd__btn__cancel)}>Trở lại</button>
                </div>
            </div>
        </div>
    );
}

export default AddUsers;
