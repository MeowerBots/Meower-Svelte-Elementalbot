<!-- Wait, isn't it a topbar on old layout? -->
<!-- RIP -->

<script>
	import {
		mainPage as page,
		user,
		profileClicked,
		chatid,
		modalShown,
		modalPage,
	} from "../lib/stores.js";
	import {shiftHeld} from "../lib/keyDetect.js";
	
	import * as clm from "../lib/clmanager.js";

	import {tick} from "svelte";

	import logo from "../assets/logo.svg";
	import home from "../assets/home.svg";
	import gc from "../assets/chat.svg";
	import mail from "../assets/mail.svg";
	import mail_new from "../assets/mail_new.svg";
	import profile from "../assets/profile.svg";
	import settings from "../assets/settings.svg";
	import logout from "../assets/logout.svg";

	/**
	* @param {any} newPage Goes to a page while also refreshing it.
	*/
	function goto(newPage, resetScroll=true) {
		if (!$user.name && newPage !== "home" && newPage !== "settings") {
			modalPage.set("signup");
			modalShown.set(true);
			return;
		}
		if (resetScroll) {
			window.scrollTo(0,0);
		}
		if ($page === "groupchat") {
			clm.meowerRequest({
				cmd: "direct",
				val: {
					cmd: "set_chat_state",
					val: {
						state: 0,
						chatid: $chatid
					},
				}
			});
		}
		chatid.set("");
		page.set("blank");
		tick().then(() => page.set(newPage));
	}
</script>

<div class="sidebar">
	<div class="logo">
		<span class="logo-inner" on:click={()=>goto("home")}>
			<img
				alt="Meower"
				src={logo}
				draggable={false}
				height="100%"
				width="auto"
			/>
		</span>
	</div>
	<button on:click={()=>goto("home")} class="home-btn round">
		<img
			src={home}
			alt="Home"
			width="90%"
			height="auto"
			draggable={false}
		/>
	</button>
	<button on:click={()=>goto("inbox")} class="gc-btn round">
		<img
			src={$user.unread_inbox ? mail_new : mail}
			alt="Inbox Messages"
			width="90%"
			height="auto"
			draggable={false}
		/>
	</button>
	<button on:click={()=>{
		if (shiftHeld) {
			goto("groupcat");
		} else {
			goto("chatlist");
		}
	}} class="gc-btn round">
		<img
			src={gc}
			alt="Group Chats"
			width="90%"
			height="auto"
			draggable={false}
		/>
	</button>
	<button on:click={() => {
		$profileClicked = $user.name;
		goto("profile");
	}} class="profile-btn round">
		<img
			src={profile}
			alt="Profile"
			width="90%"
			height="auto"
			draggable={false}
		/>
	</button>
	<button on:click={()=>goto("settings")} class="settings-btn round">
		<img
			src={settings}
			alt="Settings"
			width="90%"
			height="auto"
			draggable={false}
		/>
	</button>
	<button on:click={() => {
		modalPage.set("logout");
		modalShown.set(true);
	}} class="logout-btn round">
		<img
			src={logout}
			alt="Log out"
			width="90%"
			height="auto"
			draggable={false}
		/>
	</button>
</div>

<style>
	button {
		/* Hack to center icons */
		line-height: 0;
	}

	.sidebar {
		background-color: var(--orange);
		
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-wrap: nowrap;

		gap: 0.5em;
		box-sizing: border-box;
		
		user-select: none;

		width: 100%;
		height: 100%;
	}
	.sidebar > button {
		width: 2.8em;
		height: 2.8em;
		margin: 0;

		flex-shrink: 1;
	}

	.logo {
		display: none;
		flex-grow: 1;
		height: 100%;
	}
	.logo img {
		box-sizing: border-box;
		padding: 0.75em;
		filter: brightness(0) invert(1);
	}
	.logo-inner {
		display: inline-block;
		height: 100%;
	}
	.logo-inner:hover {
		background-color: var(--orange-dark);
	}


	:global(main.layout-old) .sidebar {
		flex-direction: row;
		padding-right: 0.5em;
	}
	:global(main.layout-old:not(.layout-mobile)) .logo {
		display: block;
	}
	:global(main.layout-old:not(.layout-mobile)) .home-btn {
		display: none;
	}

	:global(main.layout-mobile) .sidebar {
		padding: 0 0.5em;
	}
</style>
