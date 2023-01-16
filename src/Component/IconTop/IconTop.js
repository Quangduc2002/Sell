import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Top.module.scss";

function IconTop() {
  const [goToTop, setGoToTop] = useState(false);
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 150) {
        setGoToTop(true);
      } else {
        setGoToTop(false);
      }

      //setGoToTop(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);

    //cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    goToTop && (
      <div className={clsx(styles.icon)}>
        <button onClick={handleScrollTop}>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </div>
    )
  );
}

export default IconTop;
