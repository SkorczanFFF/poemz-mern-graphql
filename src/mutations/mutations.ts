import { gql } from "@apollo/client";

export const USER_SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export const USER_DELETE = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      email
      name
    }
  }
`;

export const ADD_POEM = gql`
  mutation addPoem(
    $title: String!
    $content: String!
    $date: String!
    $user: ID!
  ) {
    addPoem(title: $title, content: $content, date: $date, user: $user) {
      id
      title
      content
      date
    }
  }
`;

export const UPDATE_POEM = gql`
  mutation updatePoem($id: ID!, $title: String!, $content: String!) {
    updatePoem(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const DELETE_POEM = gql`
  mutation deletePoem($id: ID!) {
    deletePoem(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $date: String!, $user: ID!, $poem: ID!) {
    addComment(text: $text, date: $date, user: $user, poem: $poem) {
      id
      text
      date
      user {
        name
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
