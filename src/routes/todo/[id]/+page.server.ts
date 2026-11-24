import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { auth } from "#lib/server/auth.ts";
import { db } from "#lib/mongo.server.ts";
import type { PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";

export const load: PageServerLoad = async ({ request, params }) => {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    if(!session) {
        redirect(302, '/signin')
    } 
    const userID = session.user.id
    const todoId = params.id
    const task = await db.collection('todos').findOne({_id: new ObjectId(todoId), userId: userID})

    if(!task){
        return error(404, {error: 'Task not found'})
    }

    return {
        task: {
            id: task._id.toString(),
            text: task.text as string,
            completed: task.completed as boolean
        }
    }
}

export const actions: Actions = {
    updateTask: async ({ request, params }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        })
        if(!session) {
            return fail(401, {error: 'User not found'})
        }
        const data = await request.formData();
        const taskId = params.id
        const text = data.get('text')?.toString().trim();

        if(!text){
            return fail(400, {error:"Task field is required"})
        }

        const result = await db.collection('todos').updateOne({
            _id: new ObjectId(taskId),
            userId: session.user.id,
            completed: false
        }, {
            $set: { text: text }
        })

        if(result.matchedCount === 0) {
            return fail(404, {error: 'Task not found'})
        }

        redirect(302, '/todos')

    }
}

