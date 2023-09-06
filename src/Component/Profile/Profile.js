import React from 'react';
import clsx from 'clsx';
import styles from './Profile.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchUser } from '../../services/UseServices';
import axios from 'axios';

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

    const handleImage = (e) => {
        // add image vào csdl
        setImage(e.target.files[0]);
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser(`/user/${JSON.parse(localStorage.account).id}`);
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
        axios
            .put(`http://localhost:8080/user/${JSON.parse(localStorage.account).id}/edit`, formData)
            .then((res) => {
                toast.success('Sửa user thành công ');
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const handleChangePass = (e) => {
        e.preventDefault();
        if (passNew === enterPass && passNew !== currentPass && currentPass && enterPass && passNew) {
            axios
                .put(`http://localhost:8080/user/${JSON.parse(localStorage.account).id}/changePassword`, {
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
