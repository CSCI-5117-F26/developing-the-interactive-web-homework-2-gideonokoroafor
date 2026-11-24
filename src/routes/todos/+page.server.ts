import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { auth } from "#lib/server/auth.ts";
import { db } from "#lib/mongo.server.ts";
import { ObjectId } from "mongodb";

export const load: PageServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    if(!session) {
        redirect(302, '/signin')
    } 
    const userID = session.user.id
    const todos = await db.collection('todos').find({userId: userID, completed: false }).sort({createdAt: -1}).toArray()

    return {
        todos: todos.map((todo) =>({
            id: todo._id.toString(),
            text: todo.text as string,
            completed: todo.completed as boolean
        }))
    }
}

export const actions: Actions = {
    create: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        })
        if(!session) {
            return fail(401, {error: 'User not found'})
        }
        const data = await request.formData();
        const text = data.get('text')?.toString().trim();

        if(!text){
            return fail(400, {error:"Task field is required"})
        }

        await db.collection('todos').insertOne({
            text: text,
            completed: false,
            userId: session.user.id,
            createdAt: new Date()
        })

        return { success: true, }
    },

    isCompleted: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        })
        if(!session) {
            return fail(401, {error: 'User not found'})
        }
        const data = await request.formData();
        const taskId = data.get('id')?.toString();

        if(!taskId || !ObjectId.isValid(taskId)){
            return fail(401, {error: 'User not found'})
        }

        const result = await db.collection('todos').updateOne({
            _id: new ObjectId(taskId),
            userId: session.user.id,
            completed: false
        }, {
            $set: { completed: true}
        })

        if(result.matchedCount === 0) {
            return fail(404, {error: 'Task not found'})
        }

        return { success: true, }
    }
}