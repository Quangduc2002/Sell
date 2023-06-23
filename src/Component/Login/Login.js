import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Login/Login.module.scss';

function Login(props) {
    const [check, setCheck] = useState(false);
    const { toast, setUserName, setRoleId } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerNS, setRegisterNS] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

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
            isValid = false;
        }

        if (!registerPassword) {
            errors.registerPassword = 'Please enter Password !';
            isValid = false;
        } else if (registerPassword.length < 6) {
            errors.registerPassword = 'Please enter at least 6 characters !';
            isValid = false;
        }

        if (!registerName) {
            errors.registerName = 'Please enter name !';
            isValid = false;
        }

        if (!registerNS) {
            errors.registerNS = 'Please enter DateOfBirth !';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios
                .post('http://localhost:8080/user/login', {
                    Email: email,
                    PassWord: password,
                })
                .then((res) => {
                    if (res.data.user.RoleId === '0') {
                        navigate('/admin/DSSP');
                        toast.success('Đăng nhập thành công !');
                    } else {
                        navigate('/');
                        toast.success('Đăng nhập thành công !');
                    }
                    //lấy tên người dùng
                    setUserName(res.data.user.Name);
                    setRoleId(res.data.user.RoleId);
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
                    Email: registerEmail,
                    PassWord: registerPassword,
                    Name: registerName,
                    RoleId: '1',
                    DateOfBirth: registerNS,
                })
                .then((res) => {
                    toast.success('Đăng kí thành công !');
                    setRegisterEmail('');
                    setRegisterPassword('');
                    setRegisterName('');
                    setRegisterNS('');
                })
                .catch((err) => {
                    toast.error('Đăng kí không thành công !');
                });
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
                                className={clsx(styles.auth_input)}
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
                                    className={clsx(styles.auth_input)}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
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
                            <Link className={clsx(styles.form_btn__link)} to="/">
                                <button className={clsx(styles.form_btn)}>TRỞ LẠI</button>
                            </Link>
                            <button
                                onClick={(e) => handleSubmit(e)}
                                className={clsx(styles.form_btn, styles.form_primary)}
                            >
                                ĐĂNG NHẬP
                            </button>
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
                            <input
                                value={registerEmail}
                                type="text"
                                name="email"
                                className={clsx(styles.auth_input)}
                                placeholder="Nhập Email"
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                            <div>
                                {formErrors.registerEmail && (
                                    <p className={clsx(styles.form_message)}>{formErrors.registerEmail}</p>
                                )}
                            </div>
                        </div>
                        <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    value={registerPassword}
                                    type={check === true ? 'text' : 'password'}
                                    name="password"
                                    className={clsx(styles.auth_input)}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setRegisterPassword(e.target.value)}
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
                                {formErrors.registerPassword && (
                                    <p className={clsx(styles.form_message)}>{formErrors.registerPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className={clsx(styles.auth_froup)}>
                            <input
                                value={registerName}
                                type="text"
                                name="user"
                                className={clsx(styles.auth_input)}
                                placeholder="Nhập User"
                                onChange={(e) => setRegisterName(e.target.value)}
                            />
                            <div>
                                {formErrors.registerName && (
                                    <p className={clsx(styles.form_message)}>{formErrors.registerName}</p>
                                )}
                            </div>
                        </div>
                        <div className={clsx(styles.auth_froup)}>
                            <input
                                style={{ color: '#757575' }}
                                value={registerNS}
                                type="date"
                                name="d"
                                className={clsx(styles.auth_input)}
                                placeholder="Nhập User"
                                onChange={(e) => setRegisterNS(e.target.value)}
                            />
                            <div>
                                {formErrors.registerNS && (
                                    <p className={clsx(styles.form_message)}>{formErrors.registerNS}</p>
                                )}
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
