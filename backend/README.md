# Startup Backend

A Node.js backend application with MySQL database integration.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=startup_db
```

3. Create MySQL database:
```sql
CREATE DATABASE startup_db;
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Main application file
│   ├── config/           # Configuration files
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   └── middleware/       # Custom middleware
├── .env                  # Environment variables
├── package.json
└── README.md
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm test`: Run tests (to be implemented) 