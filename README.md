Voici le code du fichier README :


# Reaction Time Tracking API

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Introduction

This project is a RESTful API for tracking user reaction times. The API allows users to submit their reaction times, view their history, and perform role-based access control (admin vs regular users). It is built using Node.js, Express, MongoDB, and JWT-based authentication.

---

## Features

- User registration and authentication (JWT).
- Submit reaction times.
- Retrieve reaction times with filtering and sorting options.
- Role-based access control (admin vs user).
- Input validation with appropriate error handling.
- Unit and integration tests for API endpoints.

---

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Testing:** Jest, Supertest, MongoMemoryServer
- **Validation:** Validator

---

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/reaction-time-api.git
cd reaction-time-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file at the root of the project and add the following variables:

```bash
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/reaction-time-db
PORT=5000
```

> Replace `your_jwt_secret_key` with a secure key for JWT.

---

## Running the Project

1. **Run MongoDB locally:**

If you're running MongoDB locally, ensure that the MongoDB service is running on your machine.

2. **Start the development server:**

```bash
npm run dev
```

The API will be running on `http://localhost:5000`.

---

## API Endpoints

### Authentication

- **POST** `/api/register`: Register a new user
- **POST** `/api/login`: Login with email and password

### Reaction Times

- **POST** `/api/submit-reaction-time`: Submit a new reaction time (Authenticated)
- **GET** `/api/get-reaction-times/:userId`: Get all reaction times for a user (Authenticated and Role-based)

### Example Requests:

#### Register a User

```bash
POST /api/register
{
  "email": "test@example.com",
  "password": "password123",
  "role": 1
}
```

#### Submit Reaction Time

```bash
POST /api/submit-reaction-time
Headers: { Authorization: Bearer <token> }
{
  "time": 123
}
```

#### Get User's Reaction Times

```bash
GET /api/get-reaction-times/:userId
Headers: { Authorization: Bearer <token> }
```

---

## Running Tests

To run the tests for the project:

1. **Run all tests:**

```bash
npm test
```

2. **Test files:**
   - The tests are located in the `tests` folder.
   - Unit tests for user authentication and timer functionalities are included.

---

## Folder Structure

```
reaction-time-api/
├── config/
│          ├── index.html
├── src/
│   ├── controllers/
│          ├── timerController.js
│          ├── userController.js
│   ├── models/
│          ├── timer.js
│          ├── user.js
│   ├── services/
│          ├── authService.js
│          ├── timerService.js
│   ├── utils/
│          ├── validator.js
│   ├── middleware/
│          ├── authMiddleware.js
│   ├── routes/
│          ├── timerRoutes.js
│          ├── userRoutes.js
│   ├── index.js
├── tests/
│   ├── userController.test.js
│   ├── timerController.test.js
├── .env
├── Dockerfile
├── docker-compose.yml
├── .package-lock.json
├── package.json
├── README.md
```

- **`controllers/`**: Contains route handler logic.
- **`models/`**: Mongoose models for User and Timer.
- **`services/`**: Business logic for user registration, login, and timer submissions.
- **`utils/`**: Utility functions like input validation.
- **`tests/`**: Unit and integration tests for the API.

---

## License

This project is licensed under the MIT License.
```

This markdown file includes all the essential sections and commands to set up, run, and test your application. You can modify it further to suit your project's specific needs.
