import React from "react";
import clsx from "clsx";
import styles from "../WorkRoom/WorkRoom.module.scss";
import IconTop from "../IconTop/IconTop";
import AVT1 from "../Image/ban-lam-viec-1.jpg";
import AVT2 from "../Image/ban-lam-viec-2.jpg";
import AVT3 from "../Image/ban-lam-viec-3.jpg";
import AVT4 from "../Image/ban-lam-viec-4.jpg";
import AVT5 from "../Image/ban-lam-viec-5.jpg";
import AVT7 from "../Image/avt7.jpg";
import Product from "../Product/Product";
function WorkRoom(props) {
  const { onAdd } = props;
  const products = [
    {
      id: 11,
      image: AVT1,
      discount: "-8%",
      text: "Bàn làm việc hòa phát HP120HL3CPO",
      originalPrice: "7.150.000 đ",
      sellingPrice: "6.600.000 đ",
    },
    {
      id: 12,
      image: AVT2,
      discount: "-12%",
      text: "Phòng làm việc B1",
      originalPrice: "85.000.000 đ",
      sellingPrice: "72.000.000 đ",
    },
    {
      id: 13,
      image: AVT3,
      discount: "-12%",
      text: "Phòng làm việc B2",
      originalPrice: "7.150.000 đ",
      sellingPrice: "6.600.000 đ",
    },
    {
      id: 14,
      image: AVT4,
      discount: "-10%",
      text: "Phòng làm việc B3",
      originalPrice: "50.000.000 đ",
      sellingPrice: "45.000.000 đ",
    },
    {
      id: 15,
      image: AVT5,
      discount: "-10%",
      text: "Phòng làm việc B4",
      originalPrice: "50.000.000 đ",
      sellingPrice: "45.000.000 đ",
    },
    {
      id: 24,
      image: AVT7,
      discount: "-10%",
      text: "Bàn làm việc",
      originalPrice: "15.000.000 đ",
      sellingPrice: "13.500.000 đ",
    },
  ];
  return (
    <div style={{ backgroundColor: "#ebebeb", paddingBottom: 60 }}>
      <div className={clsx(styles.room1)}>
        <div className={clsx(styles.medium)}>
          <div className={clsx(styles.breadcrumbs)}>
            <p className={clsx(styles.Link)}>Trang chủ</p>
            <span className={clsx(styles.divider)}>/</span>
            <span>Phòng làm việc</span>
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

            <Product key={product.id} onAdd={onAdd} product={product} />
          );
        })}
      </div>

      <IconTop />
    </div>
  );
}

export default WorkRoom;
