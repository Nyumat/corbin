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

    const imageSet = new Set(args.images);
    if (imageSet.size !== args.images.length) {
      throw new Error("Duplicate image detected");
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

export const getUserItems = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authorized");
    return await ctx.db
      .query("items")
      .filter((q) => q.eq(q.field("owner_id"), args.userId))
      .collect();
  },
});

export const _delete = mutation({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("Not authorized");
    }

    const item = await ctx.db.get(args.id);

    if (!item) {
      throw new Error("Item not found");
    }

    if (item.owner_id !== userId) {
      throw new Error("Not authorized");
    }

    item.images.forEach(async (image: string) => {
      const imageId = image as Id<"_storage">;
      await ctx.storage.delete(imageId);
    });

    return await ctx.db.delete(args.id);
  },
});

export const getSingleItem = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const actualId = args.id as Id<"items">;
    return await ctx.db.get(actualId);
  },
});

export const deleteImage = mutation({
  args: { imageId: v.string() },
  handler: async (ctx, args) => {
    const imageId = args.imageId as Id<"_storage">;
    return await ctx.storage.delete(imageId);
  },
});
