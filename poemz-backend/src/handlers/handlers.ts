import {
  GraphQLID,
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
import { Document, startSession } from "mongoose";
import { compareSync, hashSync } from "bcryptjs";

type DocumentType = Document<any, any, any>;
type CachedPoem = {
  id: string;
  title: string;
  content: string;
  date: string;
  user: string;
};

let cachedRandomPoem: CachedPoem | null = null;
let cachedTime: number | null = null;

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
    randomPoem: {
      type: PoemType,
      async resolve() {
        // Implement logic to fetch a random poem
        const randomPoem = await Poem.aggregate([{ $sample: { size: 1 } }]);

        // Return the randomly selected poem or null if no poem is found
        return randomPoem.length > 0 ? randomPoem[0] : null;
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
        try {
          let existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("User with this email already exists!");
          }
          const encryptedPass = hashSync(password);
          const user = new User({ name, email, password: encryptedPass });
          return await user.save();
        } catch (err) {
          throw new Error("User signup failed. Please try again later.");
        }
      },
    },

    // user signin
    signin: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email });
          if (!existingUser) {
            throw new Error(
              "Error! There is no registered user with this email account."
            );
          }
          const decryptedPass = compareSync(
            password,
            //@ts-ignore
            existingUser?.password
          );
          if (!decryptedPass) {
            throw new Error("Incorrect password");
          }
          return existingUser;
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    //user delete
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingUser;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          existingUser = await User.findById(id)
            .populate("poems")
            .populate("comments");

          if (!existingUser) {
            throw new Error("User not found.");
          }

          const userPoems = existingUser.poems;
          const userComments = existingUser.comments;

          await Comment.deleteMany({
            _id: { $in: userComments.map((comment) => comment._id) },
          });

          await Poem.deleteMany({
            _id: { $in: userPoems.map((poem) => poem._id) },
          });

          for (const poem of userPoems) {
            const poemOwner = await User.findById(poem.user);
            if (poemOwner) {
              poemOwner.poems.pull(poem);
              await poemOwner.save({ session });
            }
          }

          for (const comment of userComments) {
            const commentOwner = await User.findById(comment.user);
            const commentPoem = await Poem.findById(comment.poem);

            if (commentOwner && commentPoem) {
              commentOwner.comments.pull(comment);
              commentPoem.comments.pull(comment);

              await commentOwner.save({ session });
              await commentPoem.save({ session });
            }
          }
          return await existingUser.deleteOne();
        } catch (err) {
          throw new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },

    //add new poem
    addPoem: {
      type: PoemType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { title, content, date, user }) {
        let poem: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          poem = new Poem({ title, content, date, user });
          const existingUser = await User.findById(user);
          if (!existingUser) {
            throw new Error("User not found!");
          }
          existingUser.poems.push(poem);
          await existingUser.save({ session });

          return await poem.save();
        } catch (err) {
          throw new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
    //update poem
    updatePoem: {
      type: PoemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingPoem: DocumentType;
        try {
          existingPoem = await Poem.findById(id);
          if (!existingPoem) {
            throw new Error("Poem that not exist.");
          }
          return await Poem.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
          );
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    //delete poem
    deletePoem: {
      type: PoemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingPoem: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          existingPoem = await Poem.findById(id).populate("user");
          //@ts-ignore
          const existingUser = existingPoem?.user;
          if (existingUser) {
            throw new Error("There is no user linked to this poem.");
          }
          if (!existingPoem) {
            throw new Error("Poem not found.");
          }
          existingUser.poems.pull(existingPoem);
          await existingUser.save({ session });

          return await Poem.deleteOne({ id: existingPoem.id });
        } catch (err) {
          throw new Error(err);
        } finally {
          session.commitTransaction();
        }
      },
    },
    //add comment to poem
    addCommentToPoem: {
      type: CommentType,
      args: {
        poem: { type: GraphQLNonNull(GraphQLID) },
        user: { type: GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { user, poem, text, date }) {
        const session = await startSession();
        let comment: DocumentType;
        try {
          session.startTransaction({ session });
          const existingUser = await User.findById(user);
          const existingPoem = await Poem.findById(poem);
          if (!existingPoem || !existingUser) {
            throw new Error("User or poem does not exist!");
          }
          comment = new Comment({
            poem,
            user,
            text,
            date,
          });
          existingUser.comments.push(comment);
          existingPoem.comments.push(comment);
          await existingPoem.save({ session });
          await existingUser.save({ session });
          return await comment.save({ session });
        } catch (err) {
          throw new Error(err);
        } finally {
          await session.commitTransaction();
        }
      },
    },
    // delete comment from poem
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let comment: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          comment = await Comment.findById(id);
          if (!comment) {
            throw new Error("Comment not found!");
          }
          //@ts-ignore
          const existingUser = await User.findById(comment?.user);
          if (!existingUser) {
            throw new Error("User not found!");
          }
          //@ts-ignore
          const existingPoem = await Poem.findById(comment?.poem);
          if (!existingPoem) {
            throw new Error("Poem not found!");
          }
          existingUser.comments.pull(comment);
          existingPoem.comments.pull(comment);
          await existingUser.save({ session });
          await existingPoem.save({ session });
          return await comment.deleteOne({ id: comment.id });
        } catch (err) {
          throw new Error(err);
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
