import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const CREATE_POEM = gql`
  mutation CreatePoem($title: String!, $content: String!) {
    createPoem(title: $title, content: $content) {
      _id
      title
      content
      date
      user {
        _id
        name
      }
    }
  }
`;

export const UPDATE_POEM = gql`
  mutation UpdatePoem($id: ID!, $title: String!, $content: String!) {
    updatePoem(id: $id, title: $title, content: $content) {
      _id
      title
      content
      date
      user {
        _id
        name
      }
    }
  }
`;

export const DELETE_POEM = gql`
  mutation DeletePoem($id: ID!) {
    deletePoem(id: $id) {
      _id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($poemId: ID!, $text: String!) {
    createComment(poemId: $poemId, text: $text) {
      _id
      text
      date
      user {
        _id
        name
      }
      poem {
        _id
        title
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      _id
    }
  }
`;
