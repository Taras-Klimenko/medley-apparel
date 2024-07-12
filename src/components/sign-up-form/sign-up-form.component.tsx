import { useState, FormEvent, ChangeEvent } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';

import './sign-up-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      clearFormFields();
      navigate('/home');
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert(
          'Cannot create account - user with this email already registered'
        );
      } else {
        console.log('An error occured while creating account', error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account yet?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="text"
          name="displayName"
          id="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
        />
        <FormInput
          required
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          label="Email"
        />
        <FormInput
          required
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          label="Password"
        />
        <FormInput
          required
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
        />
        <Button isLoading={false} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
