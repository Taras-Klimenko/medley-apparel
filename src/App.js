import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUserSession } from './store/user/user.action';

import ScrollToTop from './utils/utility-components/scrollToTop.utils';
import Spinner from './components/spinner/spinner.component';

const WelcomePage = lazy(() =>
  import('./routes/welcome-page/welcome-page.component')
);
const Home = lazy(() => import('./routes/home/home.component'));
const Navigation = lazy(() =>
  import('./routes/navigation/navigation.component')
);
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={Spinner}>
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
    </Suspense>
  );
};

export default App;
