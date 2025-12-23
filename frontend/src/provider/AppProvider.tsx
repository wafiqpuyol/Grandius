import { createContext, useContext } from 'react'

const AppContext = createContext({});

export const AppProvider = () => {

    return (
        // <AppContext.Provider></AppContext.Provider>
        <></>
    )
}

export const useAppContext = () => useContext(AppContext);