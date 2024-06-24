import {createContext, useState, useEffect} from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesContextProvider = ({children}) => {

    const [categoriesMap, setCategoriesMap] = useState({});
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])
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