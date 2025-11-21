# 📚 Books REST API - Task 3

A simple Node.js + Express REST API for managing a collection of books with full CRUD operations. Data is stored in-memory (no database required).

## 🎯 Project Overview

This project demonstrates the implementation of RESTful API endpoints for managing books. It includes:
- **Backend**: Node.js Express server with REST API endpoints
- **Frontend**: HTML/CSS/JavaScript GUI for testing and managing books
- **Testing**: Postman collection for API testing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A web browser
- Postman (optional, for API testing)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```



   The server will run on `http://localhost:3000`

4. **Open the GUI**
   - Open `books-manager.html` in your web browser
   - The GUI will automatically connect to `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/books` | Get all books | None |
| `GET` | `/books/:id` | Get a single book by ID | None |
| `POST` | `/books` | Add a new book | `{ "title": "string", "author": "string" }` |
| `PUT` | `/books/:id` | Update a book by ID | `{ "title": "string", "author": "string" }` |
| `DELETE` | `/books/:id` | Delete a book by ID | None |

### Book Object Structure
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

## 💻 Usage Examples

### Using cURL (Command Line)

**Get all books:**
```bash
curl http://localhost:3000/books
```

**Get a single book:**
```bash
curl http://localhost:3000/books/1
```

**Add a new book:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell"}'
```

**Update a book:**
```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"1984 (Updated Edition)"}'
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:3000/books/1
```

### Using PowerShell

**Get all books:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/books
```

**Add a new book:**
```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3000/books `
  -ContentType "application/json" `
  -Body '{"title":"Dune","author":"Frank Herbert"}'
```

**Update a book:**
```powershell
Invoke-RestMethod -Method PUT -Uri http://localhost:3000/books/1 `
  -ContentType "application/json" `
  -Body '{"title":"1984 (Updated)"}'
```

**Delete a book:**
```powershell
Invoke-RestMethod -Method DELETE -Uri http://localhost:3000/books/2
```

## 🖥️ Web GUI Features

The included HTML GUI (`books-manager.html`) provides:

- ✅ **View all books** in a responsive grid layout
- ✅ **Add new books** via modal form (POST)
- ✅ **Edit existing books** with pre-filled data (PUT)
- ✅ **Delete books** with confirmation dialog (DELETE)
- ✅ **Refresh data** from API (GET)
- ✅ **Visual feedback** showing HTTP methods and endpoints
- ✅ **Error handling** with clear messages
- ✅ **JSON preview** of book objects
- ✅ **Configurable API URL** for different environments

### Using the GUI

1. Ensure the Express server is running
2. Open `books-manager.html` in your browser
3. Click "Add Book (POST)" to create a new book
4. Use "Edit (PUT)" button on any book card to modify it
5. Use "Delete (DELETE)" button to remove a book
6. Click "Refresh (GET)" to reload data from the server

## 🧪 Testing with Postman

A Postman collection is included: `postman_collection_books_api.json`

### Import Collection

1. Open Postman
2. Click "Import" button
3. Select `postman_collection_books_api.json`
4. The collection includes all 5 endpoints

### Collection Variables

- `baseUrl`: Default is `http://localhost:3000`
- Update this variable if your server runs on a different port

### Available Requests

1. **GET All Books** - Retrieves all books
2. **GET Single Book** - Gets book by ID (change :id parameter)
3. **POST Add Book** - Creates a new book
4. **PUT Update Book** - Updates existing book (change :id parameter)
5. **DELETE Remove Book** - Deletes a book (change :id parameter)

## 📂 Project Structure

```
books-api/
├── server.js                          # Express server with API endpoints
├── package.json                       # Project dependencies
├── books-manager.html                 # Web GUI for managing books
├── postman_collection_books_api.json  # Postman testing collection
└── README.md                          # This file
```

## 🔧 Configuration

### Change Server Port

Edit `server.js` and modify the port:
```javascript
const PORT = 3000; // Change to your desired port
```

### Change API URL in GUI

1. Open the GUI in browser
2. Update the "API Base URL" field in the header
3. Or edit `books-manager.html` and change the default:
```javascript
<input type="text" id="apiUrl" value="http://localhost:3000">
```

## ⚠️ Important Notes

### In-Memory Storage

- Data is stored in memory (JavaScript array)
- **All data is lost when the server restarts**
- This is intentional for learning purposes
- No database or file system persistence

### CORS (Cross-Origin Resource Sharing)

If you encounter CORS errors when using the GUI, ensure your Express server has CORS enabled:

```javascript
const cors = require('cors');
app.use(cors());
```

## 📋 Response Examples

### Success Response (GET /books)
```json
[
  {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee"
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell"
  }
]
```

### Success Response (POST /books)
```json
{
  "id": 3,
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger"
}
```

### Error Response
```json
{
  "error": "Book not found"
}
```

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Try a different port or kill the process using port 3000

### GUI shows connection error
- Verify the Express server is running
- Check the API URL in the GUI matches your server address
- Check browser console for detailed error messages

### Postman requests fail
- Ensure `Content-Type: application/json` header is set for POST/PUT
- Verify the request body is valid JSON
- Check the `baseUrl` variable in Postman

### Books disappear after server restart
- This is expected behavior (in-memory storage)
- Data is not persisted to disk or database

## 🎓 Learning Objectives

This project demonstrates:

1. ✅ Setting up a Node.js Express server
2. ✅ Implementing RESTful API endpoints
3. ✅ Handling HTTP methods (GET, POST, PUT, DELETE)
4. ✅ Working with request/response objects
5. ✅ JSON data handling
6. ✅ In-memory data storage
7. ✅ API testing with Postman
8. ✅ Building a frontend interface for API interaction
9. ✅ Error handling and validation

## 🔗 Resources

- [Express.js Documentation](https://expressjs.com/)
- [REST API Tutorial](https://restfulapi.net/)
- [Postman Documentation](https://learning.postman.com/)
- [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

## 📝 License

This project is for educational purposes as part of Task 3.

## 👤 Author

Created for Task 3: REST API to Manage Books using Node.js and Express

---

**Happy Coding! 🚀**