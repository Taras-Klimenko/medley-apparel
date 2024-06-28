import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import {useDispatch, useSelector} from 'react-redux'

import {setIsCartOpen} from '../../store/cart/cart.action'
import {selectIsCartOpen, selectCartCount} from '../../store/cart/cart.selector'

import './cart-icon.styles.scss';

const CartIcon = () => {

    const dispatch = useDispatch();

    const cartItemCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = (event) => {
        event.stopPropagation();
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>{cartItemCount}</span>
        </div>
    )
}

export default CartIcon;