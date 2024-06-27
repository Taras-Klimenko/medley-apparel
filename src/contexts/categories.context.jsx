import {createContext, useState, useEffect} from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'



export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesContextProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect( ()=> {
        const getGategoriesMap = async () => { 
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }

        getGategoriesMap();
    }, [] )

    const value = {categoriesMap}


    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}