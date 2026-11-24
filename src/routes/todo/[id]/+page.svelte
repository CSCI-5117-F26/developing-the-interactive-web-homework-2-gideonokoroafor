<script lang="ts">
	import { resolve } from '$app/paths';


    const { data } = $props()
    let text = $state(data.task.text);
</script>

<h1> Edit your task </h1>

<form method="POST" action="?/updateTask">
  <textarea name="text" bind:value={text} placeholder="Update your task" required></textarea>
  <button type="submit">Update</button>
</form>

<a href={resolve('/')}>Home</a>