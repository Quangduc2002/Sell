import React, { createContext, useEffect, useState } from 'react';
import { fetchUser } from '../services/UseServices';
const UserContext = createContext(null);

function UserProvider({ children }) {
    const userDefault = {
        isAuthenticated: false,
        account: {},
    };
    const [user, setUser] = useState(userDefault);

    const loginConText = (userData) => {
        setUser({ ...userData, isAuthenticated: true });
    };

    const logoutConText = () => {
        setUser({ ...userDefault });
    };

    useEffect(() => {
        if (window.location.pathname !== '/Login') {
            getUserAccounts();
        }
        // bỏ warning React Hook useEffect has a missing dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserAccounts = async () => {
        let res = await fetchUser('/user/account');
        if (res && res.data && res.data.errCode === 0) {
            //lấy tên người dùng
            let roles = res.data.DT.roles;
            let token = res.data.DT.access_token;
            let getUser = res.data.DT.getUser;
            let data = {
                account: { roles, token, getUser },
                isAuthenticated: true,
            };
            setUser(data);
        } else if (res.response.data.EC !== 0) {
            setUser({ ...userDefault });
        }
    };

    return <UserContext.Provider value={{ user, loginConText, logoutConText }}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
