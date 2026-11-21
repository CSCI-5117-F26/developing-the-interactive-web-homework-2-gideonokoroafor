import { db } from "#lib/mongo.server.ts";
import { getRequestEvent } from "$app/server";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sveltekitCookies } from "better-auth/svelte-kit";


export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: { enabled: true },
    plugins: [sveltekitCookies(getRequestEvent)],
    //socialProviders:{}
});