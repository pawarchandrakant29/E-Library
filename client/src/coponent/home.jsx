import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [recentlyReturned, setRecentlyReturned] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books/all');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleEdit = () => {
    if (selectedBook && selectedBook._id) {
      navigate(`/edit/${selectedBook._id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${selectedBook.title}"?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/books/delete/${selectedBook._id}`);
        fetchBooks();
        handleClose();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleBorrow = (book) => {
    setBooks((prev) => prev.filter((b) => b._id !== book._id));
    setRecentlyReturned((prev) => [...prev, { ...book, borrowed: true }]);
  };

  const handleReturn = (book) => {
    setRecentlyReturned((prev) => prev.filter((b) => b._id !== book._id));
    setBooks((prev) => [...prev, { ...book, borrowed: false }]);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecentlyReturned = recentlyReturned.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page ">
      <Container fluid className="banner">
        {/* <img src="https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png" alt="Library Banner" className="w-100 rounded-3" /> */}
        <div className="banner-text ms-5 ps-5">
          <h1>Welcome to My E-library</h1>
          <p>Read & Borrow the old and new books </p>
        </div>
      </Container>

      <Container className="mt-4">
        <Row className="justify-content-between align-items-center">
          <Col md={6}>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3} className="text-end">
            <Link to="/add" className="btn btn-primary add-book-button">
              Add Book
            </Link>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <h2 className="section-title">Books For Reading</h2>
        <Row>
          {filteredBooks.map((book, index) => (
            <Col key={index} xs={12} md={4} lg={3} className="mb-4">
              <Card className="book-card shadow-sm">
                <Card.Img
                  variant="top"
                  src={book.imageUrl}
                  className="book-card-img"
                  alt={book.title}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="text-muted">{book.author}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => handleView(book)}>
                      View
                    </Button>
                    <Button variant="outline-success" onClick={() => handleBorrow(book)}>
                      Borrow
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-3">
        <h2 className="section-title">Borrowed Books</h2>
        <Row>
          {filteredRecentlyReturned.map((book, index) => (
            <Col key={index} xs={12} md={4} lg={3} className="mb-4">
              <Card className="book-card shadow-sm">
                <Card.Img
                  variant="top"
                  src={book.imageUrl}
                  className="book-card-img"
                  alt={book.title}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="text-muted">{book.author}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => handleView(book)}>
                      View
                    </Button>
                    <Button variant="outline-warning" onClick={() => handleReturn(book)}>
                      Return
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {selectedBook && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedBook.imageUrl}
              alt={selectedBook.title}
              className="img-fluid mb-3 rounded"
            />
            <p>
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p>
              <strong>Genre:</strong> {selectedBook.genre}
            </p>
            <p>
              <strong>Publication Year:</strong> 2024
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
