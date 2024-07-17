import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';

import './checkout-item.styles.scss';

export type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem = memo(({ cartItem }: CheckoutItemProps) => {
  const dispatch = useDispatch();

  const { name, imageUrl, price, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow controls" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow controls" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">$ {price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        <i className="fa-regular fa-trash-can controls"></i>
      </div>
    </div>
  );
});

export default CheckoutItem;
