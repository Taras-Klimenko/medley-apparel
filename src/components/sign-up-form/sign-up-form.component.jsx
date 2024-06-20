import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    
    const clearFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            const userDocRef = await createUserDocumentFromAuth(response.user, {displayName})
            clearFormFields();
        }
        catch(error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account yet?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput required type="text" name="displayName" id="displayName" value={displayName} onChange={handleChange} label="Display Name"/>
                <FormInput required type="email" name="email" id="email" value={email} onChange={handleChange} label="Email"/>
                <FormInput required type="password" name="password" id="password" value={password} onChange={handleChange} label="Password"/>
                <FormInput required type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password"/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;