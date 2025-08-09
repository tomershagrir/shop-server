# Shop Server

A simple shop API built with NestJS, Mongoose, MongoDB, and Redis.

## Features

- Product management
- Shopping cart functionality
- Order processing
- Redis caching
- Swagger API documentation

## Prerequisites

- Node.js 14 or higher
- MongoDB
- Redis
- Docker and Docker Compose (for containerized setup)

## Running with Docker

The application can be run using Docker and Docker Compose, which will set up the application, MongoDB, and Redis in containers.

### Build and start the containers

```bash
docker-compose up -d
```

This will start the following services:
- The shop API on port 3001
- MongoDB on port 27017
- Redis on port 6379

### Stop the containers

```bash
docker-compose down
```

### Stop the containers and remove volumes

```bash
docker-compose down -v
```

## Running without Docker

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and configure your environment variables

### Start the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## Database Management

### Seed the database with sample products

```bash
npm run seed
```

This will add 15 sample products with random online images from Unsplash.

### List all products in the database

```bash
npm run list
```

### Clear all products from the database

```bash
npm run clear
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3001/api
```

The API specification is also saved to `apidoc-spec.json` when the application starts.