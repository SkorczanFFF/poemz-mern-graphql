export interface User {
  _id: string;
  name: string;
  email: string;
  poems: Poem[];
  comments: Comment[];
}

export interface Poem {
  _id: string;
  title: string;
  content: string;
  date: string;
  user: User;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  text: string;
  date: string;
  poem: Poem;
  user: User;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface PoemState {
  poems: Poem[];
  currentPoem: Poem | null;
  loading: boolean;
  error: string | null;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
}

export interface PoemInput {
  title: string;
  content: string;
}

export interface CommentInput {
  text: string;
  poemId: string;
}
