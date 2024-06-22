import {useState, useEffect} from 'react';
import { getRedirectResult} from 'firebase/auth'
import {auth, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {



    useEffect(() =>{
        async function fetchRedirectResults() {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }}
    fetchRedirectResults();
    },[])

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
            await signInUserWithEmailAndPassword(email, password)
            clearFormFields();
        }
        catch(error) {
            console.error(error)
            switch(error.code){
                case 'auth/invalid-credential':
                    alert('Wrong email or password');
                    break;
                default:
                    console.log(error)
            }

            
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
                    <Button type="button" buttonType='google' onClick={signInWithGoogleRedirect}>Google Sign in</Button>
                </div>
            </form>
        </div>)
}

export default SignInForm