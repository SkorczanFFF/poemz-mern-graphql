# Poemz - MERN Stack Poetry Application

A full-stack web application for creating and sharing poems, built with the MERN stack (MongoDB, Express.js, React, Node.js) and GraphQL.

## Project Overview

Poemz is a modern poetry platform that allows users to create, share, and interact with poetry. The application features a GraphQL API backend and a React-based frontend with Material-UI components, offering a seamless and responsive user experience.

## Key Features

- **User Authentication**

  - Secure login and registration
  - JWT-based authentication
  - Protected routes and actions

- **Poetry Management**

  - Create, read, update, and delete poems
  - Rich text formatting
  - Poem of the day feature
  - Top rated poems showcase

- **Social Features**

  - Comment on poems
  - User profiles
  - Author attribution

- **Modern UI/UX**
  - Responsive Material-UI design
  - Dark/Light theme support
  - Loading states and transitions
  - Error handling and feedback

## Architecture

The project is split into two main parts:

- **Backend (`/poemz-backend`)**

  - Node.js/Express.js server
  - GraphQL API with express-graphql
  - MongoDB with Mongoose
  - TypeScript implementation
  - JWT Authentication

- **Frontend (`/poemz-frontend`)**
  - React with TypeScript
  - Apollo Client for GraphQL
  - Redux Toolkit for state management
  - Material-UI components
  - React Router for navigation
  - React Hook Form for form handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/poemz-mern-graphql.git
cd poemz-mern-graphql
```

2. Install backend dependencies:

```bash
cd poemz-backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../poemz-frontend
npm install
```

4. Set up environment variables:

Backend (`.env` in `/poemz-backend`):

```
MONGODB_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret
```

Frontend (`.env` in `/poemz-frontend`):

```
REACT_APP_API_URL=http://localhost:4000/graphql
```

### Running the Application

1. Start the backend server:

```bash
cd poemz-backend
npm run dev
```

2. Start the frontend development server:

```bash
cd poemz-frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- GraphQL Playground: http://localhost:4000/graphql

## Project Structure

```
poemz-mern-graphql/
├── poemz-backend/        # Backend server
│   ├── src/
│   │   ├── models/      # MongoDB models
│   │   ├── schema/      # GraphQL schema
│   │   ├── resolvers/   # GraphQL resolvers
│   │   └── utils/       # Helper functions
│   └── package.json
│
└── poemz-frontend/      # Frontend application
    ├── src/
    │   ├── components/  # React components
    │   ├── store/       # Redux store
    │   ├── queries/     # GraphQL queries
    │   ├── mutations/   # GraphQL mutations
    │   └── styles/      # Theme and styles
    └── package.json
```

## Development

For detailed development information:

- [Backend Documentation](./poemz-backend/README.md)
- [Frontend Documentation](./poemz-frontend/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- MongoDB for the database
- Apollo Client for GraphQL integration
- Material-UI for the component library
