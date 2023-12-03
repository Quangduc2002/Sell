import React from 'react';
import { Routes, Route } from 'react-router-dom';
import clsx from 'clsx';
import EnterCode from '../Component/ForgotPassword/EnterCode/EnterCode';
import Recover from '../Component/ForgotPassword/Recover/Recover';
import FindAccounts from '../Component/ForgotPassword/FindAcounts/FindAcounts';
import Login from '../Component/Login/Login';
import path from '../Component/Ultis/Path';
import styles from '../Component/Login/Login.module.scss';
import PasswordNew from '../Component/ForgotPassword/PasswordNew/PasswordNew';

function LayoutLogin(props) {
    const { toast } = props;
    const handleCancel = () => {
        localStorage.removeItem('account');
    };
    return (
        <div className={clsx(styles.nav2)}>
            <Routes>
                <Route path={path.Login} element={<Login toast={toast} />} />
                <Route path={path.EnterCode} element={<EnterCode />} />
                <Route path={path.Recover} element={<Recover handleCancel={handleCancel} />} />
                <Route path={path.FindAccounts} element={<FindAccounts handleCancel={handleCancel} />} />
                <Route path={path.PassWordNew} element={<PasswordNew handleCancel={handleCancel} toast={toast} />} />
            </Routes>
        </div>
    );
}

export default LayoutLogin;
