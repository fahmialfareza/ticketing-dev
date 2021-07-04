import { useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  ticket: {
    title: string;
    price: number;
    userId: string;
    version: number;
    id: string;
  };
}

/* @ts-ignore */
const TicketShow: NextPage<Props> = ({ ticket }) => {
  const [doRequest, errors] = useRequest({
    url: '/api/orders',
    method: 'post',
    data: { ticketId: ticket.id },
  });

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.message));
    }
  }, [errors]);

  const onPurchase = async () => {
    const order = await doRequest();

    Router.push(`/orders/${order.id}`);
  };

  return (
    <div>
      <ToastContainer />
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      <button onClick={onPurchase} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

/* @ts-ignore */
TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
