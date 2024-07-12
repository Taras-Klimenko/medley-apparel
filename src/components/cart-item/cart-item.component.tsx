import './cart-item.styles.scss';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

export type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
