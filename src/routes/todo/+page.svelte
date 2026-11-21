<script lang="ts">
	import { authClient } from "#lib/auth-client.ts";
	import { goto } from "$app/navigation";

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

<h1>Welcome to your future</h1>
<button onclick={handleLogout} type="submit"> Sign out</button>