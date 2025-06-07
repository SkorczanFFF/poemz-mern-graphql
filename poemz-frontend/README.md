# Poemz Frontend

A modern React-based frontend for the Poemz application, built with TypeScript and Material-UI.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **API Client**: Apollo Client for GraphQL
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Forms**: React Hook Form v7
- **Type Checking**: TypeScript v4.9

## Features

### User Interface

- Responsive Material-UI design
- Dark/Light theme support
- Custom theme configuration
- Loading states with skeleton placeholders
- Error boundaries and error handling
- Toast notifications (coming soon)

### Authentication

- User registration with validation
- Secure login system
- Protected routes
- User session management
- Profile management

### Poetry Features

- View all poems with pagination
- Poem of the day showcase
- Top rated poems section
- Create new poems with rich text
- Edit and delete own poems
- Comment system on poems
- Author attribution

### Navigation

- Header with dynamic navigation
- Active tab tracking
- User menu with profile access
- Responsive mobile menu
- 404 page handling

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Header/          # Navigation components
│   ├── Poems/           # Poetry-related components
│   ├── Layout/          # Layout components
│   └── Common/          # Shared components
├── store/               # Redux store configuration
│   └── slices/          # Redux slices
├── queries/             # GraphQL queries
├── mutations/           # GraphQL mutations
├── types/               # TypeScript type definitions
├── styles/              # Global styles and theme
└── utils/              # Helper functions
```

## Component Library

### Layout Components

- `Layout`: Main layout wrapper
- `Header`: Navigation bar with user menu
- `Footer`: Application footer
- `NotFound`: 404 error page

### Authentication Components

- `Login`: User login form
- `Register`: User registration form
- `ProtectedRoute`: Route guard component

### Poetry Components

- `PoemList`: Grid view of all poems
- `PoemDetail`: Single poem view with comments
- `AddPoem`: Poem creation form
- `EditPoem`: Poem editing form
- `PoemOfTheDay`: Featured poem component
- `TopRatedPoems`: Top poems showcase

### Common Components

- `LoadingSkeleton`: Loading placeholder
- `ErrorBoundary`: Error handling wrapper
- `AlertDialog`: Confirmation dialogs
- `CommentSection`: Reusable comments

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:4000/graphql
```

### Development

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

Create a production build:

```bash
npm run build
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## State Management

The application uses Redux Toolkit for state management:

### Store Structure

- `auth`: Authentication state
- `poems`: Poetry-related state
- `ui`: UI-related state (theme, notifications)

### Redux Slices

- `authSlice`: User authentication
- `poemSlice`: Poetry management
- `uiSlice`: UI state management

## GraphQL Integration

### Queries

- `GET_POEMS`: Fetch all poems
- `GET_POEM`: Fetch single poem
- `GET_POEM_OF_THE_DAY`: Fetch featured poem
- `GET_TOP_RATED_POEMS`: Fetch top poems

### Mutations

- `CREATE_POEM`: Create new poem
- `UPDATE_POEM`: Update existing poem
- `DELETE_POEM`: Delete poem
- `CREATE_COMMENT`: Add comment
- `DELETE_COMMENT`: Remove comment

## Styling

The application uses Material-UI's styling solution with:

- Custom theme configuration
- Responsive design utilities
- CSS-in-JS with emotion
- Global style overrides
- Component-specific styles

## Testing

Coming soon:

- Unit tests with Jest
- Component tests with React Testing Library
- Integration tests
- E2E tests with Cypress

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
