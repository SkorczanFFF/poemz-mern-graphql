# Poemz - MERN GraphQL Application

A full-stack application for sharing and discovering poems with GraphQL API.

## Prerequisites

- Node.js (v14 or newer)
- MongoDB (local or Atlas)

## Setup and Running

### 1. Clone the repository

```bash
git clone <repository-url>
cd poemz-mern-graphql
```

### 2. Backend Setup

```bash
cd poemz-backend

# Install dependencies
npm install

# Create .env file with the following content
echo "PORT=5000
MONGODB_URI=<your-mongodb-connection-string>" > .env

# Start development server
npm run dev
```

The GraphQL server will be running at http://localhost:5000/graphql

### 3. Frontend Setup

```bash
cd poemz-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend application will be available at http://localhost:3000

## Features

- User authentication (signup, login)
- Create, update, and delete poems
- Comment on poems
- View random poems
- User profiles with their poems

## Tech Stack

- **Frontend**: React, Apollo Client, Material UI, Redux Toolkit
- **Backend**: Node.js, Express, GraphQL, Mongoose
- **Database**: MongoDB
