import {createContext, useState} from 'react'

import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
    currentProducts: [],
    setCurrentProducts: () => null,
})

export const ProductContextProvider = ({children}) => {

    const [currentProducts, setCurrentProducts] = useState(PRODUCTS);
    const value = {currentProducts}


    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}