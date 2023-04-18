import React, { createContext, useState } from 'react'

export const ShowLoginContext = createContext()
export default function ShowLoginProvider({ children }) {
    const [isShowLogin, setIsShowLogin] = useState(false)

    const showLogin = () => {
        setIsShowLogin(!isShowLogin)
    }

    const valueShowLogin = { isShowLogin, showLogin }
    return (
        <ShowLoginContext.Provider value={valueShowLogin}>
            {children}
        </ShowLoginContext.Provider>
    )
}
