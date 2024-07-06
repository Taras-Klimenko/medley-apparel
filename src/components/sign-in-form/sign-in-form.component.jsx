import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {googleSignInStart, emailSignInStart} from '../../store/user/user.action'
import {selectCurrentUser} from '../../store/user/user.selector'

import './sign-in-form.styles.scss'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};




const SignInForm = () => {

    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() =>{
        if(currentUser?.id) {
            navigate('/home');
        }
    }, [currentUser])
    

    const signInWithGoogle = async() => {
        dispatch(googleSignInStart())
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const clearFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            clearFormFields();
            navigate('/home')
        }
        catch(error) {
            console.error('User sign in failed', error)
        }
    }


    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput required type="email" name="email" id="email" value={email} onChange={handleChange} label="Email"/>
                <FormInput required type="password" name="password" id="password" value={password} onChange={handleChange} label="Password"/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>)
}

export default SignInForm