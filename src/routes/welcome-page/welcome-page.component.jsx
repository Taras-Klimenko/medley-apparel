import './welcome-page.styles.scss'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button.component'

import { UserContext } from '../../contexts/user.context';

const WelcomePage = () => {

    const {currentUser} = useContext(UserContext);


    return (
        <section id='welcome-page'>
            <div className="video-container">
                <video autoPlay loop muted >
                    <source src='./assets/cloth-selection-compressed.mp4'/>
                </video>
            </div>
            <div className="video-overlay">
                <div>
                    <h1 className='welcome-title'>Medley Apparel</h1>
                    <p className='welcome-subtitle'>You'll find something to your taste here</p>
                </div>
                <div className='welcome-buttons-container'>
                    {currentUser ? (<></>) : (<Link to='/auth'><Button buttonType='inverted'>Sign In</Button></Link>)}
                    <Link to='/home'><Button buttonType='inverted'>Shop</Button></Link>
                </div>
            </div>
        </section>
    )
}

export default WelcomePage;