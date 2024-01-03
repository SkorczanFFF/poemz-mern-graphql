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
