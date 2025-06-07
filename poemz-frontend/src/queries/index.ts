import { gql } from "@apollo/client";

export const GET_POEMS = gql`
  query GetPoems {
    poems {
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

export const GET_POEM = gql`
  query GetPoem($id: ID!) {
    poem(id: $id) {
      _id
      title
      content
      date
      user {
        _id
        name
      }
      comments {
        _id
        text
        date
        user {
          _id
          name
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      _id
      name
      email
      poems {
        _id
        title
        content
        date
        comments {
          _id
        }
      }
      comments {
        _id
        text
        date
        poem {
          _id
          title
        }
      }
    }
  }
`;

export const GET_RANDOM_POEM = gql`
  query GetRandomPoem {
    randomPoem {
      _id
      title
      content
      date
      user {
        _id
        name
      }
      comments {
        _id
        text
        date
        user {
          _id
          name
        }
      }
    }
  }
`;

export const GET_POEM_OF_THE_DAY = gql`
  query GetPoemOfTheDay {
    poemOfTheDay {
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

export const GET_TOP_RATED_POEMS = gql`
  query GetTopRatedPoems {
    topRatedPoems {
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
