<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/pup3.png';
	import { redirect, type SubmitFunction } from '@sveltejs/kit';
	import { Button, Label, Input, Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let loginState = $state('');
	let loginLoader = $state(false);
	let statusState = $state<Number>();

	const loginStatus: SubmitFunction = () => {
		loginLoader = true;

		return async ({ result, update }) => {
			const { status, data } = result as {
				status: number;
				type: string;
				data: { msg: string; status: number };
			};

			switch (status) {
				case 200:
					loginLoader = false;
					loginState = data.msg;
					statusState = data.status;

					break;

				case 400:
					loginLoader = false;
					loginState = 'Invalid user please try again';
					statusState = data.status;
					break;

				case 500:
					loginLoader = false;
					loginState = 'Invalid user please try again';
					statusState = data.status;

					break;

				default:
					loginLoader = false;
					break;
			}

			await update();
		};
	};
</script>

<div class=" backgroundLoginImage  flex min-h-screen flex-col items-center justify-center">
	{#if statusState === 200}
		<Alert color="green" class="mb-5 border-t-4" aria-live="polite">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Successfully Logged In</span>
			Proceeding to Admin
		</Alert>
	{:else if statusState === 400 || statusState === 500}
		<Alert color="red" class="mb-5 border-t-4" aria-live="polite">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Error</span>
			{loginState}
		</Alert>
	{/if}

	<div class=" w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<div class="mb-6 flex justify-center">
			<img src={logo} alt="logo" class="h-16" />
		</div>

		<h2 class="text-maroon mb-6 text-center text-2xl font-bold">User Login</h2>
		<form class="space-y-6" method="post" action="?/loginUser" use:enhance={loginStatus}>
			<div>
				<Label for="email" class="text-maroon mb-2 block text-sm font-medium">Email</Label>
				<Input type="email" name="email" placeholder="Enter your email" required class="w-full" />
			</div>

			<div>
				<Label for="password" class="text-maroon mb-2 block text-sm font-medium">Password</Label>
				<Input
					type="password"
					name="password"
					placeholder="Enter your password"
					required
					class="w-full"
				/>
			</div>

			<Button type="submit" class="bg-darkYellow hover:bg-maroon w-full text-white">
				{loginLoader ? 'Loading...' : 'Login'}
			</Button>

		</form>
		<div class="flex flex-row justify-center mt-5">

		
		 <p class="text-red-500 font-semibold">
			<button
			onclick={()=> goto('/SignUp')}
			 class="hover:text-red-900">No Account Yet? Register Here 
			 </button>  
			 </p>
		</div>

	</div>
</div>
