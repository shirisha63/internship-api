# Internship Board REST API

A REST API built using Node.js, Express.js, and SQLite to manage internship records.

## Technologies Used

* Node.js
* Express.js
* SQLite
* better-sqlite3
* CORS

## Installation

1. Clone the repository.
2. Open the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

Server runs at:

http://localhost:5000

## Database Setup

Run the seed file to insert sample internship records:

```bash
node seed.js
```

## API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /                | Check API status     |
| POST   | /internships     | Create internship    |
| GET    | /internships     | Get all internships  |
| GET    | /internships/:id | Get internship by ID |
| PUT    | /internships/:id | Update internship    |
| DELETE | /internships/:id | Delete internship    |

## Pagination

Example:

```text
GET /internships?page=1&limit=5
```

## Sample POST Request

```json
{
  "title": "Frontend Developer Intern",
  "company": "ABC Technologies",
  "location": "Hyderabad",
  "description": "Develop web applications",
  "stipend": "10000"
}
```

## Features

* Create, read, update, and delete internships.
* SQLite persistent database.
* Input validation.
* Pagination.
* Parameterized SQL queries.
* Sample seed data.
