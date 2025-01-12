import React, { createContext, useState } from 'react'
export const CaptainDataContext = createContext();
const CaptainContext = ({ Children }) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData)
    }
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }
    return (
        <CaptainDataContext.Provider value={value}>{Children}</CaptainDataContext.Provider>
    )
}

export default CaptainContext