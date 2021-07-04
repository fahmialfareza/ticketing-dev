import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  order: {
    id: string;
    userId: string;
    status: string;
    expiresAt: Date;
    ticket: {
      id: string;
      price: number;
      title: string;
      version: number;
    };
    version: number;
  };
  currentUser: {
    id: string;
    email: string;
  };
}

/* @ts-ignore */
const OrderShow: NextPage<Props> = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [doRequest, errors] = useRequest({
    url: '/api/payments',
    method: 'post',
    data: { orderId: order.id },
  });

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.message));
    }
  }, [errors]);

  useEffect(() => {
    const findTimeLeft = () => {
      // @ts-ignore
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      <ToastContainer />
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={async ({ id }) => {
          await doRequest({ token: id });

          Router.push('/orders');
        }}
        stripeKey="pk_test_51J91oyBDfZWKEAxo1YaaALMAJI9CsfbVMRe4uHmb0hDOhbCwPBCNaas779V1vYuZR2phqFPVSXlCebWSffm1Qs5G009saiTO6l"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

/* @ts-ignore */
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
