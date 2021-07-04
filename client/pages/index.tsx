import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
  currentUser: {
    id: string;
    email: string;
  };
  tickets: [
    {
      title: string;
      price: number;
      userId: string;
      version: number;
      id: string;
    }
  ];
}

/* @ts-ignore */
const LandingPage: NextPage<Props> = ({ currentUser, tickets }) => {
  const ticketList = tickets?.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

/* @ts-ignore */
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
