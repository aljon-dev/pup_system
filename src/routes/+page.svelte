<script lang="ts">
	import {
		Navbar,
		NavBrand,
		Button,
		Input,
		Card,
		Footer,
		FooterLinkGroup,
		FooterLink,
		Img
	} from 'flowbite-svelte';

	import campus1 from '../lib/assets/pup-campus1.jpg';
	import campus2 from '$lib/assets/pup-campus2.jpg';
	import campus3 from '$lib/assets/pup-campus3.jpg';
	import campus4 from '$lib/assets/pup-campus4.jpg';
	import logo from '$lib/assets/pup3.png';
	import baybayin from '$lib/assets/baybayin-text.png';
	import guideCover from '$lib/assets/pup5.png';

	import { fade, fly, scale } from 'svelte/transition';
	import { assets } from '$app/paths';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	const backgroundImages = [campus1, campus2, campus3, campus4];
	let currentBgIndex = $state(0);

	// Form data with proper bindings
	let loginState = $state('');
	let loginLoader = $state(false);
	let statusState = $state<Number>();

	const Login: SubmitFunction = () => {
		loginLoader = false;

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

	$effect(() => {
		const interval = setInterval(() => {
			currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
		}, 5000);
		return () => clearInterval(interval);
	});

	// Section cards data
	const sectionCards = [
		{
			title: 'Vision',
			description:
				'PUP is the National Polytechnic University, a prime learning environment for developing globally competitive professionals who will serve as catalysts for a vibrant, productive, and sustainable Philippine society.'
		},
		{
			title: 'Mission',
			description:
				'To provide quality education and empowering learning experiences to students through innovative and relevant academic programs, research, and community service that will help them reach their highest potential and contribute to nation-building.'
		},
		{
			title: 'Our Legacy',
			description:
				'Founded in 1904 as the Manila Business School, PUP has evolved into one of the largest state universities in the Philippines. For over a century, we have been committed to providing quality education to deserving students, living up to our motto "Tanglaw ng Bayan."'
		}
	];

	let visible = false;
</script>

<div class="min-h-screen bg-white">
	<section
		class="relative overflow-hidden bg-red-800 py-24 text-white"
		in:fade={{ duration: 1000 }}
	>
		<div class="absolute inset-0 opacity-10">
			<div class="grid h-full grid-cols-12 gap-4">
				{#each Array(48) as _, i}
					<div
						class="transform rounded border border-white/20 transition-all duration-700"
						style="animation: float {2 + (i % 3)}s ease-in-out infinite alternate-reverse {i *
							0.1}s"
					></div>
				{/each}
			</div>
		</div>

		<div class="container mx-auto px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
					<div
						class="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
						in:fly={{ x: -50, duration: 1000, delay: 300 }}
					>
						<div class="mb-8 flex items-center justify-center space-x-2 md:justify-start">
							<img
								src={logo}
								alt="PUP Logo"
								class="h-20 transform transition-transform duration-300 hover:scale-110"
							/>
							<div class="bg-gold-400 h-16 w-px"></div>
							<div class="text-left">
								<span class="text-gold-400 block font-semibold">EST. 1904</span>
								<span class="text-sm text-red-100">Polytechnic University of the Philippines</span>
							</div>
						</div>
						<h1 class="mb-4 text-5xl font-bold leading-tight">
							Begin Your Journey at
							<span class="text-gold-400">PUP</span>
						</h1>
						<h2 class="mb-6 text-2xl text-red-100">Apply for the PUP College Entrance Test</h2>
						<p class="mb-8 text-xl text-red-50">
							Take the first step towards becoming an Iskolar ng Bayan. Apply now for the PUPCET and
							join our legacy of excellence and service to the nation.
						</p>
					</div>

					<div class="mx-auto w-full max-w-md" in:fly={{ x: 50, duration: 1000, delay: 300 }}>
						<Card
							class="border-gold-400 transform border-t-4 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
						>
							<h3 class="mb-6 text-xl font-bold text-red-800">PUPCET LOGIN FORM</h3>
							<form method="post" action="?/loginUser" use:enhance={Login} class="space-y-4">
								<Input
									type="email"
									placeholder="Email Address"
									required
									class="border-red-200 bg-white transition-all duration-300 focus:border-red-800 focus:ring-red-800"
									name="email"
								/>

								<Input
									type="password"
									placeholder="Your Password"
									required
									class="border-red-200 bg-white transition-all duration-300 focus:border-red-800 focus:ring-red-800"
									name="password"
								/>
								<Button
									type="submit"
									disabled={loginLoader}
									class="border-gold-400 hover:bg-gold-400 w-full transform border bg-red-800 text-white transition-all duration-300 hover:scale-105 hover:text-red-800 disabled:opacity-50"
								>
									{loginLoader ? 'Submitting...' : 'Sign In'}
								</Button>
								<p class="text-center text-xs text-gray-500">
									Thru Login you can see your account status schedules of exams etc.
								</p>
							</form>
							<p class="mt-5 flex justify-center font-semibold hover:text-red-500">
								<a href="/SignUp"> No Account Yet? Register here </a>
							</p>
						</Card>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="relative py-20" in:fade={{ duration: 1000, delay: 500 }}>
		{#each backgroundImages as bgImage, index}
			<div
				class="absolute inset-0 transition-opacity duration-1000"
				style="background-image: url({bgImage}); 
				 background-size: cover; 
				 background-position: center;
				 opacity: {index === currentBgIndex ? 0.3 : 0}"
			></div>
		{/each}

		<div class="container relative z-10 mx-auto px-6 lg:px-8">
			<h2 class="mb-4 text-center text-4xl font-bold text-gray-800">
				Shaping Tomorrow's Leaders Today
			</h2>
			<p class="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600">
				Join a century-old legacy of academic excellence, innovation, and social responsibility. At
				PUP, we don't just educate – we empower future leaders to create meaningful change in our
				rapidly evolving world.
			</p>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each sectionCards as { title, description }, i}
					<div
						class="transform rounded-lg border border-gray-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
						in:fly={{ y: 50, duration: 800, delay: 300 + i * 200 }}
					>
						<h3 class="mb-2 text-xl font-bold text-gray-800">{title}</h3>
						<p class="text-gray-600">{description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-red-800 py-16 text-white" in:fade={{ duration: 1000 }}>
		<div class="container mx-auto px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<div class="mb-8">
					<div class="bg-gold-400 mx-auto mb-8 h-1 w-20"></div>
					<h1 class="mb-4 text-5xl font-bold">Tanglaw ng Bayan, PUP</h1>
					<p class="mb-8 text-xl italic">
						Sintang Paaralan, bilang "Tanglaw ng Bayan," ay isang pandayan ng isipang kabataan,
						nagbibigay ng dunong at oportunidad sa mga nagsisimula sa buhay. Sa pamamagitan ng
						makataong layunin at diwang makabayan, hinuhubog ng PUP ang mga mag-aaral na maging
						instrumento ng pagbabago at pag-unlad para sa Pilipinas.
					</p>
					<div class="flex items-center justify-center space-x-4">
						<span class="bg-gold-400 h-px w-8"></span>
						<div class="group relative">
							<img
								src={baybayin}
								alt="Tanglaw ng Bayan in Baybayin"
								class="h-14 transform transition-all duration-300 group-hover:scale-110"
							/>
						</div>
						<span class="bg-gold-400 h-px w-8"></span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-gray-900 py-20 text-white" in:fade={{ duration: 1000 }}>
		<div class="container mx-auto px-6 text-center lg:px-8">
			<div class="mx-auto max-w-2xl">
				<div
					class="bg-gold-400/10 mx-auto mb-8 flex h-24 w-24 transform items-center justify-center rounded-full p-1 transition-all duration-300 hover:scale-110"
				>
					<img src={guideCover} alt="PUP Guide Cover" class="rounded-full" />
				</div>
				<h2 class="mb-4 text-4xl font-bold">PUP Portal Access</h2>
				<p class="mb-8 text-gray-300">
					Access your personalized PUP dashboard to manage your academic journey or administrative
					tasks.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<Button
						onclick={() => goto('/adminLogin')}
						class="bg-gold-600 hover:bg-gold-700 flex transform items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:text-yellow-500"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Admin Portal
					</Button>
				</div>
				<div class="mt-12 flex justify-center space-x-6"></div>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	:global(.bg-gold-400) {
		@apply bg-yellow-500;
	}
	:global(.text-gold-400) {
		@apply text-yellow-500;
	}
	:global(.border-gold-400) {
		@apply border-yellow-500;
	}
	:global(.hover\:bg-gold-400:hover) {
		@apply hover:bg-yellow-500;
	}

	@keyframes float {
		0% {
			transform: translateY(0) rotate(0deg);
		}
		100% {
			transform: translateY(-10px) rotate(5deg);
		}
	}

	:global(button),
	:global(input),
	:global(a) {
		@apply transition-all duration-300;
	}
</style>
