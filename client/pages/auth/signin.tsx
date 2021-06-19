import { FormEvent, useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors] = useRequest({
    url: '/api/users/signin',
    method: 'post',
    data: {
      email,
      password,
    },
  });

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.message));
    }
  }, [errors]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await doRequest();

    Router.push('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <ToastContainer />
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
}
