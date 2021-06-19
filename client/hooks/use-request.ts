import axios, { AxiosRequestConfig, Method } from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Errors {
  message: string;
  field?: string;
}

export default function UseRequest({
  url,
  method,
  data,
}: AxiosRequestConfig): [doRequest: () => Promise<any>, errors: Array<Errors>] {
  const [errors, setErrors] = useState<Array<Errors>>([]);

  const doRequest = async () => {
    setErrors([]);
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors);
      throw error;
    }
  };

  return [doRequest, errors];
}
