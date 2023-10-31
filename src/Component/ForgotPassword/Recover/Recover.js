import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Recover.module.scss';

function Recover(props) {
    const { handleCancel } = props;
    const navigate = useNavigate();
    const [option, setOption] = useState('');
    const [error, setError] = useState('');

    const handleSendEmail = (e) => {
        e.preventDefault();
        navigate('/Login/EnterCode');

        axios
            .post('http://localhost:8080/user/sendEmail', {
                user: JSON.parse(localStorage.account),
                options: option,
            })
            .then((res) => {
                // navigate('/Login/EnterCode');
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };

    return (
        <div className={clsx(styles.recover)}>
            <div className={clsx(styles.header)}>
                <h2>Đặt lại mật khẩu của bạn</h2>
            </div>
            <div className={clsx(styles.container)}>
                <div style={{ width: '60%' }}>
                    <h3>Bạn muốn nhận mã để đặt lại mật khẩu theo cách nào ?</h3>
                    <div className={clsx(styles.container_option)}>
                        <input
                            id="email"
                            type="radio"
                            name="option"
                            value="email"
                            onChange={(e) => setOption(e.target.value)}
                        />
                        <label htmlFor="email" className={clsx(styles.container_option__label)}>
                            <p>Gửi mã qua email</p>
                            <p> {JSON.parse(localStorage.account).email}</p>
                        </label>
                    </div>

                    <div className={clsx(styles.container_option)}>
                        <input
                            id="phoneNumber"
                            name="option"
                            type="radio"
                            value="phoneNumber"
                            onChange={(e) => setOption(e.target.value)}
                        />
                        <label htmlFor="phoneNumber" className={clsx(styles.container_option__label)}>
                            <p>Gửi mã qua SMS</p>
                            <p> {JSON.parse(localStorage.account).soDT}</p>
                        </label>
                    </div>
                    {error && (
                        <div style={{ marginTop: 8 }}>
                            <span className={clsx(styles.form_message)}>{error}</span>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            style={{ height: 60, width: 60, borderRadius: '50%', border: '1px solid #dbdbdb' }}
                            className={clsx(styles.add_formGroup__img)}
                            src={`http://localhost:3000/Image/${JSON.parse(localStorage.account).image}`}
                            alt=""
                        />
                        <p> {JSON.parse(localStorage.account).name}</p>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.footer)}>
                <NavLink to={'/Login/FindAccounts'}>
                    <button onClick={handleCancel} className={clsx(styles.footer_btn)}>
                        Hủy
                    </button>
                </NavLink>
                <button
                    onClick={(e) => handleSendEmail(e)}
                    className={clsx(styles.footer_btn, styles.footer_btn__find)}
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}

export default Recover;
