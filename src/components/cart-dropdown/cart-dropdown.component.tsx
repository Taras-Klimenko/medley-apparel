import './cart-dropdown.styles.scss';
import { useEffect, useRef, MutableRefObject, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

export type CartDropdownProps = {
  isCartOpen: boolean;
};

const CartDropdown = ({ isCartOpen }: CartDropdownProps) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const navigate = useNavigate();
  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const onLoseFocusHandler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(setIsCartOpen(false));
      }
    };

    if (isCartOpen) {
      document.addEventListener('click', onLoseFocusHandler);
    } else {
      document.removeEventListener('click', onLoseFocusHandler);
    }

    return () => {
      document.removeEventListener('click', onLoseFocusHandler);
    };
  }, [isCartOpen, dispatch]);

  const goToCheckoutHandler = useCallback(() => {
    dispatch(setIsCartOpen(false));
    navigate('/checkout');
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`${isCartOpen ? 'active' : ''} cart-dropdown-container`}
    >
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-cart-message">Cart is empty</span>
        )}
      </div>
      <span className="dropdown-total">{`Total: $ ${cartTotal}`}</span>
      <Button isLoading={false} onClick={goToCheckoutHandler}>
        Checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
