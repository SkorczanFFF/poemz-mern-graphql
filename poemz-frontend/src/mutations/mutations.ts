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
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      email
      name
    }
  }
`;
