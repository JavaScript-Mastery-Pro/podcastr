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
