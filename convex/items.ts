import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./help";
import { getFullUser } from "./users";

export const create = mutation({
  args: {
    itemName: v.string(),
    description: v.string(),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      throw new Error("Not authorized");
    }

    const user = await getFullUser(ctx, userId);

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("items", {
      item_name: args.itemName,
      description: args.description,
      images: args.images,
      owner_info: {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        image_url: user.image_url,
        has_image: user.has_image,
      },
      owner_id: userId,
      created_at: Date.now(),
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("items").collect();
  },
});

export const undoCreation = mutation({
  args: {
    id: v.id("items"),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("Not authorized");
    }

    args.images.forEach(async (image: string) => {
      const imageId = image as Id<"_storage">;
      await ctx.storage.delete(imageId);
    });

    return await ctx.db.delete(args.id);
  },
});
