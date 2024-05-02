"use node";

import { v } from "convex/values";
import OpenAI from "openai";

import { action } from "./_generated/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateThumbnailAction = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: args.prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });
    const url = response.data[0].url;
    if (!url) {
      throw new Error("Failed to generate image from prompt");
    }
    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  },
});

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.union(
      v.literal("alloy"),
      v.literal("echo"),
      v.literal("fable"),
      v.literal("onyx"),
      v.literal("nova"),
      v.literal("shimmer")
    ),
  },
  handler: async (ctx, args) => {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: args.voice,
      input: args.input,
    });
    const buffer = await response.arrayBuffer();

    return buffer;
  },
});
