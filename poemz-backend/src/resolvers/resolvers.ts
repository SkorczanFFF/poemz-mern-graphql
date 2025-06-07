import Poem from "../models/Poem";
import User from "../models/User";

const resolvers = {
  Query: {
    poems: async () => {
      return await Poem.find().populate("user").sort({ date: -1 });
    },
    poem: async (_: any, { id }: { id: string }) => {
      return await Poem.findById(id)
        .populate("user")
        .populate({
          path: "comments",
          populate: { path: "user" },
        });
    },
    poemOfTheDay: async () => {
      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get all poems from today
      const todaysPoems = await Poem.find({
        date: {
          $gte: today,
        },
      }).populate("user");

      if (todaysPoems.length > 0) {
        // If we have poems from today, return a random one
        const randomIndex = Math.floor(Math.random() * todaysPoems.length);
        return todaysPoems[randomIndex];
      } else {
        // If no poems from today, get a random poem from all time
        const count = await Poem.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomPoem = await Poem.findOne().skip(random).populate("user");
        return randomPoem;
      }
    },
    topRatedPoems: async () => {
      // For now, return the 5 most recent poems
      // TODO: Implement actual rating system
      return await Poem.find().populate("user").sort({ date: -1 }).limit(5);
    },
    user: async (_: any, { id }: { id: string }) => {
      return await User.findById(id);
    },
    users: async () => {
      return await User.find();
    },
  },
  // ... rest of the resolvers
};
