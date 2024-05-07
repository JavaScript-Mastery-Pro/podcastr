import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

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

export const getAllVoices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("voice").collect();
  },
});
