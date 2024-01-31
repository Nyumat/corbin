import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserId } from "./help";
import { getFullUser } from "./users";

export const create = mutation({
  args: {
    itemName: v.string(),
    description: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      throw new Error("Not authorized");
    }

    const user = getFullUser(ctx, userId);

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("items", {
      item_name: args.itemName,
      description: args.description,
      image_url: args.imageUrl,
      owner_id: userId,
      created_at: Date.now(),
    });
  },
});
