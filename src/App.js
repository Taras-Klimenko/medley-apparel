import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUserSession } from './store/user/user.action';

import ScrollToTop from './utils/utility-components/scrollToTop.utils';

import WelcomePage from './routes/welcome-page/welcome-page.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<WelcomePage />}></Route>
        <Route path="/" element={<Navigation />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="auth" element={<Authentication />}></Route>
          <Route path="shop/*" element={<Shop />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

export default App;
