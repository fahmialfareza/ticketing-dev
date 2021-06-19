import { NextPage } from 'next';
import buildClient from '../api/build-client';

interface Props {
  data: {
    currentUser: {
      id: string;
      email: string;
    };
  };
}

const LandingPage: NextPage<Props> = ({ data }) => {
  return data?.currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return { data };
};

export default LandingPage;
