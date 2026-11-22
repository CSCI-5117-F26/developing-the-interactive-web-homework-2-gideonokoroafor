<script lang="ts">
	import { authClient } from "#lib/auth-client.ts";

    const session = authClient.useSession()
    let { data } = $props()

</script>

{#if $session.isPending}
    <p>Loading...</p>
{:else if $session.data}
    <h1>Welcome to your future {$session.data.user.name} </h1>
    <h2>These are completed tasks</h2>

    {#each data.todos as todo (todo.id)}
        <form method="POST" action="?/isCompleted">
            <span>{todo.text}</span>
            <!-- <a href={`/todo/${todo.id}`}>{todo.text}</a> -->
        </form>
    {/each}

{/if}
