import { Fragment, useContext} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {signOutUser} from '../../utils/firebase/firebase.utils';


import {ReactComponent as MedleyLogo} from '../../assets/medley-logo.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss'

import {UserContext} from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {

  const {currentUser} = useContext(UserContext)
  const {isCartOpen } = useContext(CartContext)

    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'><MedleyLogo className='logo'/></Link>
          
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>SHOP</Link>
            {
              currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
            }
            <CartIcon />
          </div>
          <CartDropdown isCartOpen={isCartOpen}/> 
        </div>
        <Outlet />
      </Fragment>
    );
  };

export default Navigation;