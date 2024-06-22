import {createContext, useState, useEffect} from 'react'
import {onAuthStateChangedListener} from '../utils/firebase/firebase.utils'


// as the actual value of context
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserContextProvider = ({children}) => {

    useEffect(()=>{
       const unsubscribe = onAuthStateChangedListener((user) => {
        setCurrentUser(user)
        console.log(user)
       })

        return unsubscribe;

    },[])


    
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}