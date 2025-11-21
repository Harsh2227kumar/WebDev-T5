const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Serve static files from public/
app.use(express.static('public'));

// 🔥 Default route (serve HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'books-manager.html'));
});

// In-memory storage for books
let books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

let nextId = 4;

// Routes
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });

  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Book deleted successfully', book: deletedBook });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Books API server is running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /books       - List all books`);
  console.log(`  GET    /books/:id   - Get a single book`);
  console.log(`  POST   /books       - Add a new book`);
  console.log(`  PUT    /books/:id   - Update a book`);
  console.log(`  DELETE /books/:id   - Delete a book`);
});

