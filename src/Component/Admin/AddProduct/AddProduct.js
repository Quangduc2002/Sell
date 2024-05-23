import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { useNavigate, Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import axios from 'axios';
import styles from './AddProduct.module.scss';
import { fetchUser } from '../../../services/UseServices';
import { UserContext } from '../../../Context/UserContext';

function AddProduct(props) {
    const { toast } = props;
    // format tiền
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const navigate = useNavigate();
    const [tenSp, setTenSp] = useState();
    const [chatLieu, setChatLieu] = useState();
    const [gnhap, setgNhap] = useState('');
    const [gBan, setgBan] = useState('');
    const [loaiSp, setLoaiSp] = useState();
    const [soLuong, setSoLuong] = useState();
    const [Image, setImage] = useState('');
    const [kichThuoc, setKichThuoc] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [producttypes, setProducttypes] = useState('');
    const [materials, setMaterials] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const { user } = useContext(UserContext);
    const handleImage = (e) => {
        // add image vào csdl
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        getUsers();
        getMeterial();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser('/producttypes');
        setProducttypes(res.data);
    };

    const getMeterial = async () => {
        let res = await fetchUser('/products/meterial');
        setMaterials(res.data);
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
        if (!soLuong) {
            errors.soLuong = 'Please enter quantity !';
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
            formData.append('tenSp', tenSp);
            formData.append('chatLieu', chatLieu);
            formData.append('giaNhap', gnhap);
            formData.append('giaBan', gBan);
            formData.append('producttypeId', loaiSp);
            formData.append('image', Image);
            formData.append('giamGia', giamGia);
            formData.append('kichThuoc', kichThuoc);
            formData.append('soLuong', soLuong);
            formData.append('trangThai', 1);
            formData.append('maNV', user.account.getUser.id);
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
                    setSoLuong('');
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
        <div className={clsx(styles.addProduct, 'xs:w-full md:w-[80%]')}>
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
                    <div className={clsx(styles.add, 'xs:block md:flex')}>
                        <div className={clsx(styles.add_left, 'xs:w-full md:w-[46%]')}>
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
                                    {materials &&
                                        materials.map((material) => {
                                            return (
                                                <option key={material.id} value={material.id}>
                                                    {material.tenChatLieu}
                                                </option>
                                            );
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
                                    value={VND.format(gnhap).replace('₫', '').trim()}
                                    onChange={(e) => setgNhap(e.target.value.replace(/[^\d]/g, ''))}
                                    type="text"
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
                                    value={VND.format(gBan).replace('₫', '').trim()}
                                    onChange={(e) => setgBan(e.target.value.replace(/[^\d]/g, ''))}
                                    type="text"
                                    className={clsx(styles.add_formControl)}
                                />
                                <div>
                                    {formErrors.gBan && <p className={clsx(styles.form_message)}>{formErrors.gBan}</p>}
                                </div>
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Số lượng</label>
                                <br />
                                <input
                                    placeholder="số lượng"
                                    value={soLuong}
                                    onChange={(e) => setSoLuong(e.target.value)}
                                    type="number"
                                    min={0}
                                    className={clsx(styles.add_formControl)}
                                />
                                <div>
                                    {formErrors.soLuong && (
                                        <p className={clsx(styles.form_message)}>{formErrors.soLuong}</p>
                                    )}
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
                                    <option disabled style={{ display: 'none' }} value="0s">
                                        Loại sản phẩm
                                    </option>
                                    {producttypes &&
                                        producttypes.map((producttype) => {
                                            return (
                                                <option key={producttype.id} value={producttype.id}>
                                                    {producttype.tenLoaiSp}
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

                        <div className={clsx(styles.add_right, 'xs:w-full md:w-[46%]')}>
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
                                <label
                                    htmlFor="FLFrontImage"
                                    className={clsx(styles.add_formGroup__customFile, 'xs:text-xs md:text-base')}
                                >
                                    Chọn ảnh
                                    <i style={{ marginLeft: 6 }} className="fa-solid fa-cloud-arrow-up"></i>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 ">
                        <button
                            onClick={(e) => handleAddProduct(e)}
                            className={clsx(styles.btnAdd, 'xs:text-xs md:text-base')}
                        >
                            Thêm sản phẩm
                        </button>
                        <button onClick={handleBack} className={clsx(styles.btnBack, 'xs:text-xs md:text-base')}>
                            Quay lại
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default AddProduct;
