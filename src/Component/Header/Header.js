import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import styles from "../Header/Header.module.scss";
import React from "react";
import LogoTT from "../Image/logo-2.jpg";
import Phone from "../Image/telephone.png";

function Header(props) {
  const { cartItems } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [show, setShow] = useState(false);
  const [state, setSate] = useState("");
  const [product, setProduct] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const search = useRef();

  const HandleOnSubmit = () => {
    setProduct([...product, { state }]);
    setSate("");
    search.current.focus();
  };

  const handleDelete = () => {
    const newJobs = [...product];
    newJobs.splice(state, 1);
    setProduct(newJobs);
    setSate("");
    search.current.focus();
  };

  const links = [
    { path: "/", title: "Trang chủ" },
    { path: "/phongkhach", title: "Phòng khách" },
    { path: "/phongbep", title: "Phòng bếp" },
    { path: "/phonglamviec", title: "Phòng làm việc" },
    { path: "/phongngu", title: "Phòng ngủ" },
  ];
  const [type, setType] = useState("/");

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.top)}>
        <div className={clsx(styles.wrapper1)}>
          <div className={clsx(styles.wrapper1_custom)}>
            <h3>CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG SIÊU THỊ NỘI THẤT !</h3>
          </div>
          <div className={clsx(styles.wrapper1_medium)}>
            <ul>
              <li
                className={clsx(styles.wrapper1_medium__li)}
                style={{ marginRight: 12 }}
              >
                Sản phẩm
              </li>
              <li style={{ marginRight: 12, marginLeft: 12 }}>Tin tức</li>
              <li style={{ marginRight: 12, marginLeft: 12 }}>Liên hệ</li>
              <li style={{ marginLeft: 12 }}>
                <span
                  className={clsx(styles.show)}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  Đăng nhập
                </span>
                {show && (
                  <div className={clsx(styles.nav2_form)}>
                    <div className={clsx(styles.form_header)}>
                      <h3 className={clsx(styles.form_heading)}>Đăng Nhập</h3>
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className={clsx(styles.auth_form)}
                    >
                      <div className={clsx(styles.auth_froup)}>
                        <input
                          type="text"
                          name="email"
                          className={clsx(styles.auth_input)}
                          placeholder="Nhập Email"
                          {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                          })}
                        />
                        {Object.keys(errors).length !== 0 && (
                          <div>
                            {errors.email?.type === "required" && (
                              <p className={clsx(styles.form_message)}>
                                Please enter Email !
                              </p>
                            )}
                            {errors.email?.type === "pattern" && (
                              <p className={clsx(styles.form_message)}>
                                Please enter correct email format !
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className={clsx(styles.auth_froup)}>
                        <input
                          type="password"
                          name="password"
                          className={clsx(styles.auth_input)}
                          placeholder="Nhập mật khẩu"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                        />
                        {Object.keys(errors).length !== 0 && (
                          <div>
                            {errors.password?.type === "required" && (
                              <p className={clsx(styles.form_message)}>
                                Please enter Password !
                              </p>
                            )}

                            {errors.password?.type === "minLength" && (
                              <p className={clsx(styles.form_message)}>
                                Please enter at least 6 characters
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div
                        className={clsx(
                          styles.form_controls,
                          styles.form_controls1
                        )}
                      >
                        <button
                          onClick={() => {
                            setShow(!show);
                          }}
                          className={clsx(styles.form_btn)}
                        >
                          TRỞ LẠI
                        </button>
                        <button
                          className={clsx(styles.form_btn, styles.form_primary)}
                        >
                          ĐĂNG NHẬP
                        </button>
                      </div>
                      <div className={clsx(styles.form_controls2)}>
                        <p className={clsx(styles.controls2_p)}>
                          Quên mật khẩu
                        </p>
                        <p>Cần trợ giúp</p>
                      </div>
                    </form>
                  </div>
                )}

                {show && (
                  <div
                    onClick={() => {
                      setShow(!show);
                    }}
                    className={clsx(styles.model)}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={clsx(styles.top1)}>
        <div className={clsx(styles.wrapper2)}>
          <div
            onClick={() => {
              setShow2(!show2);
            }}
            className={clsx(styles.bars)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <Link onClick={() => setType("/")} to="/">
            <img alt="" src={LogoTT} />
          </Link>

          <Link
            to="/giohang"
            onClick={() => setType("/giohang")}
            className={clsx(styles.cart, styles.cartMB)}
          >
            <>
              <i className="fa-solid fa-cart-shopping"></i>
            </>
            <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
          </Link>
          <div className={clsx(styles.wrapper2_search)}>
            <div>
              <input
                className={clsx(styles.input)}
                onClick={() => setShow1(!show1)}
                ref={search}
                value={state}
                onChange={(e) => {
                  setSate(e.target.value);
                }}
                placeholder="Tìm kiếm..."
              />
              {show1 && (
                <ul
                  className={clsx(
                    styles.wrapper2_search__ul,
                    styles.ul,
                    product.length === 0 ? styles.active1 : ""
                  )}
                >
                  {product.map((product, index) => (
                    <li key={index}>
                      <div>
                        <i
                          style={{ marginRight: 16, color: "#555" }}
                          className="fa-solid fa-clock-rotate-left"
                        ></i>
                        {product.state}
                      </div>
                      <p onClick={handleDelete} className={clsx(styles.delete)}>
                        Xóa
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={HandleOnSubmit}>
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div className={clsx(styles.wrapper2_phone)}>
            <img alt="" src={Phone} />
            <div className={clsx(styles.wrapper2_hotline)}>
              <p style={{ fontWeight: 700 }}>Hotline</p>
              <p>0965420922</p>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.top2, styles.devices)}>
        <div className={clsx(styles.wrapper3)}>
          <ul>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    onClick={() => {
                      setType(link.path);
                    }}
                    key={index}
                    className={clsx(
                      styles.wrapper3_link,
                      link.path === type ? styles.active : {}
                    )}
                    // cách 2
                    // style={
                    //   link.path === type ? { backgroundColor: "#f62d3e" } : {}
                    // }
                    to={link.path}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/giohang"
            onClick={() => setType("/giohang")}
            className={clsx(styles.cart)}
          >
            <>
              <span>Giỏ hàng</span>
              <i className="fa-solid fa-cart-shopping"></i>
            </>
            <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
          </Link>
        </div>
      </div>

      {show2 && (
        <div className={clsx(styles.top2)}>
          <div className={clsx(styles.wrapper3)}>
            <ul>
              <li>
                <i
                  onClick={() => setShow2(!show2)}
                  className="fa-solid fa-xmark"
                ></i>
                <img alt="" src={LogoTT} />
              </li>
              {links.map((link, index) => {
                return (
                  <li>
                    <Link
                      onClick={() => {
                        setType(link.path);
                        setShow2(!show2);
                      }}
                      key={index}
                      className={clsx(
                        styles.wrapper3_link,
                        link.path === type ? styles.active : {}
                      )}
                      // cách 2
                      // style={
                      //   link.path === type ? { backgroundColor: "#f62d3e" } : {}
                      // }
                      to={link.path}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/giohang"
              onClick={() => setType("/giohang")}
              className={clsx(styles.cart)}
            >
              <>
                <span>Giỏ hàng</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </>
              <span className={clsx(styles.cartSL)}>{cartItems.length}</span>
            </Link>
          </div>
        </div>
      )}

      {show2 && (
        <div
          onClick={() => {
            setShow2(!show2);
          }}
          className={clsx(styles.model)}
        />
      )}
    </div>
  );
}

export default Header;
