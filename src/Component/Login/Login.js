import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Login/Login.module.scss';

function Login(props) {
    const [check, setCheck] = useState(false);
    const { toast } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [Day, setDay] = useState('');
    const [Month, setMonth] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [Year, setYear] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
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

    // curDate sẽ lưu trữ thời gian hiện tại
    var curDate = new Date();
    // Lấy ngày hiện tại
    var curDay = curDate.getDate();
    // Lấy tháng hiện tại
    var curMonth = curDate.getMonth() + 1;
    // Lấy năm hiện tại
    var curYear = curDate.getFullYear();

    const Sexs = [
        { id: 0, name: 'nam' },
        { id: 1, name: 'nữ' },
        { id: 2, name: 'khác' },
    ];

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
        setFormErrors(errors);
        return isValid;
    };

    const validateFormRegister = () => {
        let errors = {};
        let isValid = true;

        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (!registerEmail) {
            errors.registerEmail = 'Please enter Email !';
            isValid = false;
        } else if (!regex.test(registerEmail)) {
            errors.registerEmail = 'Please enter correct email format !';
            toast.error('Vui lòng nhập đúng định dạng email !');
            isValid = false;
        }

        if (!registerPassword) {
            errors.registerPassword = 'Please enter Password !';
            isValid = false;
        } else if (registerPassword.length < 6) {
            errors.registerPassword = 'Please enter at least 6 characters !';
            toast.error('Vui lòng nhập mật khẩu ít nhất 6 ký tự !');
            isValid = false;
        }

        if (!surname) {
            errors.registerSurName = 'Please enter full name !';
            isValid = false;
        }

        if (!name) {
            errors.registerName = 'Please enter full name !';
            isValid = false;
        }

        if (!Day || !Month || !Year) {
            errors.registerNS = 'Please enter DateOfBirth !';
            isValid = false;
        }

        if (!gioiTinh) {
            errors.gioiTinh = 'Please enter sex !';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios
                .post('http://localhost:8080/user/login', {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.user.roleId === 1) {
                        navigate('/');
                        toast.success('Đăng nhập thành công !');
                    } else if (res.data.user.roleId === 2) {
                        navigate('/admin/Revenue');
                        toast.success('Đăng nhập thành công !');
                    } else if (res.data.user.roleId === 3) {
                        navigate('/admin/Revenue');
                        toast.success('Đăng nhập thành công !');
                    }
                    //lấy tên người dùng

                    localStorage.setItem('account', JSON.stringify(res.data.user));
                })
                .catch((err) => {
                    toast.error('Tài khoản hoặc mật khẩu không chính xác !');
                });
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (validateFormRegister()) {
            axios
                .post('http://localhost:8080/user/register', {
                    email: registerEmail,
                    password: registerPassword,
                    name: surname + ' ' + name,
                    roleId: '1',
                    ngaySinh: Day,
                    thangSinh: Month,
                    namSinh: Year,
                    image: 'avt-default.jpg',
                })
                .then((res) => {
                    toast.success('Đăng kí thành công !');
                    setRegisterEmail('');
                    setRegisterPassword('');
                    setSurname('');
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

    const handlePressEnter = (event) => {
        // event.preventDefault();
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={clsx(styles.nav2)}>
            {showLogin ? (
                <div className={clsx(styles.nav2_form)}>
                    <div className={clsx(styles.form_header)}>
                        <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
                        <h4 onClick={() => setShowLogin(false)} className={clsx(styles.form_heading__h4)}>
                            Đăng Kí
                        </h4>
                    </div>
                    <form method="POST" action="/user/login" className={clsx(styles.auth_form)}>
                        <div className={clsx(styles.auth_froup)}>
                            <input
                                value={email}
                                type="text"
                                name="email"
                                className={clsx(styles.auth_input, formErrors.email ? styles.auth_isValid : '')}
                                placeholder="Nhập Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div>
                                {formErrors.email && <p className={clsx(styles.form_message)}>{formErrors.email}</p>}
                            </div>
                        </div>
                        <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    value={password}
                                    type={check === true ? 'text' : 'password'}
                                    name="password"
                                    className={clsx(styles.auth_input, formErrors.password ? styles.auth_isValid : '')}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handlePressEnter}
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
                            <div>
                                {formErrors.password && (
                                    <p className={clsx(styles.form_message)}>{formErrors.password}</p>
                                )}
                            </div>
                        </div>
                        <div className={clsx(styles.form_controls, styles.form_controls1)}>
                            <button
                                onClick={(e) => handleSubmit(e)}
                                className={clsx(styles.form_btn, styles.form_primary)}
                            >
                                ĐĂNG NHẬP
                            </button>

                            <Link className={clsx(styles.form_btn__link)} to="/">
                                <button className={clsx(styles.form_btn)}>TRỞ LẠI</button>
                            </Link>
                        </div>
                        <div className={clsx(styles.form_controls2)}>
                            <p className={clsx(styles.controls2_p)}>Quên mật khẩu</p>
                            <p>Cần trợ giúp</p>
                        </div>
                    </form>
                </div>
            ) : (
                <div className={clsx(styles.nav2_form)}>
                    <div className={clsx(styles.form_header)}>
                        <h3 className={clsx(styles.form_heading)}>Đăng Kí</h3>
                        <h4 onClick={() => setShowLogin(true)} className={clsx(styles.form_heading__h4)}>
                            Đăng Nhập
                        </h4>
                    </div>
                    <form method="POST" action="/user/register" className={clsx(styles.auth_form)}>
                        <div className={clsx(styles.auth_froup)}>
                            <div className={clsx(styles.auth_froup__name)}>
                                <div className={clsx(styles.auth_froup__emptyInput)} style={{ marginRight: 10 }}>
                                    <input
                                        value={surname}
                                        type="text"
                                        className={clsx(
                                            styles.auth_input,
                                            formErrors.registerSurName ? styles.auth_isValid : '',
                                        )}
                                        placeholder="Nhập Họ"
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                    {formErrors.registerSurName ? (
                                        <i
                                            className={clsx(
                                                styles.auth_froup__emptyIcon,
                                                styles.auth_froup__emptyIconName,
                                                'fa-solid fa-circle-exclamation',
                                            )}
                                        ></i>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <div className={clsx(styles.auth_froup__emptyInput)} style={{ marginLeft: 10 }}>
                                    <input
                                        value={name}
                                        type="text"
                                        className={clsx(
                                            styles.auth_input,
                                            formErrors.registerName ? styles.auth_isValid : '',
                                        )}
                                        placeholder="Nhập Tên"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {formErrors.registerName ? (
                                        <i
                                            className={clsx(
                                                styles.auth_froup__emptyIcon,
                                                styles.auth_froup__emptyIconName,
                                                'fa-solid fa-circle-exclamation',
                                            )}
                                        ></i>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={clsx(styles.auth_froup)}>
                            <div className={clsx(styles.auth_froup__emptyInput)}>
                                <input
                                    value={registerEmail}
                                    type="text"
                                    name="email"
                                    className={clsx(
                                        styles.auth_input,
                                        formErrors.registerEmail ? styles.auth_isValid : '',
                                    )}
                                    placeholder="Nhập Email"
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                />
                                {formErrors.registerEmail ? (
                                    <i
                                        className={clsx(styles.auth_froup__emptyIcon, 'fa-solid fa-circle-exclamation')}
                                    ></i>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div className={clsx(styles.auth_froup)}>
                            <div className={clsx(styles.auth_froup__emptyInput)}>
                                <input
                                    value={registerPassword}
                                    type={check === true ? 'text' : 'password'}
                                    name="password"
                                    className={clsx(
                                        styles.auth_input,
                                        formErrors.registerPassword ? styles.auth_isValid : '',
                                    )}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                />
                                {formErrors.registerPassword ? (
                                    <i
                                        className={clsx(styles.auth_froup__emptyIcon, 'fa-solid fa-circle-exclamation')}
                                    ></i>
                                ) : (
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
                                )}
                            </div>
                        </div>

                        <div className={clsx(styles.auth_froup)}>
                            <div className={clsx(styles.auth_froup__emptySelect)}>
                                <p className={clsx(styles.auth_froup_p)}>Ngày sinh</p>
                                {formErrors.registerNS ? (
                                    <i
                                        className={clsx(
                                            styles.auth_froup__emptyIconSelect,
                                            'fa-solid fa-circle-exclamation',
                                        )}
                                    ></i>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className={clsx(styles.auth_froup_date)}>
                                <select
                                    className={clsx(formErrors.registerNS ? styles.auth_isValid : '')}
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
                                    className={clsx(formErrors.registerNS ? styles.auth_isValid : '')}
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
                                    className={clsx(formErrors.registerNS ? styles.auth_isValid : '')}
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
                        </div>

                        <div className={clsx(styles.auth_froup)}>
                            <div className={clsx(styles.auth_froup__emptySelect)}>
                                <p className={clsx(styles.auth_froup_p)}>Giới tính</p>
                                {formErrors.gioiTinh ? (
                                    <i
                                        className={clsx(
                                            styles.auth_froup__emptyIconSelect,
                                            'fa-solid fa-circle-exclamation',
                                        )}
                                    ></i>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className={clsx(styles.auth_froup__sex)}>
                                {Sexs.map((sex) => {
                                    return (
                                        <div
                                            key={sex.id}
                                            className={clsx(
                                                styles.auth_froup__sex__container,
                                                formErrors.gioiTinh ? styles.auth_isValid : '',
                                            )}
                                        >
                                            <label style={{ width: '100%' }} htmlFor={sex.id}>
                                                {sex.name}
                                            </label>
                                            <input
                                                id={sex.id}
                                                type="radio"
                                                name="gioitinh"
                                                value={sex.id}
                                                onChange={(e) => setGioiTinh(e.target.value)}
                                                // dấu + ép thành kiểu số nguyên
                                                checked={gioiTinh ? (sex.id === +gioiTinh ? true : false) : ''}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'none' }} className={clsx(styles.auth_froup)}>
                            <input value="1" type="text" className={clsx(styles.auth_input)} />
                        </div>

                        <div style={{ marginBottom: 80 }} className={clsx(styles.form_controls, styles.form_controls1)}>
                            <Link className={clsx(styles.form_btn__link)} to="/">
                                <button className={clsx(styles.form_btn)}>TRỞ LẠI</button>
                            </Link>
                            <button
                                onClick={(e) => handleRegister(e)}
                                className={clsx(styles.form_btn, styles.form_primary)}
                            >
                                ĐĂNG Kí
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
