import { v } from "convex/values";

import { auth } from "./auth";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        name: v.string(),
        color: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        }

        //TODO : create a proper method later
        const joinCode = "123456";

        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            color: args.color,
            userId,
            joinCode,
        });

        return workspaceId;
    }
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workspaces").collect();
    }
});

export const getById = query({
    args: {
        id: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const workspace = await ctx.db.get(args.id);

        return workspace;
    }
});