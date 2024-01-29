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
      title
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addCommentToPoem(
    $text: String!
    $date: String!
    $user: ID!
    $poem: ID!
  ) {
    addCommentToPoem(text: $text, date: $date, user: $user, poem: $poem) {
      text
      user {
        name
        id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      text
    }
  }
`;
