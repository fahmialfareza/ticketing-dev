import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default function SignOut() {
  const [doRequest] = useRequest({
    url: '/api/users/signout',
    method: 'post',
    data: {},
  });

  useEffect(() => {
    doRequest();

    Router.push('/');
  }, []);

  return <div>Signing you out....</div>;
}
