import { NextPage } from 'next';

interface Props {
  orders: [
    {
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
    }
  ];
}

/* @ts-ignore */
const OrderIndex: NextPage<Props> = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

/* @ts-ignore */
OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
