import React from 'react';
// import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

function Pagination(props) {
    const { productPerPage, totalProduct, pagination, isActive } = props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className={clsx(styles.pagination)}>
                {pageNumbers.map((number, index) => {
                    return (
                        <li className={clsx(styles.pagination_li)}>
                            <button
                                key={index}
                                onClick={() => pagination(number)}
                                className={clsx(isActive === number ? styles.active : '')}
                            >
                                {number}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Pagination;
