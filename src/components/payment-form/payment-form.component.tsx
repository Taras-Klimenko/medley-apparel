import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { StripeCardElement } from '@stripe/stripe-js';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import './payment-form.styles.scss';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const isValidCardElement = (
    card: StripeCardElement | null
  ): card is StripeCardElement => card !== null;

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((response) => response.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!isValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'guest',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful');
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form" onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement
          options={{
            style: {
              base: {
                color: 'rgb(120, 120, 120)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '18px',
              },
            },
          }}
        />
        <Button
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
