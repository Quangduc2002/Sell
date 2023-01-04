import React from "react";
import clsx from "clsx";
import styles from "../LivingRoom/LivingRoom.module.scss";
import IconTop from "../IconTop/IconTop";
import Product from "../Product/Product";
import AVT1 from "../Image/sofa-1.jpg";
import AVT2 from "../Image/avt2.jpg";
import AVT3 from "../Image/sofa-2.jpg";
import AVT4 from "../Image/sofa-3.jpg";
import AVT5 from "../Image/sofa-4.jpg";
import AVT6 from "../Image/sofa-5.jpg";
import AVT7 from "../Image/avt9.jpg";

function LivingRoom(props) {
  const { onAdd } = props;
  const products = [
    {
      id: 1,
      image: AVT1,
      discount: "-30%",
      text: "Sofa bộ Hugo 8979",
      originalPrice: "77.000.000 đ",
      sellingPrice: "53.900.000 đ",
    },
    {
      id: 2,
      image: AVT2,
      discount: "-20%",
      text: "Kệ Tivi",
      originalPrice: "15.000.000 đ",
      sellingPrice: "12.000.000 đ",
    },
    {
      id: 3,
      image: AVT3,
      discount: "-17%",
      text: "Sofa da mã NTX1824",
      originalPrice: "26.250.000 đ",
      sellingPrice: " 21.735.000 đ",
    },
    {
      id: 4,
      image: AVT4,
      discount: "-29%",
      text: "Sofa Da MLEH-740L",
      originalPrice: "89.250.000 đ",
      sellingPrice: "63.735.000 đ",
    },
    {
      id: 5,
      image: AVT5,
      discount: "-23%",
      text: "Bộ Sofa Da Nỉ 9230",
      originalPrice: "42.000.000 đ",
      sellingPrice: "32.235.000 đ",
    },
    {
      id: 6,
      image: AVT6,
      discount: "-28%",
      text: "Sofa Giường 215 – 10",
      originalPrice: "73.500.000 đ",
      sellingPrice: "53.235.000 đ",
    },
    {
      id: 7,
      image: AVT7,
      discount: "0%",
      text: "Ghế ba thành",
      originalPrice: "",
      sellingPrice: "27.000.000 đ",
    },
  ];
  return (
    <div style={{ backgroundColor: "#f8f9fb", paddingBottom: 60 }}>
      <div className={clsx(styles.room1)}>
        <div className={clsx(styles.medium)}>
          <div className={clsx(styles.breadcrumbs)}>
            <p className={clsx(styles.Link)}>Trang chủ</p>
            <span className={clsx(styles.divider)}>/</span>
            <span>Phòng Khách</span>
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
            // <div key={product.id1} className={clsx(styles.room_product1)}>
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
            //     <button onClick={() => onAdd(products)}>Thêm vào giỏ</button>
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

export default LivingRoom;
