import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql/type";
import Poem from "../models/Poem";
import Comment from "../models/Comment";
import User from "../models/User";

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    poems: {
      type: GraphQLList(PoemType),
      async resolve(parent) {
        return await Poem.find({ user: parent.id });
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      async resolve(parent) {
        return await Comment.find({ user: parent.id });
      },
    },
  }),
});

export const PoemType = new GraphQLObjectType({
  name: "PoemType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      async resolve(parent) {
        return await User.findById(parent.user);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      async resolve(parent) {
        return await Comment.find({ poem: parent.id });
      },
    },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      async resolve(parent) {
        return await User.findById(parent.user);
      },
    },
    poem: {
      type: PoemType,
      async resolve(parent) {
        return await Poem.findById(parent.poem);
      },
    },
  }),
});

const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Poem {
    _id: ID!
    title: String!
    content: String!
    date: String!
    user: User!
    comments: [Comment!]!
  }

  type Comment {
    _id: ID!
    text: String!
    date: String!
    user: User!
    poem: Poem!
  }

  type Query {
    poems: [Poem!]!
    poem(id: ID!): Poem
    poemOfTheDay: Poem
    topRatedPoems: [Poem!]!
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    createPoem(title: String!, content: String!): Poem!
    updatePoem(id: ID!, title: String!, content: String!): Poem!
    deletePoem(id: ID!): Poem!
    createComment(poemId: ID!, text: String!): Comment!
    deleteComment(id: ID!): Comment!
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
  }
`;
