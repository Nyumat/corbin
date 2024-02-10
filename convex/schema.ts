import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const userValues = v.object({
  banned: v.boolean(),
  created_at: v.float64(),
  first_name: v.optional(v.union(v.null(), v.string())),
  has_image: v.boolean(),
  id: v.string(),
  image_url: v.string(),
  last_name: v.optional(v.union(v.null(), v.string())),
  last_sign_in_at: v.union(v.null(), v.float64()),
  username: v.optional(v.union(v.null(), v.string())),
});

export default defineSchema({
  users: defineTable({
    banned: v.boolean(),
    created_at: v.float64(),
    first_name: v.optional(v.union(v.null(), v.string())),
    has_image: v.boolean(),
    id: v.string(),
    image_url: v.string(),
    last_name: v.optional(v.union(v.null(), v.string())),
    last_sign_in_at: v.union(v.null(), v.float64()),
    username: v.optional(v.union(v.null(), v.string())),
  }).index("by_userId", ["id"]),
  items: defineTable({
    created_at: v.float64(),
    description: v.string(),
    id: v.optional(v.string()),
    item_name: v.string(),
    owner_id: v.string(),
    rating: v.optional(v.float64()),
    images: v.array(v.string()),
    owner_info: v.object({
      first_name: v.optional(v.union(v.null(), v.string())),
      has_image: v.boolean(),
      image_url: v.string(),
      last_name: v.optional(v.union(v.null(), v.string())),
      username: v.optional(v.union(v.null(), v.string())),
    }),
  })
    .index("by_ownerId", ["owner_id"])
    .index("by_itemId", ["id"])
    .index("all_items", [
      "id",
      "item_name",
      "description",
      "owner_id",
      "images",
      "created_at",
    ]),
});
