import React, { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import styles from './EnterCode.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';

function EnterCode(props) {
    const { handleCancel } = props;
    const navigate = useNavigate();
    const [OTP, setOTP] = useState('');
    const [error, setError] = useState('');
    const [countDown, setCountDown] = useState(60);

    useEffect(() => {
        if (countDown > 0) {
            const timer = setInterval(() => {
                setCountDown(countDown - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    });

    const handleCompareCode = (e) => {
        e.preventDefault();
        if (OTP) {
            axios
                .post('http://localhost:8080/user/confirmOTP', {
                    user: JSON.parse(localStorage.account),
                    OTP: OTP,
                })
                .then((res) => {
                    navigate('/Login/PassWordNew');
                })
                .catch((err) => {
                    setError(err.response.data.message);
                });
        }
    };

    return (
        <div className={clsx(styles.enterCode)}>
            <div className={clsx(styles.header)}>
                <h2>Nhập mã bảo mật</h2>
            </div>
            <div className={clsx(styles.container)}>
                <p>Vui lòng kiểm tra mã OTP của bạn.Mã gồm 6 số</p>
                {countDown !== 0 ? (
                    <>
                        <input
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            placeholder="Vui lòng nhập mã OTP"
                        />
                        {error && (
                            <div style={{ marginTop: 8 }}>
                                <span className={clsx(styles.form_message)}>{error}</span>
                            </div>
                        )}
                        <span>
                            Mã OTP sẽ hết hạn sau <span style={{ color: '#eb1336' }}>{countDown}</span> giây
                        </span>
                    </>
                ) : (
                    <NavLink style={{ textDecoration: 'none' }} to={'/Login/Recover'}>
                        <button className={clsx(styles.footer_btn, styles.footer_btn__find, styles.container_sendTo)}>
                            Gửi lại
                        </button>
                    </NavLink>
                )}
            </div>
            <div className={clsx(styles.footer)}>
                <NavLink to={'/Login/Recover'}>
                    <button onClick={handleCancel} className={clsx(styles.footer_btn)}>
                        Phương thức khác
                    </button>
                </NavLink>

                <button
                    onClick={(e) => handleCompareCode(e)}
                    className={clsx(styles.footer_btn, styles.footer_btn__find)}
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}

export default EnterCode;
