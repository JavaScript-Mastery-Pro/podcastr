import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
  podcasts: defineTable({
    audioStorageId: v.union(v.id("_storage"), v.null()),
    user: v.id("users"),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.union(v.string(), v.null()),
    imageUrl: v.union(v.string(), v.null()),
    imageStorageId: v.union(v.id("_storage"), v.null()),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.union(v.string(), v.null()),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  })
    .searchIndex("search_author", {
      searchField: "author",
    })
    .searchIndex("search_title", {
      searchField: "podcastTitle",
    })
    .searchIndex("search_body", {
      searchField: "podcastDescription",
    }),
});
