import './cart-dropdown.styles.scss';
import {useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {setIsCartOpen} from '../../store/cart/cart.action'
import {selectCartItems, selectCartTotal} from '../../store/cart/cart.selector'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({isCartOpen}) => {

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const navigate = useNavigate();
    const dropdownRef = useRef();
    
    const onLoseFocusHandler = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
            dispatch(setIsCartOpen(false));
        }
    }

    useEffect(() => {
        if(isCartOpen) {
            document.addEventListener('click', onLoseFocusHandler)
        } else {
            document.removeEventListener('click', onLoseFocusHandler)
        }

        return () => {
            document.removeEventListener('click', onLoseFocusHandler)
        }

    }, [isCartOpen])

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(false));
        navigate('/checkout')
    }

    return <div ref={dropdownRef} className={`${isCartOpen ? 'active' : ''} cart-dropdown-container`}>
        <div className='cart-items'>
            {cartItems.length ? (cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)) : (<span className='empty-cart-message'>Cart is empty</span>) }
        </div>
        <span className='dropdown-total'>{`Total: $ ${cartTotal}`}</span>
        <Button onClick={goToCheckoutHandler}>Checkout</Button>
    </div>
}

export default CartDropdown;