const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for books
let books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

let nextId = 4;

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id - Get a single book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  
  const newBook = {
    id: nextId++,
    title,
    author
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  // Update only provided fields
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;
  
  res.json(books[bookIndex]);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Book deleted successfully', book: deletedBook });
});

// Start server
app.listen(PORT, () => {
  console.log(`Books API server is running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /books       - List all books`);
  console.log(`  GET    /books/:id   - Get a single book`);
  console.log(`  POST   /books       - Add a new book`);
  console.log(`  PUT    /books/:id   - Update a book`);
  console.log(`  DELETE /books/:id   - Delete a book`);
});