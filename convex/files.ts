// mutation to generate a signed url for uploading a file to the storage service
// this mutation should should be called inside useUploadFiles hook from uploadStuff in frontend
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.storage.generateUploadUrl();
  },
});
