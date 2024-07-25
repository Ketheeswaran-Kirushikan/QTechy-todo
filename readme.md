# Todo List Application

## Description
This is a Todo List Application built with React and Node.js. It allows users to register, login, create, update, delete, and search for tasks. The application also supports marking tasks as complete.

## Features
- User Registration
- User Login
- Create Todo Items
- Update Todo Items
- Delete Todo Items
- Mark Todo Items as Complete
- Search Todo Items
- Responsive Design

## Technologies Used
- Frontend: React, Tailwind CSS, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- Authentication: JSON Web Tokens (JWT)
- Notifications: React Toastify

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance running

### Backend Setup


1. Install backend dependencies:
    ```sh
    cd server
    npm install
    ```

2. Create a `.env` file in the `server` directory and add your MongoDB URI and JWT secret:
    ```plaintext
    MONGO_DB=<your-mongo-db-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

3. Start the backend server:
    ```sh
    nodemon index.js
    ```

### Frontend Setup
1. Navigate to the `client` directory and install frontend dependencies:
    ```sh
    cd ../client
    npm install
    ```

2. Start the frontend server:
    ```sh
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or login with an existing account.
3. Create, update, delete, and mark tasks as complete using the interface.

## Project Structure

