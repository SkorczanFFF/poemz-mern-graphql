import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { CommentType, PoemType, UserType } from "../schema/schema";
import User from "../models/User";
import Poem from "../models/Poem";
import Comment from "../models/Comment";
import { Document } from "mongoose";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //get all users
    users: {
      type: GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    //get all poems
    poems: {
      type: GraphQLList(PoemType),
      async resolve() {
        return await Poem.find();
      },
    },
    //get all comments
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        return await Comment.find();
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //user signup
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser: Document<any, any, any>;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser)
            return new Error("User with this email already exists!");
          const encryptedPass = hashSync(password);
          const user = new User({ name, email, password: encryptedPass });
          return await user.save();
        } catch (err) {
          return new Error("User signup failed. Please try again later.");
        }
      },
    },
    // signin: {
    //   type: UserType,
    //   args: {
    //     email: { type: GraphQLNonNull(GraphQLString) },
    //     password: { type: GraphQLNonNull(GraphQLString) },
    //   },
    //   async resolve()
    // }
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
function hashSync(password: any) {
  throw new Error("Function not implemented.");
}
