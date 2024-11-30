import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const newBook = { title, author, genre, imageUrl };

    try {
      const response = await fetch('http://localhost:3000/api/books/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Book added successfully!');
        setTitle('');
        setAuthor('');
        setGenre('');
        setImageUrl('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.message || 'Failed to add the book.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="add-book-container pt-120">
      <h2 className="text-center text-light">Add New Book</h2>
      {message && <Alert variant="success" className="alert-message">{message}</Alert>}
      {error && <Alert variant="danger" className="alert-message">{error}</Alert>}
      <Form style={{ width: '100%', maxWidth: '500px' }} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label className="text-light">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicAuthor">
          <Form.Label className="text-light">Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicGenre">
          <Form.Label className="text-light">Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicImageUrl">
          <Form.Label className="text-light">Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100 add-book-button mt-3" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Add Book'}
        </Button>
      </Form>

      <p className="text-center mt-4 text-light">
        Go back to <a href="/" className="text-decoration-none text-info">Books List</a>
      </p>
    </Container>
  );
};

export default AddBook;
