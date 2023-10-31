import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './PasswordNew.module.scss';
import { NavLink } from 'react-router-dom';

function PasswordNew(props) {
    const { handleCancel, toast } = props;
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [check, setCheck] = useState(false);

    const updatePassword = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/user/updatePass', {
                user: JSON.parse(localStorage.account),
                password: password,
            })
            .then((res) => {
                toast.success(res.data.message);
                setError('');
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };
    return (
        <div className={clsx(styles.PassWordNew)}>
            <div className={clsx(styles.header)}>
                <h2>Chọn mật khẩu mới</h2>
            </div>
            <div className={clsx(styles.container)}>
                <p>Tạo mật khẩu mới có tối thiểu 6 ký tự.</p>
                <div style={{ position: 'relative' }}>
                    <input
                        type={check === true ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu mới"
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
                {error && (
                    <div style={{ marginTop: 8 }}>
                        <span className={clsx(styles.form_message)}>{error}</span>
                    </div>
                )}
            </div>
            <div className={clsx(styles.footer)}>
                <NavLink to={'/Login'}>
                    <button onClick={handleCancel} className={clsx(styles.footer_btn)}>
                        Bỏ qua
                    </button>
                </NavLink>
                <button onClick={(e) => updatePassword(e)} className={clsx(styles.footer_btn, styles.footer_btn__find)}>
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default PasswordNew;
