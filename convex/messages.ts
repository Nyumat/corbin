import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMessagesForChat = query({
  args: { senderId: v.string(), receiverId: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("from"), args.senderId),
            q.eq(q.field("to"), args.receiverId)
          ),
          q.and(
            q.eq(q.field("from"), args.receiverId),
            q.eq(q.field("to"), args.senderId)
          )
        )
      )
      .collect();
    return messages.sort((a, b) => b._creationTime - a._creationTime);
  },
});

export const createChat = mutation({
  args: { senderId: v.string(), receiverId: v.string() },
  handler: async (ctx, args) => {
    const chatExists = await ctx.db
      .query("chats")
      .filter((q) =>
        q.or(
          q.and(q.eq(q.field("users"), [args.senderId, args.receiverId])),
          q.and(q.eq(q.field("users"), [args.receiverId, args.senderId]))
        )
      )
      .first();

    if (chatExists) {
      return chatExists;
    }

    const chat = await ctx.db.insert("chats", {
      created_at: Date.now(),
      users: [args.senderId, args.receiverId],
      last_message_at: Date.now(),
      last_message_content: "",
    });

    return chat;
  },
});

export const getAllChatsForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const chats = await ctx.db.query("chats").collect();

    const chatsWithUser = chats.filter((chat) => {
      return chat.users.includes(args.userId);
    });

    return chatsWithUser;
  },
});

export const createMessage = mutation({
  args: { senderId: v.string(), receiverId: v.string(), text: v.string() },
  handler: async (ctx, args) => {
    const message = await ctx.db.insert("messages", {
      created_at: Date.now(),
      message: args.text,
      to: args.receiverId,
      from: args.senderId,
    });

    const usersInChat: [string, string] = [args.senderId, args.receiverId];
    const chat = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("users"), usersInChat))
      .first();

    if (chat) {
      await ctx.db.patch(chat._id, {
        last_message_at: Date.now(),
        last_message_content: args.text,
      });
    }

    return message;
  },
});

export const getReceiver = query({
  args: { receiverId: v.string() },
  handler: async (ctx, args) => {
    const receiver = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.receiverId))
      .first();
    return receiver;
  },
});

export const markChatAsRead = mutation({
  args: { chatId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("_id"), args.chatId))
      .first();

    if (!chat) {
      throw new Error("Chat not found");
    }

    const messages = await ctx.db
      .query("messages")
      .filter((q) =>
        q.and(
          q.eq(q.field("to"), args.userId),
          q.eq(q.field("from"), chat.users[0])
        )
      )
      .collect();

    for (const message of messages) {
      await ctx.db.patch(message._id, { read_at: Date.now() });
    }
  },
});

export const getChatId = query({
  args: { senderId: v.string(), receiverId: v.string() },
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("chats")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("users"), [args.senderId, args.receiverId]),
            q.eq(q.field("users"), [args.receiverId, args.senderId])
          )
        )
      )
      .first();
    return chat?._id;
  },
});

export const isChatRead = query({
  args: { chatId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("from"), args.userId))
      .collect();

    const unreadMessages = messages.filter((message) => !message.read_at);

    return unreadMessages.length === 0;
  },
});
