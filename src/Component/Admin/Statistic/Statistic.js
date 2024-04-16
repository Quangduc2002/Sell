import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import 'chart.js/auto';
import styles from './Statistic.module.scss';
import { axiosPost, fetchUser } from '../../../services/UseServices';
import Pagination from '../../Pagination/Pagination';
import CountUp from 'react-countup';
import Bars from '../Bars/Bars';

function Statistic(props) {
    const {
        indexOfLastProduct,
        indeOfFirstProduct,
        productPerPage,
        pagination,
        isActive,
        handleNext,
        handlePrevious,
        setMenu,
        menu,
    } = props;
    const [listStatistic, setListStatistic] = useState([]);
    const [bill, setBill] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [statusWait, setStatusWait] = useState([]);
    const [methodStatistic, setMethodStatistic] = useState('');
    const [month, setMonth] = useState('');
    const [precious, setPrecious] = useState('');
    const [year, setYear] = useState('');
    const [chartStatistics, setChartStatistics] = useState([]);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    // curDate sẽ lưu trữ thời gian hiện tại
    var curDate = new Date();
    // Lấy năm hiện tại
    var curYear = curDate.getFullYear();

    const Months = [];
    for (let Month = 1; Month <= 12; Month++) {
        Months.push(Month);
    }

    const Years = [];
    for (let Year = curYear; Year >= 1990; Year--) {
        Years.push(Year);
    }

    const data = {
        labels: Months.map((month) => `Tháng ${month}`),
        datasets: [
            {
                label: 'Tổng tiền',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: chartStatistics.map((chartStatistic) => chartStatistic.total),
            },
        ],
    };

    useEffect(() => {
        getStatistic();
        getBill();
        getIncome();
        getCustomer();
        getChartStatistic();
        getStatusWait();
        // bỏ warning React Hook useEffect has a missing dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatistic = async () => {
        let res = await axiosPost('/products/statistic', { methodStatistic: methodStatistic });
        setListStatistic(res.data);
    };

    const getChartStatistic = async () => {
        let res = await axiosPost('/products/chartStatistic', {
            year: year,
        });
        setChartStatistics(res.data);
    };

    const getCustomer = async () => {
        let res = await fetchUser('user/Customer');
        setCustomers(res.data);
    };

    const getBill = async () => {
        let res = await fetchUser('/order/bill');
        setTimeout(() => setBill(res.data), 500);
    };

    const getIncome = async () => {
        let res = await fetchUser('/order/income');
        setTimeout(() => setIncomes(res.data), 500);
    };

    const getStatusWait = async () => {
        let res = await fetchUser('/products/statistic/status');
        setTimeout(() => setStatusWait(res.data), 500);
    };

    const currentListStatistic = listStatistic.slice(indeOfFirstProduct, indexOfLastProduct);

    // thống kê tổng tiền
    let income = 0;
    for (let i = 0; i < incomes.length; i++) {
        income += incomes[i].OrderItems.donGia;
    }

    const handleStatistics = () => {
        axiosPost('/products/statistic', {
            methodStatistic: methodStatistic,
            month: month,
            year: year,
            precious: precious,
        })
            .then((res) => {
                setListStatistic(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChartStatistics = () => {
        axiosPost('/products/chartStatistic', {
            year: year,
        })
            .then((res) => {
                setChartStatistics(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={clsx(styles.revenue, 'xs:w-full md:w-[80%]')}>
            <Bars setMenu={setMenu} menu={menu} />

            <motion.div
                initial={{ y: '4rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    type: spring,
                }}
            >
                <div
                    className={clsx(
                        styles.revenue_card,
                        'grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 flex-row gap-4 flex-wrap ',
                    )}
                >
                    <div className={clsx(styles.revenue_card__body)}>
                        <div>
                            <p className={clsx(styles.revenue_card__title)}>Thu nhập</p>
                            <CountUp
                                start={0}
                                end={income}
                                suffix=" VND"
                                className={clsx(styles.revenue_card__number)}
                            ></CountUp>
                        </div>
                        <div>
                            <i className="fa-solid fa-calendar" style={{ color: '#6777ef' }}></i>
                        </div>
                    </div>

                    <div className={clsx(styles.revenue_card__body)}>
                        <div>
                            <p className={clsx(styles.revenue_card__title)}>Bán hàng</p>
                            <CountUp start={0} end={bill} className={clsx(styles.revenue_card__number)}></CountUp>
                        </div>
                        <div>
                            <i style={{ color: '#66bb6a' }} className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>

                    <div className={clsx(styles.revenue_card__body)}>
                        <div>
                            <p className={clsx(styles.revenue_card__title)}>Khách hàng</p>
                            <CountUp
                                start={0}
                                end={customers.length}
                                className={clsx(styles.revenue_card__number)}
                            ></CountUp>
                        </div>
                        <div>
                            <i style={{ color: '#3abaf4' }} className="fa-solid fa-users"></i>
                        </div>
                    </div>

                    <div className={clsx(styles.revenue_card__body)}>
                        <div>
                            <p className={clsx(styles.revenue_card__title)}>Chờ giải quyết</p>
                            <CountUp start={0} end={statusWait} className={clsx(styles.revenue_card__number)}></CountUp>
                        </div>
                        <div>
                            <i style={{ color: '#ffa426' }} className="fa-solid fa-comments"></i>
                        </div>
                    </div>
                </div>

                <div className={clsx(styles.revenue__PD, 'overflow-hidden overflow-x-scroll')}>
                    <div>
                        <div className="flex gap-3 my-6">
                            <select
                                onChange={(e) => setYear(e.target.value)}
                                className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                            >
                                <option className="hidden">--Chọn hành động--</option>
                                {Years.map((Year, index) => (
                                    <option key={index} value={Year}>
                                        {Year}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleChartStatistics}
                                className=" rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]"
                            >
                                Thống kê
                            </button>
                        </div>
                        <Line className="w-full mb-10" data={data} />
                    </div>

                    <div className="my-5 ">
                        <div>
                            <p>Chọn phương thức thống kê:</p>
                            <div className="flex justify-between flex-wrap gap-3 mt-2">
                                <div className="flex flex-wrap gap-3 ">
                                    <select
                                        onChange={(e) => setMethodStatistic(e.target.value)}
                                        className="py-2 px-2 xxs:w-auto xs:w-full  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                    >
                                        <option className="hidden">--Chọn hành động--</option>
                                        <option value={'Sản phẩm đã bán theo quý'}>Sản phẩm đã bán theo quý</option>
                                        <option value={'Sản phẩm đã bán trong tháng'}>
                                            Sản phẩm đã bán trong tháng
                                        </option>
                                    </select>
                                    <button
                                        onClick={handleStatistics}
                                        className="lg:block xs:hidden rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]"
                                    >
                                        Thống kê
                                    </button>
                                </div>

                                {methodStatistic === 'Sản phẩm đã bán trong tháng' ? (
                                    <div className="flex gap-3 flex-wrap">
                                        <select
                                            onChange={(e) => setMonth(e.target.value)}
                                            className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                        >
                                            <option className="hidden">Chọn tháng</option>
                                            {Months.map((month, index) => (
                                                <option key={index} value={month}>
                                                    tháng {month}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            onChange={(e) => setYear(e.target.value)}
                                            className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                        >
                                            <option className="hidden">Chọn năm</option>
                                            {Years.map((Year, index) => (
                                                <option key={index} value={Year}>
                                                    {Year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : methodStatistic === 'Sản phẩm đã bán theo quý' ? (
                                    <div className="flex gap-3 flex-wrap">
                                        <select
                                            onChange={(e) => setPrecious(e.target.value)}
                                            className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                        >
                                            <option className="hidden">Chọn quý</option>
                                            <option value={1}>Qúy 1</option>
                                            <option value={2}>Qúy 2</option>
                                            <option value={3}>Qúy 3</option>
                                            <option value={4}>Qúy 4</option>
                                        </select>
                                        <select
                                            onChange={(e) => setYear(e.target.value)}
                                            className="py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm "
                                        >
                                            <option className="hidden">Chọn năm</option>
                                            {Years.map((Year, index) => (
                                                <option key={index} value={Year}>
                                                    {Year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleStatistics}
                                className="mt-2 xs:block lg:hidden rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]"
                            >
                                Thống kê
                            </button>
                        </div>
                    </div>

                    {currentListStatistic.length === 0 ? (
                        <div>
                            <p className="w-auto mx-auto py-3 md:text-xl xs:text-sm rounded-md text-red-500 font-semibold bg-orange-200 text-center">
                                Sản phẩm thống kê không tồn tại
                            </p>
                        </div>
                    ) : (
                        <table className={clsx(styles.table, 'border-collapse p-2 border w-[1070px]')}>
                            <thead className="border-collapse p-2">
                                <tr className="border-collapse p-2 ">
                                    <th className="bg-[#ddd]  border-collapse p-2 text-center">STT</th>
                                    <th className="bg-[#ddd]  text-left border-collapse p-2">Tên sản phẩm</th>
                                    <th className="bg-[#ddd]  border-collapse p-2 text-center">Ảnh</th>
                                    <th className="bg-[#ddd]  border-collapse p-2 text-center">Kích thước</th>
                                    <th className="bg-[#ddd]  border-collapse p-2 text-center">Số lượng</th>
                                    <th className="bg-[#ddd]  border-collapse p-2 text-center">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentListStatistic.map((order, index) => {
                                    return (
                                        <tr key={order.ID} className="border-collapse p-2 border">
                                            <td className="border-collapse p-2 text-center">{index + 1}</td>
                                            <td className="border-collapse p-2">{order.tenSp}</td>
                                            <td className="border-collapse p-2 ">
                                                <img
                                                    className={clsx(styles.table_image, 'mx-auto')}
                                                    src={`http://localhost:3000/Image/${order.image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td className="border-collapse p-2 text-center">{order.kichThuoc}</td>
                                            <td className="border-collapse p-2 text-center">{order.totalQuantity}</td>
                                            <td className="border-collapse p-2 text-center">
                                                {VND.format(order.donGia * order.totalQuantity)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                    {currentListStatistic.length > 0 && (
                        <Pagination
                            productPerPage={productPerPage}
                            pagination={pagination}
                            totalProduct={listStatistic.length}
                            isActive={isActive}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default Statistic;
