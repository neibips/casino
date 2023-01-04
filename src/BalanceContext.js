import {createContext, useState} from 'react';

const BalanceContext = createContext(() => 0);

export function BalanceProvider({children}){

    const [balance, setBalance] = useState(0)

    const updateBalance = (value) => {
        setBalance(value)
    }

    return(
        <BalanceContext.Provider value={{balance, updateBalance}}>{children}</BalanceContext.Provider>
    )
}

export default BalanceContext;
