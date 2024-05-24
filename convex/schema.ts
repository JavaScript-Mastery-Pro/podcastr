import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    podcastIds: v.array(v.id("podcasts")),
  }),
  podcasts: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    audioUrl: v.string(),
    imageStorageId: v.id("_storage"),
    imageUrl: v.string(),
    audioStorageId: v.id("_storage"),
    // author: v.string(),
    // authorId: v.string(),
    // authorImageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  })
    .index("podcastId", ["podcastId"])
    .index("userId", ["userId"])
    // .searchIndex("search_author", {
    //   searchField: "author",
    // })
    .searchIndex("search_title", {
      searchField: "title",
    })
    .searchIndex("search_body", {
      searchField: "description",
    }),
  voice: defineTable({
    voiceType: v.string(),
    voiceUrl: v.string(),
  }),
});
