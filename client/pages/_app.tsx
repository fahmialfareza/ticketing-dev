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
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    /* @ts-ignore */
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      /* @ts-ignore */
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
