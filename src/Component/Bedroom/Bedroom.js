import React from "react";
import clsx from "clsx";
import IconTop from "../IconTop/IconTop";
import styles from "../Bedroom/Bedroom.module.scss";
import AVT1 from "../Image/avt4.1.jpg";
import AVT2 from "../Image/avt4.jpg";
import AVT3 from "../Image/avt6.jpg";
import AVT4 from "../Image/avt10.jpg";
import AVT5 from "../Image/avt11.jpg";
import Product from "../Product/Product";
function Bedroom(props) {
  const { onAdd } = props;
  const products = [
    {
      id: 16,
      image: AVT1,
      discount: "0%",
      text: "Bàn trang điểm",
      originalPrice: "",
      sellingPrice: "12.000.000 đ",
    },
    {
      id: 17,
      image: AVT2,
      discount: "0%",
      text: "Bàn trang điểm PU",
      originalPrice: "",
      sellingPrice: "14.000.000 đ",
    },
    {
      id: 18,
      image: AVT3,
      discount: "0%",
      text: "Giường hoàng gia",
      originalPrice: "",
      sellingPrice: " 21.000.000 đ",
    },
    {
      id: 19,
      image: AVT4,
      discount: "0%",
      text: "Giường PU",
      originalPrice: "",
      sellingPrice: "17.000.000 đ",
    },
    {
      id: 20,
      image: AVT5,
      discount: "0%",
      text: "Giường chữ X",
      originalPrice: "",
      sellingPrice: "18.000.000 đ",
    },
  ];
  return (
    <div style={{ backgroundColor: "#ebebeb", paddingBottom: 60 }}>
      <div className={clsx(styles.room1)}>
        <div className={clsx(styles.medium)}>
          <div className={clsx(styles.breadcrumbs)}>
            <p className={clsx(styles.Link)}>Trang chủ</p>
            <span className={clsx(styles.divider)}>/</span>
            <span>Phòng ngủ</span>
          </div>

          <ul>
            <select className={clsx(styles.select)}>
              <option value="0">Thứ tự theo mức độ phổ biến</option>
              <option value="1">Thứ tự theo điểm đánh giá</option>
              <option value="2" selected="selected">
                Mới nhất
              </option>
              <option value="3">Thứ tự theo giá: thấp đến cao</option>
              <option value="4">Thứ tự theo giá: cao đến thấp</option>
            </select>
          </ul>
        </div>
      </div>
      <div className={clsx(styles.room_product)}>
        {products.map((product) => {
          return (
            // <div key={index} className={clsx(styles.room_product1)}>
            //   <div className={clsx(styles.room_image)}>
            //     <div className={clsx(styles.room_badge)}>
            //       <img alt="" src={product.image} />
            //       <span className={clsx(styles.room_pos)}>
            //         {product.discount}
            //       </span>
            //     </div>
            //   </div>
            //   <div className={clsx(styles.room_text)}>
            //     <p>{product.text}</p>
            //     <div className={clsx(styles.room_price)}>
            //       <span className={clsx(styles.priceAmount)}>
            //         {product.originalPrice}
            //       </span>
            //       <span className={clsx(styles.priceRed)}>
            //         {product.sellingPrice}
            //       </span>
            //     </div>
            //     <button>Thêm vào giỏ</button>
            //   </div>
            // </div>

            <Product key={product.id} product={product} onAdd={onAdd} />
          );
        })}
      </div>
      <IconTop />
    </div>
  );
}

export default Bedroom;
