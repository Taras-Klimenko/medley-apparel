import { useEffect } from 'react';
import { getRedirectResult} from 'firebase/auth'
import {auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    useEffect(() =>{
        async function fetchRedirectResults() {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }}
    fetchRedirectResults();
    },[])


    return (
        <div>
            <h1>Sign IN</h1>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default SignIn;