# Stock Management REST API

This is a robust RESTful API for managing stock, built with the MEN (MongoDB, Express.js, Node.js) stack. It provides endpoints for authentication, managing products, categories, stock movements, and generating reports. The API is designed to be scalable and easy to integrate with various frontend applications.

## Features

-   **User Authentication & Authorization:** Secure user registration, login, and protected routes using JWT.
-   **Product Management:** Create, read, update, and delete products.
-   **Category Management:** Organize products into categories.
-   **Stock Movement Tracking:** Record and manage incoming and outgoing stock (e.g., purchases, sales, transfers).
-   **Reporting:** Generate reports on stock levels and movements.
-   **Health Check:** Endpoint to monitor API status.
-   **API Documentation:** Integrated Swagger UI for interactive API exploration.

## Tech Stack

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web application framework for Node.js.
-   **MongoDB:** NoSQL database for flexible data storage.
-   **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **JWT (JSON Web Tokens):** For secure authentication and authorization.
-   **Bcrypt.js:** For hashing passwords.
-   **Swagger UI & JSDoc:** For automatic API documentation.

## Project Structure

```
.env.example                 # Example environment variables file
.gitignore                   # Specifies intentionally untracked files to ignore
docker-compose.yml           # Docker Compose configuration for multi-container Docker applications
Dockerfile                   # Dockerfile for building the application image
index.js                     # Main application entry point
package.json                 # Project dependencies and scripts
README.md                    # Project README file
src/
├── app.js                   # Express application setup and middleware
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── swagger.js           # Swagger documentation configuration
├── controllers/             # Business logic for handling requests (e.g., auth, product, category)
├── middlewares/             # Express middleware (e.g., authentication, error handling)
│   └── auth.middleware.js   # JWT authentication middleware
├── models/                  # Mongoose schemas and models for data representation
│   ├── category.model.js    # Category schema
│   ├── product.model.js     # Product schema
│   ├── stockMovement.model.js # Stock Movement schema
│   └── user.model.js        # User schema
├── routes/                  # API routes definitions
│   ├── auth.routes.js       # Authentication routes
│   ├── category.routes.js   # Category routes
│   ├── health.routes.js     # Health check route
│   ├── product.routes.js    # Product routes
│   ├── report.routes.js     # Report generation routes
│   └── stockMovement.routes.js # Stock Movement routes
├── services/                # (Potentially) Business logic for complex operations (currently empty)
└── utils/                   # Utility functions (currently empty)
```

## Quick Start Guide

Follow these steps to get the Stock Management REST API up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (comes with Node.js)
-   MongoDB installed and running, or access to a MongoDB Atlas instance.
-   Docker and Docker Compose (optional, for containerized deployment)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mibienpanjoe/stock-management-api.git
    cd stock-management-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create and configure `.env` file:**

    Create a `.env` file in the root directory by copying the `.env.example` file and filling in your details:

    ```bash
    cp .env.example .env
    ```

    Open `.env` and set the following variables:

    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/stock_management_db  # Your MongoDB connection string
    JWT_SECRET=your_super_secret_jwt_key                       # A strong, unique secret key for JWT
    ```

### Running the Application

#### Locally

To start the application in development mode (with `nodemon` for auto-reloading):

```bash
npm run dev
```

Or, to start in production mode:

```bash
npm start
```

The API will be running at `http://localhost:PORT` (default is `http://localhost:3000`).
API documentation will be available at `http://localhost:PORT/api-docs`.

#### Using Docker (Recommended)

Ensure Docker and Docker Compose are installed and running.

1.  **Build and run the Docker containers:**

    ```bash
    docker-compose up --build
    ```

    This will build the Docker image for the API and start both the API and MongoDB containers.

2.  **Access the API:**

    The API will be available at `http://localhost:PORT`.
    API documentation will be available at `http://localhost:PORT/api-docs`.

## API Endpoints (via Swagger)

Once the application is running, navigate to `http://localhost:PORT/api-docs` in your browser to explore all available API endpoints, their expected request/response formats, and try them out interactively.
