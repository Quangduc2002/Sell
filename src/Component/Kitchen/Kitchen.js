import React from "react";
import clsx from "clsx";
import styles from "../Kitchen/Kitchen.module.scss";
import IconTop from "../IconTop/IconTop";
import AVT1 from "../Image/ban-ghe-an-1.jpg";
import AVT2 from "../Image/ban-ghe-an-2.jpg";
import AVT3 from "../Image/ban-ghe-an-3.jpg";
import Product from "../Product/Product";

function Kitchen(props) {
  const products = [
    {
      id: 8,
      image: AVT1,
      discount: "-50%",
      text: "Bàn ghế ăn mã XBA186",
      originalPrice: "22.000.000 đ",
      sellingPrice: "11.000.000 đ",
    },

    {
      id: 9,
      image: AVT2,
      discount: "-10%",
      text: "Bàn ghế ăn mã XBA185",
      originalPrice: "11.000.000 đ",
      sellingPrice: "9.900.000 đ",
    },
    {
      id: 10,
      image: AVT3,
      discount: "-25%",
      text: "Bàn ghế ăn mã XBA188",
      originalPrice: "44.000.000 đ",
      sellingPrice: " 33.000.000 đ",
    },
  ];
  const { onAdd } = props;
  return (
    <div style={{ backgroundColor: "#ebebeb", paddingBottom: 60 }}>
      <div className={clsx(styles.room1)}>
        <div className={clsx(styles.medium)}>
          <div className={clsx(styles.breadcrumbs)}>
            <p className={clsx(styles.Link)}>Trang chủ</p>
            <span className={clsx(styles.divider)}>/</span>
            <span>Phòng bếp</span>
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

export default Kitchen;
