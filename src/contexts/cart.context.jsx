import { createContext, useState, useEffect, useReducer } from "react";


import {createAction} from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if (existingCartItem.quantity === 1) {
       return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity -1} : cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartItemCount : 0,
    cartTotal: 0,
})

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'

}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartItemCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state, ...payload};

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload}

        default: 
        throw new Error(`Unhandled action type: ${type} in Cart Reducer`)
    }
}


export const CartContextProvider = ({children}) => {

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartItemCount, setCartItemCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(()=>{
    //     const newCartItemCount = cartItems.reduce((total, cartItem) => total += cartItem.quantity, 0);
    //     setCartItemCount(newCartItemCount);
    // }, [cartItems])

    // useEffect(()=>{
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total += (cartItem.quantity * cartItem.price), 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems])

    const [{cartItems, cartItemCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartReducer = (newCartItems) => {

        const newCartItemCount = newCartItems.reduce((total, cartItem) => total += cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total += (cartItem.quantity * cartItem.price), 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
            {cartItems: newCartItems, cartItemCount: newCartItemCount, cartTotal: newCartTotal}))
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartReducer(newCartItems);
    }


    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartItemCount, cartTotal}

    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}