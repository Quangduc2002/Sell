import React from 'react';
// import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

function Pagination(props) {
    const { productPerPage, totalProduct, pagination, isActive, handleNext, handlePrevious } = props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleRight = () => {
        if (isActive < pageNumbers.length) {
            handleNext();
        }
    };

    const handleLeft = () => {
        if (isActive > 1) {
            handlePrevious();
        }
    };

    return (
        <ul className={clsx(styles.pagination, pageNumbers.length === 1 ? styles.pagination_active : '')}>
            <button
                onClick={handleLeft}
                className={clsx(styles.pagination_icon, isActive !== 1 ? styles.paginationActive : '')}
            >
                <i className={clsx('fa-solid fa-chevron-left')}></i>
            </button>
            {pageNumbers.map((number, index) => {
                return (
                    <li key={index} className={clsx(styles.pagination_li)}>
                        <button
                            onClick={() => pagination(number)}
                            className={clsx(isActive === number ? styles.active : '', styles.pagination_button)}
                        >
                            {number}
                        </button>
                    </li>
                );
            })}
            <button
                onClick={handleRight}
                className={clsx(styles.pagination_icon, isActive !== pageNumbers.length ? styles.paginationActive : '')}
            >
                <i className={clsx('fa-solid fa-chevron-right')}></i>
            </button>
        </ul>
    );
}

export default Pagination;
