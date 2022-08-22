<script context="module">
	export const load = ({ session }) => {
		if (Object.keys(session).length !== 0) {
			return {
				status: 302,
				redirect: '/dashboard'
			};
		}
		return {};
	};
</script>

<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Register from '$lib/userComps/register.svelte';
	import Login from '$lib/userComps/login.svelte';
	let switcher = 'login';
	let leftValue = tweened(0,{
		duration: 300,
		easing: cubicOut
	});
	const switchMode = () => {
		if(switcher == 'login') {
			switcher = 'register'
			leftValue.set(50)
		}else{
			switcher = 'login';
			leftValue.set(0)
		} 
	}
	
</script>
<p
	class="mb-10 text-center"
	
>
	{switcher == 'login' ? 'Don\'t have a user? Create one now!' : 'Or would you rather login?'}
</p>
<div class="switcher flex flex-row mx-auto w-fit  cursor-pointer relative rounded-lg overflow-hidden border border-slate-500 mb-5" on:click="{switchMode}">
	<div style='left: {$leftValue}%' class="backgroundElement absolute w-1/2 z-0 h-full bg-cyan-300 border-slate-500" ></div>
	<p class="z-20 w-1/2 inline-flex justify-center px-4 py-2 text-lg pointer-events-none">Login</p>
	<p class="z-20 w-1/2 inline-flex justify-center px-4 py-2 text-lg pointer-events-none">Register</p>
</div>

<div class="loginWrapper w-4/5 mx-auto border border-slate-200 bg-white p-20 shadow-lg rounded-lg">
	<p class=" text-2xl mb-5 capitalize">{switcher}</p>		
		{#if switcher == 'login'}
			<Login />
		{:else}
			<Register />
		{/if}
</div>