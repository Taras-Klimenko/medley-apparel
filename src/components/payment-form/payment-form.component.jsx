import {useState} from 'react';
import {useSelector} from 'react-redux';

import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector'
import './payment-form.styles.scss'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Button from '../button/button.component';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async(event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post', 
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify({amount: amount * 100})}).then(response => response.json());

        const {paymentIntent: {client_secret}} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {card: elements.getElement(CardElement), billing_details: {name: currentUser ? currentUser.displayName : 'guest'}}
        })

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
            }
        }


    }

    return(
        <div className='payment-form-container'>
            <form className='payment-form' onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement/>
                <Button isLoading={isProcessingPayment} buttonType='inverted'>Pay</Button>
            </form>
        </div>
    )
}

export default PaymentForm;