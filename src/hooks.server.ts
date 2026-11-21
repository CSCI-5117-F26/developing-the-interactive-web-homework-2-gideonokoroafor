import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/env"; // SvelteKit 2: "$app/environment"
import { auth } from "#lib/server/auth.ts";

export async function handle({ event, resolve }) {
    return svelteKitHandler({ event, resolve, auth, building });
}