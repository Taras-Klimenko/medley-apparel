import { Fragment, useContext} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import {signOutUser} from '../../utils/firebase/firebase.utils';


import {ReactComponent as MedleyLogo} from '../../assets/medley-logo.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss'

import {useSelector} from 'react-redux'
import {selectCurrentUser} from '../../store/user/user.selector'
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);

  const {isCartOpen } = useContext(CartContext)
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOutUser();
    navigate('/');
  }

    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/home'><MedleyLogo className='logo'/></Link>
          
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>SHOP</Link>
            {
              currentUser ? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
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