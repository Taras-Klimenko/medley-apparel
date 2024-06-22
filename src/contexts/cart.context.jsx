import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartItemCount : 0,
})


export const CartContextProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(()=>{
        const newCartItemCount = cartItems.reduce((total, cartItem) => total += cartItem.quantity, 0);
        setCartItemCount(newCartItemCount);
        console.log(cartItemCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount}

    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}