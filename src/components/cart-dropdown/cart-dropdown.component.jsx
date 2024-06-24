import './cart-dropdown.styles.scss';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({isCartOpen}) => {

    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();
    const dropdownRef = useRef();
    
    const onLoseFocusHandler = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setIsCartOpen(false);
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
        navigate('/checkout')
    }

    return <div ref={dropdownRef} className={`${isCartOpen ? 'active' : ''} cart-dropdown-container`}>
        <div className='cart-items'>
            {cartItems.length ? (cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)) : (<span className='empty-cart-message'>Cart is empty</span>) }
        </div>
        <Button onClick={goToCheckoutHandler}>Checkout</Button>
    </div>
}

export default CartDropdown;