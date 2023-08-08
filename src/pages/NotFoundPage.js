import React from 'react';
import { Container } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container className='my-4'>
      <h1>Page Not Found</h1>
      <p>The requested page was not found.</p>
    </Container>
  );
};

export default NotFoundPage;
