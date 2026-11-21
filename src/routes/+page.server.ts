import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "#lib/server/auth.ts";

export const load: PageServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    if(session) {
        redirect(302, '/todos')
    } else {
        redirect(302, '/signin')
    }
}