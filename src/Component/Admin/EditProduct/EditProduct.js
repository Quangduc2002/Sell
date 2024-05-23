import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useParams, Link } from 'react-router-dom';
import { motion, spring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditProduct.module.scss';
import { fetchUser } from '../../../services/UseServices';
import { UserContext } from '../../../Context/UserContext';

function EditProduct(props) {
    const { toast } = props;
    let { id } = useParams();
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [tenSp, setTenSp] = useState('');
    const [chatLieu, setChatLieu] = useState('');
    const [gnhap, setgNhap] = useState('');
    const [gBan, setgBan] = useState('');
    const [kichThuoc, setKichThuoc] = useState('');
    const [giamGia, setGiamGia] = useState('');
    const [loaiSp, setLoaiSp] = useState('');
    const [Image, setImage] = useState('');
    const [fileImage, setFileImage] = useState();
    const [producttypes, setProducttypes] = useState('');
    const material = ['Gỗ gụ', 'Gỗ gõ', 'Vải', 'Gỗ hương đá', 'Gỗ hương'];
    const { user } = useContext(UserContext);

    useEffect(() => {
        getUsers();
        handleGetProduct(id);
    }, [id]);

    //api loại sản phẩm
    const getUsers = async () => {
        let res = await fetchUser('/producttypes');
        setProducttypes(res.data);
    };

    const handleGetProduct = async (id) => {
        let res = await fetchUser(`/products/${id}`);
        setTenSp(res.data.tenSp);
        setChatLieu(res.data.chatLieu);
        setgNhap(res.data.giaNhap);
        setgBan(res.data.giaBan);
        setGiamGia(res.data.giamGia);
        setLoaiSp(res.data.loaiSp);
        setImage(res.data.image);
        setKichThuoc(res.data.kichThuoc);
    };

    const handleEdit = async (e) => {
        if (user.account.getUser.roleId === 3) {
            e.preventDefault();
            setShow(!show);
            axios
                .put(`http://localhost:8080/products/${id}/edit`, {
                    tenSp: tenSp,
                    chatLieu: chatLieu,
                    giaBan: gBan,
                    giaNhap: gnhap,
                    giamGia: giamGia,
                    kichThuoc: kichThuoc,
                    image: Image.name,
                    loaiSp: loaiSp,
                })
                .then((res) => {
                    setTimeout(() => navigate('/admin/DSSP'), 1000);
                    toast.success('Sửa sản phẩm thành công ');
                })
                .catch((err) => {
                    toast.error(err);
                });
        } else {
            setShow(!show);
            toast.warn('Bạn không có quyền sửa sản phẩm');
        }
    };

    const handleModal = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    const handleBack = () => {
        navigate('/admin/DSSP');
    };

    const handleImage = (e) => {
        // add image vào csdl
        setImage(e.target.files[0]);
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className={clsx(styles.editProduct)}>
            <div className={clsx(styles.editProduct_header)}>
                <div className={clsx(styles.breadcrumbs)}>
                    <Link to="/" className={clsx(styles.Link)}>
                        Trang
                    </Link>
                    <span className={clsx(styles.divider)}>/</span>
                    <span>Sửa sản phẩm</span>
                </div>
            </div>

            <motion.div
                className={clsx(styles.editProduct_PD, 'overflow-x-scroll')}
                initial={{ y: '4rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    type: spring,
                }}
            >
                <h1>Sửa sản phẩm</h1>
                <form className={clsx(styles.form)} encType="multipart/form-data">
                    <div className={clsx(styles.add)}>
                        <div className={clsx(styles.add_left)}>
                            <div className={clsx(styles.add_formGroup)}>
                                <label>Tên sản phẩm</label>
                                <br />
                                <input
                                    placeholder="tên sản phẩm"
                                    value={tenSp}
                                    onChange={(e) => setTenSp(e.target.value)}
                                    type="text"
                                    className={clsx(styles.add_formControl)}
                                />
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
                                    {material &&
                                        material.map((material, index) => {
                                            return <option key={index}>{material}</option>;
                                        })}
                                </select>
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Giá nhập</label>
                                <br />
                                <input
                                    placeholder="giá nhập"
                                    value={VND.format(gnhap).replace('₫', '').trim()}
                                    onChange={(e) => setgNhap(e.target.value.replace(/[^\d]/g, ''))}
                                    type="text"
                                    min={0}
                                    className={clsx(styles.add_formControl)}
                                />
                            </div>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Giá bán</label>
                                <br />
                                <input
                                    placeholder="giá bán"
                                    value={VND.format(gBan).replace('₫', '').trim()}
                                    onChange={(e) => setgBan(e.target.value.replace(/[^\d]/g, ''))}
                                    type="text"
                                    min={0}
                                    className={clsx(styles.add_formControl)}
                                />
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
                                    {producttypes &&
                                        producttypes.map((producttype) => {
                                            return (
                                                <option key={producttype.id} value={producttype.id}>
                                                    {producttype.tenLoaiSp}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>

                        <div className={clsx(styles.add_right)}>
                            <div className={clsx(styles.add_formGroup)}>
                                <label htmlFor="level">Ảnh sản phẩm</label>
                                <br />
                                <img
                                    className={clsx(styles.add_formGroup__img)}
                                    width="300"
                                    height="250"
                                    src={!fileImage ? `http://localhost:3000/Image/${Image}` : fileImage}
                                    alt=""
                                />

                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="FLFrontImage"
                                    onChange={handleImage}
                                />
                                <br />
                                <label htmlFor="FLFrontImage" className={clsx(styles.add_formGroup__customFile)}>
                                    Chọn ảnh
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={(e) => handleModal(e)} className={clsx(styles.btnAdd)}>
                            Sửa sản phẩm
                        </button>
                        <button onClick={handleBack} className={clsx(styles.btnBack)}>
                            Quay lại
                        </button>
                    </div>
                </form>

                {show && (
                    <div className={clsx(styles.modal)} tabindex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className={clsx(styles.modal_header)}>
                                    <h5 className="modal-title">Sửa sản phẩm</h5>
                                    <button
                                        type="button"
                                        className={clsx(styles.modal_close)}
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span onClick={() => setShow(!show)} aria-hidden="true">
                                            &times;
                                        </span>
                                    </button>
                                </div>
                                <div className={clsx(styles.modal_body)}>
                                    <p>Bạn chắc chắn muốn sửa sản phẩm không ?</p>
                                </div>
                                <div className={clsx(styles.modal_footer)}>
                                    <button
                                        onClick={() => setShow(!show)}
                                        type="button"
                                        className={clsx(styles.modal_btnClose)}
                                        data-dismiss="modal"
                                    >
                                        Hủy
                                    </button>
                                    <button onClick={handleEdit} type="button" className={clsx(styles.modal_btnSave)}>
                                        Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default EditProduct;
