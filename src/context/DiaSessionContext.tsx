'use client'

import {createContext, useContext, useState} from 'react'

type DiaSessionContextType = {
    sessionId: number | undefined
    setSessionId: (id: number | undefined) => void
    diaDate: Date
    setDiaDate: (date: Date) => void
}

const DiaSessionContext = createContext<DiaSessionContextType | undefined>(undefined)

export const DiaSessionProvider = ({children}: { children: React.ReactNode }) => {
    const [sessionId, setSessionId] = useState<number | undefined>(undefined);
    const [diaDate, setDiaDate] = useState<Date>(new Date());

    return (
        <DiaSessionContext.Provider value={{sessionId, setSessionId, diaDate, setDiaDate}}>
            {children}
        </DiaSessionContext.Provider>
    )
}

export const useDiaSession = () => {
    const context = useContext(DiaSessionContext);
    if (!context) throw new Error('useDiaSession must be used within DiaSessionProvider')
    return context;
}
