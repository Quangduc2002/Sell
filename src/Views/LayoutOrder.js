import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Views/App.css';
import HeaderOrder from '../Component/PurchaseOrder/HeaderOrder/HeaderOrder';
import OrderAll from '../Component/PurchaseOrder/OrderAll/OrderAll';
import path from '../Component/Ultis/Path';
import WaitConfirm from '../Component/PurchaseOrder/WaitConfirm/WaitConfirm';
import Finish from '../Component/PurchaseOrder/Finish/Finish';
import Deliver from '../Component/PurchaseOrder/Deliver/Deliver';
import Cancel from '../Component/PurchaseOrder/Cancel/Cancel';
import { UserContext } from '../Context/UserContext';

function LayoutOrder(props) {
    const { onAdd, toast } = props;
    const [checkStar, setCheckStar] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const handleStar = (numberRating, orderID, productID) => {
        setCheckStar([...checkStar, { numberRating, orderID, productID }]);
        if (checkStar.length !== 0) {
            for (let i = 0; i < checkStar.length; i++) {
                if (checkStar[i].orderID === orderID) {
                    setCheckStar([
                        ...checkStar.filter((check) => check.orderID !== orderID),
                        { numberRating, orderID, productID },
                    ]);
                }
            }
        }
    };

    if (show === true || show1 === true) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
    if (Object.entries(user.account).length !== 0 && user.isAuthenticated === true) {
        return (
            <div className="App" style={{ backgroundColor: '#f5f5f5' }}>
                <HeaderOrder />
                <Routes>
                    <Route
                        path={path.LayoutOrderAll}
                        element={
                            <OrderAll
                                onAdd={onAdd}
                                toast={toast}
                                handleStar={handleStar}
                                setCheckStar={setCheckStar}
                                checkStar={checkStar}
                                show={show}
                                setShow={setShow}
                                show1={show1}
                                setShow1={setShow1}
                            />
                        }
                    />
                    <Route path={path.LayoutOrderWaitConfirm} element={<WaitConfirm />} />
                    <Route
                        path={path.LayoutOrderFinish}
                        element={
                            <Finish
                                toast={toast}
                                handleStar={handleStar}
                                setCheckStar={setCheckStar}
                                checkStar={checkStar}
                                show={show}
                                setShow={setShow}
                                show1={show1}
                                setShow1={setShow1}
                            />
                        }
                    />
                    <Route path={path.LayoutOrderDeliver} element={<Deliver />} />
                    <Route path={path.LayoutOrderCancel} element={<Cancel />} />
                </Routes>
            </div>
        );
    } else {
        return navigate('/Login');
    }
}

export default LayoutOrder;
