<!-- Where all the actual chatting action is. -->

<script>
	import Home from "./Home.svelte";
	import Inbox from "./Inbox.svelte";
	import Chatlist from "./Chatlist.svelte";
	import Groupchat from "./Groupchat.svelte";
	import Profile from "./Profile.svelte";
	import Recent from "./Recent.svelte";
	import Settings from "./Settings.svelte";
	import Groupcat from "./Groupcat.svelte";	

	import Sidebar from "./Sidebar.svelte";

	import {mainPage as page} from "../lib/stores.js";

	page.set("home");
</script>

<div class="main-screen">
	<div class="sidebar">
		<Sidebar />
	</div>
	<div class="view"> 
		{#if $page === "home"}
			<Home />
		{:else if $page === "inbox"}
			<Inbox />
		{:else if $page === "chatlist"}
			<Chatlist />
		{:else if $page === "groupchat"}
			<Groupchat />
		{:else if $page === "profile"}
			<Profile />
		{:else if $page === "recent"}
			<Recent />
		{:else if $page === "settings"}
			<Settings />
		{:else if $page === "groupcat"}
			<Groupcat />
		{:else if $page === "groupchat"}
			<Groupchat />
		{:else if $page === "blank"}
			<div></div>
		{:else}
			Somehow, you got to a page that doesn't exist...
			<br />
			(Current page: {$page})
		{/if}
	</div>
</div>

<style>
	.main-screen {
		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		gap: 0;

		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.sidebar {
		width: 3.5em;
		height: auto;

		z-index: 100;
		position: relative;

		flex-shrink: 0;
		flex-grow: 0;
	}
	.view {
		flex-grow: 1;
		flex-shrink: 1;

		padding: 0.33em;
		box-sizing: border-box;
		overflow: auto;

		--view-height: calc(100vh - 0.66em);
		
		background-color: var(--background);
	}

	:global(main.layout-old) .main-screen {
		flex-direction: column;
	}
	:global(main.layout-old) .sidebar {
		width: auto;
		height: 3.5em;
	}
	:global(main.layout-old) .view {
		--view-height: calc(100vh - 3.5em - 0.66em);
	}
</style>
