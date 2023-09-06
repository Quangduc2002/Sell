import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../Views/App.css';
import HeaderOrder from '../Component/PurchaseOrder/HeaderOrder/HeaderOrder';
import OrderAll from '../Component/PurchaseOrder/OrderAll/OrderAll';
import path from '../Component/Ultis/Path';
import WaitConfirm from '../Component/PurchaseOrder/WaitConfirm/WaitConfirm';
import Finish from '../Component/PurchaseOrder/Finish/Finish';
import Deliver from '../Component/PurchaseOrder/Deliver/Deliver';
import Cancel from '../Component/PurchaseOrder/Cancel/Cancel';

function LayoutOrder(props) {
    const { onAdd, toast } = props;
    return (
        <div className="App" style={{ backgroundColor: '#f5f5f5' }}>
            <HeaderOrder />
            <Routes>
                <Route path={path.LayoutOrderAll} element={<OrderAll onAdd={onAdd} toast={toast} />} />
                <Route path={path.LayoutOrderWaitConfirm} element={<WaitConfirm />} />
                <Route path={path.LayoutOrderFinish} element={<Finish />} />
                <Route path={path.LayoutOrderDeliver} element={<Deliver />} />
                <Route path={path.LayoutOrderCancel} element={<Cancel />} />
            </Routes>
        </div>
    );
}

export default LayoutOrder;
