import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

// use this mutation to store the voicetype and voicetype url to database from the frontend (i.e.create the temporary function similar to generatePodcast to upload the audio to storage and generateurl)
export const createVoice = mutation({
  args: {
    voiceName: v.string(),
    voiceUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("voice", {
      voiceType: args.voiceName,
      voiceUrl: args.voiceUrl,
    });
  },
});

// use this query to get all the voices from the database and display it in the frontend
export const getAllVoices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("voice").collect();
  },
});
