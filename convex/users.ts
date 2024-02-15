import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { userValues } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createMessage = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
  },
});

export const createMessageRoom = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
  },
});

export const createUser = internalMutation({
  args: { user: userValues },
  handler: async (ctx, args) => {
    const username = args.user.username;
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), username))
      .first();
    if (user) {
      return;
    }
    await ctx.db.insert("users", args.user);
  },
});

export const deleteUser = internalMutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const userId = args.id;
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), userId))
      .first();
    if (!user) {
      throw new ConvexError("User not found");
    }
    const id = user._id;
    await ctx.db.delete(id);
  },
});

export function getFullUser(ctx: QueryCtx | MutationCtx, userId: string) {
  return ctx.db
    .query("users")
    .withIndex("by_userId", (q) => q.eq("id", userId))
    .first();
}

export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await getFullUser(ctx, args.userId);
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    const usersWithImage = users.map((user) => {
      return {
        username: user.username ?? "Anonymous",
        image_url: user.image_url,
        userId: user.id,
      };
    });

    return usersWithImage;
  },
});
