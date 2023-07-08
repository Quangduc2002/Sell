import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate, Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import axios from 'axios';
import styles from './AddProduct.module.scss';
import { fetchUser } from '../../../services/UseServices';

function AddProduct(props) {
    const { toast } = props;
    const navigate = useNavigate();
    const [tenSp, setTenSp] = useState();
    const [chatLieu, setChatLieu] = useState();
    const [gnhap, setgNhap] = useState();
    const [gBan, setgBan] = useState();
    const [loaiSp, setLoaiSp] = useState();
    const [Image, setImage] = useState('');
    const [kichThuoc, setKichThuoc] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [producttypes, setProducttypes] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const material = ['Gỗ gụ', 'Gỗ gõ', 'Vải', 'Gỗ hương đá', 'Gỗ hương'];

    const handleImage = (e) => {
        // add image vào csdl
        setImage(e.target.files[0]);
        // setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('/producttypes');
        setProducttypes(res.data);
    };

    // validate
    const handleValidation = () => {
        let errors = {};
        let isValid = true;

        if (!tenSp) {
            errors.tenSp = 'Please enter product !';
            isValid = false;
        }

        if (!chatLieu) {
            errors.chatLieu = 'Please enter material !';
            isValid = false;
        }

        if (!gnhap) {
            errors.gnhap = 'Please enter import price !';
            isValid = false;
        }

        if (!gBan) {
            errors.gBan = 'Please enter price !';
            isValid = false;
        }
        if (!gBan) {
            errors.gBan = 'Please enter price !';
            isValid = false;
        }
        if (!gBan) {
            errors.gBan = 'Please enter price !';
            isValid = false;
        }
        if (!loaiSp) {
            errors.loaiSp = 'Select product type !';
            isValid = false;
        }
        if (!kichThuoc) {
            errors.kichThuoc = 'Please enter size !';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    // api add product
    const handleAddProduct = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const formData = new FormData();
            formData.append('TenSp', tenSp);
            formData.append('ChatLieu', chatLieu);
            formData.append('GiaNhap', gnhap);
            formData.append('GiaBan', gBan);
            formData.append('ProducttypeId', loaiSp);
            formData.append('Image', Image);
            formData.append('GiamGia', giamGia);
            formData.append('KichThuoc', kichThuoc);
            axios
                .post('http://localhost:8080/products/add', formData)
                .then((res) => {
                    navigate('/admin/DSSP');
                    toast.success('Thêm sản phẩm thành công ');
                    setTenSp('');
                    setChatLieu('');
                    setgBan('');
                    setgNhap('');
                    setLoaiSp('');
                    setGiamGia('');
                    setKichThuoc('');
                })
                .catch((err) => {
                    toast.error(err);
                });
        }
    };

    const handleBack = () => {
        navigate('/admin/DSSP');
    };

    return (
        <div className={clsx(styles.addProduct)}>
            <div className={clsx(styles.addProduct_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Trang
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Thêm sản phẩm</span>
                </div>
            </div>

            <motion.div
                className={clsx(styles.addProduct_PD)}
                initial={{ y: '4rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    type: spring,
                }}
            >
                <h1>Thêm sản phẩm</h1>
                <form className={clsx(styles.form)} method="post" encType="multipart/form-data" action="/products/add">
                    <div className={clsx(styles.add)}>
                        <div className={clsx(styles.add_left)}>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="name">Tên sản phẩm</label>
                                <br />
                                <input
                                    placeholder="tên sản phẩm"
                                    value={tenSp}
                                    onChange={(e) => setTenSp(e.target.value)}
                                    type="text"
                                    className={clsx(styles.add_formControl)}
                                />
                                {!tenSp ? (
                                    <div>
                                        {formErrors.tenSp && (
                                            <p className={clsx(styles.form_message)}>{formErrors.tenSp}</p>
                                        )}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="videoId">Chất liệu</label>
                                <br />
                                <select
                                    defaultValue="0"
                                    value={chatLieu}
                                    onChange={(e) => setChatLieu(e.target.value)}
                                    className={clsx(styles.add_formControl)}
                                >
                                    <option disabled style={{ display: 'none' }} value="0">
                                        Chất liệu
                                    </option>
                                    {material &&
                                        material.map((material, index) => {
                                            return <option key={index}>{material}</option>;
                                        })}
                                </select>
                                <div>
                                    {formErrors.chatLieu && (
                                        <p className={clsx(styles.form_message)}>{formErrors.chatLieu}</p>
                                    )}
                                </div>
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Giá nhập</label>
                                <br />
                                <input
                                    placeholder="giá nhập"
                                    value={gnhap}
                                    onChange={(e) => setgNhap(e.target.value)}
                                    type="number"
                                    min={0}
                                    className={clsx(styles.add_formControl)}
                                />
                                <div>
                                    {formErrors.gnhap && (
                                        <p className={clsx(styles.form_message)}>{formErrors.gnhap}</p>
                                    )}
                                </div>
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Giá bán</label>
                                <br />
                                <input
                                    placeholder="giá bán"
                                    value={gBan}
                                    onChange={(e) => setgBan(e.target.value)}
                                    type="number"
                                    min={0}
                                    className={clsx(styles.add_formControl)}
                                />
                                <div>
                                    {formErrors.gBan && <p className={clsx(styles.form_message)}>{formErrors.gBan}</p>}
                                </div>
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Kích thước</label>
                                <br />
                                <input
                                    placeholder="kích thước"
                                    value={kichThuoc}
                                    onChange={(e) => setKichThuoc(e.target.value)}
                                    type="text"
                                    min={0}
                                    className={clsx(styles.add_formControl)}
                                />
                                <div>
                                    {formErrors.kichThuoc && (
                                        <p className={clsx(styles.form_message)}>{formErrors.kichThuoc}</p>
                                    )}
                                </div>
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label>Giảm giá</label>
                                <br />
                                <input
                                    placeholder="giảm giá"
                                    value={giamGia}
                                    onChange={(e) => setGiamGia(e.target.value)}
                                    type="text"
                                    className={clsx(styles.add_formControl)}
                                />
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Loại sản phẩm</label>
                                <br />
                                <select
                                    defaultValue="0"
                                    value={loaiSp}
                                    onChange={(e) => setLoaiSp(e.target.value)}
                                    className={clsx(styles.add_formControl)}
                                >
                                    <option disabled style={{ display: 'none' }} value="0">
                                        Loại sản phẩm
                                    </option>
                                    {producttypes &&
                                        producttypes.map((producttype) => {
                                            return (
                                                <option key={producttype._id} value={producttype._id}>
                                                    {producttype.TenLoaiSp}
                                                </option>
                                            );
                                        })}
                                </select>
                                <div>
                                    {formErrors.loaiSp && (
                                        <p className={clsx(styles.form_message)}>{formErrors.loaiSp}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={clsx(styles.add_right)}>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Ảnh sản phẩm</label>
                                <br />
                                {Image && (
                                    <img
                                        className={clsx(styles.add_formGroup__img)}
                                        width="300"
                                        height="250"
                                        src={Image ? URL.createObjectURL(Image) : ''}
                                        alt=""
                                    />
                                )}
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="FLFrontImage"
                                    onChange={handleImage}
                                />
                                <br />
                                <label htmlFor="FLFrontImage" className={clsx(styles.add_formGroup__customFile)}>
                                    Chọn ảnh
                                    <i style={{ marginLeft: 6 }} className="fa-solid fa-cloud-arrow-up"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={(e) => handleAddProduct(e)} className={clsx(styles.btnAdd)}>
                            Thêm sản phẩm
                        </button>
                        <button onClick={handleBack} className={clsx(styles.btnBack)}>
                            Quay lại
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default AddProduct;
