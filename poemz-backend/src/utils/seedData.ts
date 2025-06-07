import bcrypt from "bcryptjs";
import User from "../models/User";
import Poem from "../models/Poem";
import Comment from "../models/Comment";
import mongoose from "mongoose";

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Poem.deleteMany({});
    await Comment.deleteMany({});

    // Create sample users
    const password = await bcrypt.hash("password123", 12);
    const users = await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password,
      },
      {
        name: "Robert Frost",
        email: "robert@example.com",
        password,
      },
    ]);

    // Create sample poems
    const poems = await Poem.create([
      {
        title: "The Road Not Taken",
        content: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;`,
        date: new Date(),
        user: users[2]._id, // Robert Frost
      },
      {
        title: "Hope",
        content: `Hope is the thing with feathers
That perches in the soul,
And sings the tune without the words,
And never stops at all.`,
        date: new Date(),
        user: users[1]._id, // Jane
      },
      {
        title: "Dreams",
        content: `Hold fast to dreams
For if dreams die
Life is a broken-winged bird
That cannot fly.`,
        date: new Date(),
        user: users[0]._id, // John
      },
    ]);

    // Create sample comments
    const comments = await Comment.create([
      {
        text: "This is a masterpiece!",
        date: new Date(),
        poem: poems[0]._id,
        user: users[1]._id,
      },
      {
        text: "Beautiful imagery",
        date: new Date(),
        poem: poems[1]._id,
        user: users[2]._id,
      },
      {
        text: "Very inspiring",
        date: new Date(),
        poem: poems[2]._id,
        user: users[0]._id,
      },
    ]);

    // Update references
    for (let i = 0; i < poems.length; i++) {
      const poem = poems[i];
      const user = await User.findById(poem.user);
      if (user) {
        user.poems = [...(user.poems || []), poem._id];
        await user.save();
      }
    }

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const user = await User.findById(comment.user);
      const poem = await Poem.findById(comment.poem);

      if (user) {
        user.comments = [...(user.comments || []), comment._id];
        await user.save();
      }

      if (poem) {
        poem.comments = [...(poem.comments || []), comment._id];
        await poem.save();
      }
    }

    console.log("✨ Seed data created successfully!");
    return { users, poems, comments };
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
};

export default seedData;
