<script lang="ts">
	import { authClient } from "#lib/auth-client.ts";
	import { goto } from "$app/navigation";

    const session = authClient.useSession()
    let { data } = $props()

    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    goto("/signin"); // redirect to login page
                },
            },
        });
    }
</script>

{#if $session.isPending}
    <p>Loading...</p>
{:else if $session.data}
    <h1>Welcome to your future {$session.data.user.name} </h1>

    <form method="POST" action="?/create">
        <input type="text" name="text" placeholder="enter a new task" required />
        <button type="submit">Add Task</button>
    </form>
    <p></p>

    {#each data.todos as todo (todo.id)}
        <form method="POST" action="?/isCompleted">
            <input type="hidden" name="id" value={todo.id}/>
            <input 
                type="checkbox" 
                name="completed" 
                checked={todo.completed}
                onchange={(e) => {
                    if(e.currentTarget.checked){
                        e.currentTarget.form?.requestSubmit()
                    }
                }}
            />
            <span>{todo.text}</span>
            <!-- <a href={`/todo/${todo.id}`}>{todo.text}</a> -->
        </form>
    {/each}

    <p></p>
    <button onclick={()=>goto('/done')} type="submit"> Completed Tasks</button>

    <p></p>
    <button onclick={handleLogout} type="submit"> Sign out</button>
{/if}
