import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps, AppContext } from 'next/app';
import buildClient from '../api/build-client';
import Header from '../components/header';

interface Props extends AppProps {
  currentUser: {
    id: string;
    email: string;
  };
}

function MyApp({ Component, pageProps, currentUser }: Props) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
