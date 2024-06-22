import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({isCartOpen}) => {

    const {cartItems} = useContext(CartContext);

    return <div className={`${isCartOpen ? 'active' : ''} cart-dropdown-container`}>
        <div className='cart-items'>
            {cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)}
        </div>
        <Button>Checkout</Button>
    </div>
}

export default CartDropdown;