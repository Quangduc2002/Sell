import React, { useState } from 'react';
import clsx from 'clsx';
import styles from '../Login/Login.module.scss';
import { useForm } from 'react-hook-form';

function Login(props) {
    const [check, setCheck] = useState(false);
    const { setShow, show, handleSubmitBT, setEmail, setPassword } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => {
    //     console.log(data);
    // };

    // const navigate = useNavigate();
    // const handleSubmitBT = () => {
    //     // event.preventDefault(); //preventDefault() dùng để ngăn chặn hành vi mặc định của trình duyệt
    //     // axios.post('https://reqres.in/api/login/1', { email, password })
    //     //     .then((response) => {
    //     if (email === 'Quangduc2002@gmail.com' && password === '221202') {
    //         navigate('/');
    //         setShow(!show);
    //         // toast.success('Đăng nhập thành công');
    //     } else if (email !== '' && password !== '') {
    //         // toast.error('Tài đăng nhập không chính xác');
    //     }
    //     // })
    //     // .catch((err) => {
    //     //     console.log('lỗi', err);
    //     // });
    // };

    return (
        <div className={clsx(styles.nav2_form)}>
            <div className={clsx(styles.form_header)}>
                <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
            </div>
            <form onSubmit={handleSubmit()} className={clsx(styles.auth_form)}>
                <div className={clsx(styles.auth_froup)}>
                    <input
                        // value={email}
                        type="text"
                        name="email"
                        className={clsx(styles.auth_input)}
                        placeholder="Nhập Email"
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {Object.keys(errors).length !== 0 && (
                        <div>
                            {errors.email?.type === 'required' && (
                                <p className={clsx(styles.form_message)}>Please enter Email !</p>
                            )}
                            {errors.email?.type === 'pattern' && (
                                <p className={clsx(styles.form_message)}>Please enter correct email format !</p>
                            )}
                        </div>
                    )}
                </div>
                <div className={clsx(styles.auth_froup)}>
                    <div className={clsx(styles.auth_froup__pass)}>
                        <input
                            // value={password}
                            type={check === true ? 'text' : 'password'}
                            name="password"
                            className={clsx(styles.auth_input)}
                            placeholder="Nhập mật khẩu"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                            })}
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
                        {/* <i class="fa-regular fa-eye-slash"></i> */}
                    </div>
                    {Object.keys(errors).length !== 0 && (
                        <div>
                            {errors.password?.type === 'required' && (
                                <p className={clsx(styles.form_message)}>Please enter Password !</p>
                            )}

                            {errors.password?.type === 'minLength' && (
                                <p className={clsx(styles.form_message)}>Please enter at least 6 characters</p>
                            )}
                        </div>
                    )}
                </div>
                <div className={clsx(styles.form_controls, styles.form_controls1)}>
                    <button
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={clsx(styles.form_btn)}
                    >
                        TRỞ LẠI
                    </button>
                    <button onClick={() => handleSubmitBT()} className={clsx(styles.form_btn, styles.form_primary)}>
                        ĐĂNG NHẬP
                    </button>
                </div>
                <div className={clsx(styles.form_controls2)}>
                    <p className={clsx(styles.controls2_p)}>Quên mật khẩu</p>
                    <p>Cần trợ giúp</p>
                </div>
            </form>
        </div>
    );
}

export default Login;
