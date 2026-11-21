<script lang="ts">
    import { authClient } from "#lib/auth-client.ts";
    import { goto } from "$app/navigation";

    let name = $state("");
    let email = $state("");
    let password = $state("");
    let errorMsg = $state("");
    let loading = $state(false);

    async function handleSignup(e: SubmitEvent) {
        e.preventDefault();
        errorMsg = "";
        loading = true;

        const { error } = await authClient.signUp.email(
            { name, email, password },
            {
            onSuccess: () => {
                goto("/todos");
            },
            onError: (ctx) => {
                errorMsg = ctx.error.message;
            },
            }
        );

        if (error) {
            errorMsg = error.message ?? "Sign up failed.";
        }
        loading = false;
    }
</script>

<form onsubmit={handleSignup}>
  <input type="text" bind:value={name} placeholder="Name" required />
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  {#if errorMsg}
    <p>{errorMsg}</p>
  {/if}
  <button type="submit" disabled={loading}>
    {loading ? "Signing up..." : "Sign Up"}
  </button>
</form>
