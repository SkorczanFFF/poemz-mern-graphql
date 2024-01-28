import { gql } from "@apollo/client";

export const GET_POEMS = gql`
  {
    poems {
      id
      title
      date
      content
      user {
        name
      }
    }
  }
`;

export const GET_RANDOM_POEM = gql`
  {
    randomPoem {
      id
      title
      date
      content
      user {
        name
      }
    }
  }
`;

export const GET_USER_POEMS = gql`
  query user($id: ID!) {
    user(id: $id) {
      poems {
        title
        content
        date
      }
    }
  }
`;

export const GET_POEM_BY_ID = gql`
  query poem($id: ID!) {
    poem(id: $id) {
      title
      content
      date
      user {
        name
        email
      }
      comments {
        text
        user {
          name
        }
      }
    }
  }
`;
