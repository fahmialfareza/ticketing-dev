import { useState, FormEvent, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewTicket() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [doRequest, errors] = useRequest({
    url: '/api/tickets',
    method: 'post',
    data: { title, price },
  });

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.message));
    }
  }, [errors]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const newTicket = await doRequest();

    Router.push('/');
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <ToastContainer />
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
