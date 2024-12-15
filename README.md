# E-Library Application

## Overview
The E-Library Application provides users with a platform to browse, borrow, and manage digital books. It is designed to support individuals, libraries, and educational institutions with an easy-to-use interface and robust features.

---

## Features

- **Book Management**:
  - Add, edit, and delete books with metadata (title, author, genre, etc.).
  - Upload book covers and digital copies (PDFs, ePubs).
- **User Roles**:
  - Admin: Manage books, users, and borrowing permissions.
  - User: Browse, borrow, and return books.
- **Search and Filter**:
  - Search books by title, author, or genre.
  - Filter books by availability or categories.
- **Responsive Design**:
  - Optimized for desktop, tablet, and mobile devices.

---

## Technology Stack

- **Frontend**:
  - Framework: React.js
  - Styling: Tailwind CSS

- **Backend**:
  - Framework: Node.js with Express.js
  - Database: MongoDB
---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pawarchandrakant29/E-Library.git
   cd E-Library
   ```

2. Install dependencies for the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Include the following variables:
     ```env
     PORT=3000
     DATABASE_URL=your_connection_string
     ```

4. Run the application:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

5. Open the app in your browser at `http://localhost:5173`.

---
