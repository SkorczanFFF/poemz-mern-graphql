# Poemz Backend

A GraphQL-powered backend service for the Poemz application built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18
- **API**: GraphQL with express-graphql
- **Database**: MongoDB with Mongoose v8
- **Language**: TypeScript v5.2
- **Authentication**: JWT with bcrypt
- **Development**: Nodemon, ts-node

## Features

### API Features

- GraphQL API with queries and mutations
- Real-time data updates
- Efficient data loading with MongoDB
- Error handling and validation
- API documentation via GraphQL Playground

### Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Protected mutations
- Session management
- User authorization

### Database

- MongoDB with Mongoose ODM
- Efficient data modeling
- Relationship handling
- Data validation
- Indexing for performance

### Development

- TypeScript compilation
- Hot reload with nodemon
- Environment configuration
- Logging and debugging
- Seed data generation

## Project Structure

```
src/
├── app.ts              # Application entry point
├── models/             # MongoDB models
│   ├── User.ts
│   ├── Poem.ts
│   └── Comment.ts
├── schema/             # GraphQL schema
│   └── schema.ts
├── resolvers/          # GraphQL resolvers
│   └── resolvers.ts
├── handlers/           # Request handlers
│   └── handlers.ts
├── utils/             # Utility functions
│   ├── auth.ts
│   ├── validation.ts
│   └── errorHandling.ts
└── scripts/           # Utility scripts
    └── seed.ts        # Database seeding
```

## API Documentation

### GraphQL Schema

#### Types

```graphql
type User {
  _id: ID!
  name: String!
  email: String!
  password: String!
}

type Poem {
  _id: ID!
  title: String!
  content: String!
  date: String!
  user: User!
  comments: [Comment!]!
}

type Comment {
  _id: ID!
  text: String!
  date: String!
  user: User!
  poem: Poem!
}
```

#### Queries

```graphql
type Query {
  poems: [Poem!]!
  poem(id: ID!): Poem
  poemOfTheDay: Poem
  topRatedPoems: [Poem!]!
  user(id: ID!): User
  users: [User!]!
}
```

#### Mutations

```graphql
type Mutation {
  createPoem(title: String!, content: String!): Poem!
  updatePoem(id: ID!, title: String!, content: String!): Poem!
  deletePoem(id: ID!): Poem!
  createComment(poemId: ID!, text: String!): Comment!
  deleteComment(id: ID!): Comment!
  register(name: String!, email: String!, password: String!): User!
  login(email: String!, password: String!): User!
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with:

```
MONGODB_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret
```

### Database Setup

To populate the database with sample data:

```bash
npm run seed
```

This will create:

- Sample users with password: "password123"
- Sample poems
- Sample comments

### Development

Run the development server with hot reload:

```bash
npm run dev
```

### Production

Build the TypeScript code:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript code
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)
- `npm run seed` - Populate database with sample data

## Error Handling

The backend implements comprehensive error handling:

- Validation errors
- Authentication errors
- Database errors
- GraphQL errors
- Runtime errors

## Security

Security measures implemented:

- Password hashing
- JWT token validation
- Input sanitization
- Rate limiting (coming soon)
- CORS configuration

## Testing

Coming soon:

- Unit tests with Jest
- Integration tests
- API tests
- Database tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
