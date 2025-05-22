# Poemz Backend

GraphQL API for the Poemz application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
```

3. Start development server:

```bash
npm run dev
```

The GraphQL playground will be available at http://localhost:5000/graphql

## API Schema

The API provides the following types:

- User (register, login, delete account)
- Poem (create, read, update, delete)
- Comment (add, delete)

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm start` - Run production build
