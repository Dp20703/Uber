import React, { createContext, useState } from 'react'
export const UserDataContext = createContext();


const MainContext = ({ children }) => {
    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
    })
    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )

}
export default MainContext
