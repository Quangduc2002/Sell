import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import styles from './Profile.module.scss';
import { fetchUser, axiosPut } from '../../services/UseServices';
import { UserContext } from '../../Context/UserContext';

function Profile(props) {
    const { toast } = props;
    const [Day, setDay] = useState('');
    const [Month, setMonth] = useState('');
    const [Year, setYear] = useState('');
    const [Image, setImage] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [fileImage, setFileImage] = useState();
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [show, setShow] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [passNew, setPassNew] = useState('');
    const [enterPass, setEnterPass] = useState('');
    const [checkError, setCheckError] = useState('');
    const { user } = useContext(UserContext);

    const handleImage = (e) => {
        // add image vào csdl
        setImage(e.target.files[0]);
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    useEffect(() => {
        getUsers();
        // bỏ warning React Hook useEffect has a missing dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = async () => {
        let res = await fetchUser(`/user/${user.account.getUser.id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setGioiTinh(res.data.gioiTinh);
        setDay(res.data.ngaySinh);
        setMonth(res.data.thangSinh);
        setYear(res.data.namSinh);
        setImage(res.data.image);
    };

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

    const handleEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', Image);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('ngaySinh', Day);
        formData.append('thangSinh', Month);
        formData.append('namSinh', Year);
        formData.append('gioiTinh', gioiTinh);
        axiosPut(`/user/${user.account.getUser.id}/edit`, formData)
            .then((res) => {
                toast.success('Sửa thông tin thành công ');
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const handleChangePass = (e) => {
        e.preventDefault();
        if (passNew === enterPass && passNew !== currentPass && currentPass && enterPass && passNew) {
            axiosPut(`/user/${user.account.getUser.id}/changePassword`, {
                currentPass: currentPass,
                password: passNew,
            })
                .then((res) => {
                    toast.success('Đổi mật khẩu thành công ');
                    setCheckError(res.data.errCode);
                    setCurrentPass('');
                    setPassNew('');
                    setEnterPass('');
                })
                .catch((err) => {
                    setCheckError(err.response.data.errCode);
                    toast.warn(err.response.data.message);
                });
        }
    };

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.container_information)}>
                <div className={clsx(styles.container_information__top)}>
                    <h1>Hồ sơ của tôi</h1>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    <p onClick={() => setShow(true)} className={clsx(styles.container_information__changePass)}>
                        Đổi mật khẩu
                    </p>
                </div>

                <div className={clsx(styles.container_information__bottom)}>
                    <div className={clsx(styles.container_information__bottom__left)}>
                        <div className={clsx(styles.container_information__bottom__sex)}>
                            <label className={clsx(styles.container_information__bottom__label)}>Tên đăng nhập</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className={clsx(styles.container_information__bottom__sex)}>
                            <label className={clsx(styles.container_information__bottom__label)}>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className={clsx(styles.container_information__bottom__sex)}>
                            <label className={clsx(styles.container_information__bottom__label)}>Giới tính</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {Sexs.map((sex) => {
                                    return (
                                        <div key={sex.id} style={{ marginRight: 10 }}>
                                            <input
                                                style={{ marginRight: 4 }}
                                                id={sex.id}
                                                type="radio"
                                                name="gioitinh"
                                                value={sex.id}
                                                onChange={(e) => setGioiTinh(e.target.value)}
                                                // dấu + ép thành kiểu số nguyên
                                                checked={sex.id === +gioiTinh ? true : false}
                                            />
                                            <label htmlFor={sex.id}>{sex.name}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={clsx(styles.container_information__bottom__sex)}>
                            <label className={clsx(styles.container_information__bottom__label)}>Ngày sinh</label>
                            <div className={clsx(styles.auth_froup_date)}>
                                <select
                                    className={clsx(styles.container_information__bottom__select)}
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
                                    className={clsx(styles.container_information__bottom__select)}
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
                                    className={clsx(styles.container_information__bottom__select)}
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

                        <div className={clsx(styles.container_information__bottom__sex)}>
                            <label className={clsx(styles.container_information__bottom__label)}></label>
                            <button onClick={handleEdit} className={clsx(styles.container_information__bottom__btn)}>
                                Lưu
                            </button>
                        </div>
                    </div>

                    <div className={clsx(styles.add_right)}>
                        <div className={clsx(styles.add_formGroup)}>
                            <img
                                className={clsx(styles.add_formGroup__img)}
                                src={!fileImage ? `http://localhost:3000/Image/${Image}` : fileImage}
                                alt=""
                            />
                            <input style={{ display: 'none' }} type="file" id="FLFrontImage" onChange={handleImage} />
                            <br />
                            <label htmlFor="FLFrontImage" className={clsx(styles.add_formGroup__customFile)}>
                                Chọn ảnh
                                <i style={{ marginLeft: 6 }} className="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                        </div>
                    </div>
                </div>

                {show && (
                    <div className={clsx(styles.container_model)}>
                        <div className={clsx(styles.container_model__close)}>
                            <i onClick={() => setShow(false)} className="fa-solid fa-xmark"></i>
                        </div>

                        <div className={clsx(styles.container_model__title)}>
                            <h3>Đổi mật khẩu</h3>
                            <p>Mật khẩu của bạn phải có ít nhất 6 ký tự</p>
                        </div>

                        <form className={clsx(styles.auth_form)}>
                            <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={currentPass}
                                        type={check1 === true ? 'text' : 'password'}
                                        name="password"
                                        className={clsx(
                                            styles.auth_input,
                                            checkError === 1 ? styles.auth_input__active : '',
                                        )}
                                        placeholder="Mật khẩu hiện tại"
                                        onChange={(e) => setCurrentPass(e.target.value)}
                                    />
                                    <i
                                        onClick={() => {
                                            setCheck1(!check1);
                                        }}
                                        className={clsx(
                                            styles.auth_froup__eye,
                                            'fa-regular ',
                                            check1 === true ? 'fa-eye' : 'fa-eye-slash',
                                        )}
                                    ></i>
                                </div>
                                <div>
                                    <p className={clsx(styles.form_message)}>
                                        {checkError === 1 ? 'Sai mật khẩu hiện tại.' : ''}
                                    </p>
                                </div>
                            </div>

                            <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={passNew}
                                        type={check2 === true ? 'text' : 'password'}
                                        name="password"
                                        className={clsx(
                                            styles.auth_input,
                                            passNew && (passNew.length < 6 || passNew === currentPass)
                                                ? styles.auth_input__active
                                                : '',
                                        )}
                                        placeholder="Mật khẩu mới"
                                        onChange={(e) => setPassNew(e.target.value)}
                                    />
                                    <i
                                        onClick={() => {
                                            setCheck2(!check2);
                                        }}
                                        className={clsx(
                                            styles.auth_froup__eye,
                                            'fa-regular ',
                                            check2 === true ? 'fa-eye' : 'fa-eye-slash',
                                        )}
                                    ></i>
                                </div>
                                <div>
                                    {passNew && (
                                        <p className={clsx(styles.form_message)}>
                                            {passNew.length < 6
                                                ? 'Vui lòng nhập ít nhất 6 ký tự.'
                                                : passNew === currentPass
                                                ? 'Mật khẩu mới phải khác mật khẩu hiện tại.'
                                                : ''}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div style={{ position: 'relative' }} className={clsx(styles.auth_froup)}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={enterPass}
                                        type={check3 === true ? 'text' : 'password'}
                                        name="password"
                                        className={clsx(
                                            styles.auth_input,
                                            enterPass && passNew !== enterPass ? styles.auth_input__active : '',
                                        )}
                                        placeholder="Nhập lại mật khẩu mới"
                                        onChange={(e) => setEnterPass(e.target.value)}
                                    />
                                    <i
                                        onClick={() => {
                                            setCheck3(!check3);
                                        }}
                                        className={clsx(
                                            styles.auth_froup__eye,
                                            'fa-regular ',
                                            check3 === true ? 'fa-eye' : 'fa-eye-slash',
                                        )}
                                    ></i>
                                </div>
                                <div>
                                    {enterPass && (
                                        <p className={clsx(styles.form_message)}>
                                            {passNew !== enterPass ? 'Mật khẩu mới không khớp.' : ''}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={clsx(styles.container_model__btn)}>
                                <p
                                    className={clsx(
                                        passNew === enterPass &&
                                            passNew !== currentPass &&
                                            currentPass &&
                                            enterPass &&
                                            passNew
                                            ? ''
                                            : styles.active,
                                    )}
                                    onClick={handleChangePass}
                                >
                                    Đổi mật khẩu
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {show && <div onClick={() => setShow(false)} className={clsx(styles.model)}></div>}
        </div>
    );
}

export default Profile;
