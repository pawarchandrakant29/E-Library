import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Dark theme styles

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      setMessage(response.data.message);

      // Save token and update authentication state
      localStorage.setItem('token', response.data.token);
      setIsAuth(true);

      // Navigate to homepage after successful login
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <Container className="auth-container">
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center">Log In</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Log In
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </Container>
  );
};

export default Login;
