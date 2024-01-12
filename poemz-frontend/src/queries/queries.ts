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
