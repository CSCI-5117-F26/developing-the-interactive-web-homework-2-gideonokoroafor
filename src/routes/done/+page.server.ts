import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "#lib/server/auth.ts";
import { db } from "#lib/mongo.server.ts";

export const load: PageServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    if(!session) {
        redirect(302, '/signin')
    } 
    const userID = session.user.id
    const todos = await db.collection('todos').find({userId: userID, completed: true }).sort({createdAt: -1}).toArray()

    return {
        todos: todos.map((todo) =>({
            id: todo._id.toString(),
            text: todo.text as string,
            completed: todo.completed as boolean
        }))
    }
}