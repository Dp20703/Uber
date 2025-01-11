import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../Context/MainContext'
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    console.log(token)
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token])

    return (
        <>{children}</>
    )
}

export default UserProtectWrapper