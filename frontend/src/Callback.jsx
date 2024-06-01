// Callback.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CAS_SERVER_URL, SERVICE_URL, CAS_REDIRECT_URL } from '../config';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    if (ticket) {
      axios
        .get(`${CAS_SERVER_URL}/serviceValidate`, {
          params: {
            ticket,
            service: SERVICE_URL,
          },
        })
        .then((response) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(response.data, 'text/xml');
          const success = xml.getElementsByTagName('cas:authenticationSuccess').length > 0;

          if (success) {
            const user = xml.getElementsByTagName('cas:user')[0].textContent;
            console.log('Authenticated user:', user);
            navigate(CAS_REDIRECT_URL);
          } else {
            console.error('Authentication failed:', response.data);
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Error validating ticket:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
