import './welcome-page.styles.scss';
import { Link } from 'react-router-dom';
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

const WelcomePage = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <section id="welcome-page">
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="./assets/cloth-selection-compressed.mp4" />
        </video>
      </div>
      <div className="video-overlay">
        <div>
          <h1 className="welcome-title">Medley Apparel</h1>
          <p className="welcome-subtitle">
            You'll find something to your taste here
          </p>
        </div>
        <div className="welcome-buttons-container">
          {currentUser ? (
            <></>
          ) : (
            <Link to="/auth">
              <Button
                isLoading={false}
                buttonType={BUTTON_TYPE_CLASSES.inverted}
              >
                Sign In
              </Button>
            </Link>
          )}
          <Link to="/home">
            <Button isLoading={false} buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Shop
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
