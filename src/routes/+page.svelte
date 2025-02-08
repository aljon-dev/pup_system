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

  import campus1 from '$lib/assets/pup-campus1.jpg';
  import campus2 from '$lib/assets/pup-campus2.jpg';
  import campus3 from '$lib/assets/pup-campus3.jpg';
  import campus4 from '$lib/assets/pup-campus4.jpg';
  
	import { fade, fly, scale } from 'svelte/transition';


    const backgroundImages = [campus1,campus2,campus3,campus4];
    let currentBgIndex = $state(0)

  
	// Form data with proper bindings
	let firstName: string = '';
	let lastName: string = '';
	let email: string = '';
	let isSubmitting = false;
  
	const handleSubmit = async (e: Event) => {
	  e.preventDefault();
	  isSubmitting = true;
	  
	  try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		console.log({ firstName, lastName, email });
		// Reset form
		firstName = '';
		lastName = '';
		email = '';
	  } finally {
		isSubmitting = false;
	  }
	};
  
	// Background images for carousel

	// Carousel interval
        $effect(()=>{
            const interval = setInterval(()=>{
                currentBgIndex = (currentBgIndex + 1) % backgroundImages.length
            },5000)
            return ()=> clearInterval(interval);
        })


  
	// Section cards data
	const sectionCards = [
	  {
		title: 'Vision',
		description: 'PUP is the National Polytechnic University, a prime learning environment for developing globally competitive professionals who will serve as catalysts for a vibrant, productive, and sustainable Philippine society.'
	  },
	  {
		title: 'Mission',
		description: 'To provide quality education and empowering learning experiences to students through innovative and relevant academic programs, research, and community service that will help them reach their highest potential and contribute to nation-building.'
	  },
	  {
		title: 'Our Legacy',
		description: 'Founded in 1904 as the Manila Business School, PUP has evolved into one of the largest state universities in the Philippines. For over a century, we have been committed to providing quality education to deserving students, living up to our motto "Tanglaw ng Bayan."'
	  }
	];
  
	let visible = false;
  </script>
  
  <div class="min-h-screen bg-white">

	<section 
	  class="bg-red-800 text-white py-24 relative overflow-hidden"
	  in:fade={{ duration: 1000 }}
	>
	  <div class="absolute inset-0 opacity-10">
		<div class="grid grid-cols-12 gap-4 h-full">
		  {#each Array(48) as _, i}
			<div 
			  class="border border-white/20 rounded transform transition-all duration-700"
			  style="animation: float {2 + (i % 3)}s ease-in-out infinite alternate-reverse {i * 0.1}s"
			></div>
		  {/each}
		</div>
	  </div>
	  
	  <div class="container mx-auto px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
		  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<div 
			  class="text-center md:text-left max-w-2xl mx-auto md:mx-0"
			  in:fly={{ x: -50, duration: 1000, delay: 300 }}
			>
			  <div class="flex items-center justify-center md:justify-start space-x-2 mb-8">
				<img 
				  src="../src/assets/pup-logo3.png" 
				  alt="PUP Logo" 
				  class="h-20 transform transition-transform duration-300 hover:scale-110"
				>
				<div class="h-16 w-px bg-gold-400"></div>
				<div class="text-left">
				  <span class="text-gold-400 font-semibold block">EST. 1904</span>
				  <span class="text-sm text-red-100">Polytechnic University of the Philippines</span>
				</div>
			  </div>
			  <h1 class="text-5xl font-bold mb-4 leading-tight">
				Begin Your Journey at
				<span class="text-gold-400">PUP</span>
			  </h1>
			  <h2 class="text-2xl mb-6 text-red-100">
				Apply for the PUP College Entrance Test
			  </h2>
			  <p class="text-xl mb-8 text-red-50">
				Take the first step towards becoming an Iskolar ng Bayan. Apply now for the PUPCET 
				and join our legacy of excellence and service to the nation.
			  </p>
			</div>
			
			<div 
			  class="w-full max-w-md mx-auto"
			  in:fly={{ x: 50, duration: 1000, delay: 300 }}
			>
			  <Card class="p-8 shadow-xl border-t-4 border-gold-400 bg-white transform transition-all duration-300 hover:shadow-2xl">
				<h3 class="text-red-800 font-bold text-xl mb-6">PUPCET Application Form</h3>
				<form on:submit={handleSubmit} class="space-y-4">
				  <div class="grid grid-cols-2 gap-4">
					<Input
					  type="text"
					  placeholder="First Name"
					  required
					  class="bg-white border-red-200 focus:border-red-800 focus:ring-red-800 transition-all duration-300"
					  bind:value={firstName}
					/>
					<Input
					  type="text"
					  placeholder="Last Name"
					  required
					  class="bg-white border-red-200 focus:border-red-800 focus:ring-red-800 transition-all duration-300"
					  bind:value={lastName}
					/>
				  </div>
				  <Input
					type="email"
					placeholder="Email Address"
					required
					class="bg-white border-red-200 focus:border-red-800 focus:ring-red-800 transition-all duration-300"
					bind:value={email}
				  />
				  <Button 
					type="submit" 
					disabled={isSubmitting}
					class="w-full bg-red-800 text-white border border-gold-400 transition-all duration-300 transform hover:bg-gold-400 hover:text-red-800 hover:scale-105 disabled:opacity-50"
				  >
					{isSubmitting ? 'Submitting...' : 'Apply for PUPCET'}
				  </Button>
				  <p class="text-xs text-gray-500 text-center">
					By submitting this form, you'll receive important updates about your PUPCET application
				  </p>
				</form>
			  </Card>
			</div>
		  </div>
		</div>
	  </div>
	</section>
  
	
	<section 
	  class="py-20 relative"
	  in:fade={{ duration: 1000, delay: 500 }}
	>
	 
	  {#each backgroundImages as bgImage, index}
		<div
		  class="absolute inset-0 transition-opacity duration-1000"
		  style="background-image: url({bgImage}); 
				 background-size: cover; 
				 background-position: center;
				 opacity: {index === currentBgIndex ? 0.30 : 0}"
		></div>
	  {/each}
  
	  <div class="container mx-auto px-6 lg:px-8 relative z-10">
		<h2 class="text-4xl font-bold text-center mb-4 text-gray-800">
		  Shaping Tomorrow's Leaders Today
		</h2>
		<p class="text-center mb-12 text-gray-600 max-w-3xl mx-auto text-lg">
		  Join a century-old legacy of academic excellence, innovation, and social responsibility. 
		  At PUP, we don't just educate – we empower future leaders to create meaningful change 
		  in our rapidly evolving world.
		</p>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		  {#each sectionCards as { title, description }, i}
			<div 
			  class="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
			  in:fly={{ y: 50, duration: 800, delay: 300 + (i * 200) }}
			>
			  <h3 class="font-bold text-xl mb-2 text-gray-800">{title}</h3>
			  <p class="text-gray-600">{description}</p>
			</div>
		  {/each}
		</div>
	  </div>
	</section>
  
	<section 
	class="py-16 bg-red-800 text-white"
	in:fade={{ duration: 1000 }}
	>
	<div class="container mx-auto px-6 lg:px-8">
		<div class="max-w-3xl mx-auto text-center">
		<div class="mb-8">
			<div class="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
			<h1 class="text-5xl font-bold mb-4">Tanglaw ng Bayan, PUP</h1>
			<p class="text-xl italic mb-8">
			Sintang Paaralan, bilang "Tanglaw ng Bayan," ay isang pandayan ng isipang kabataan, nagbibigay ng dunong at oportunidad sa mga nagsisimula sa buhay. Sa pamamagitan ng makataong layunin at diwang makabayan, hinuhubog ng PUP ang mga mag-aaral na maging instrumento ng pagbabago at pag-unlad para sa Pilipinas.
			</p>
			<div class="flex items-center justify-center space-x-4 ">
			<span class="w-8 h-px bg-gold-400"></span>
			<div class="relative group">
				<img 
              src="../src/assets/baybayin-text.png" 
              alt="Tanglaw ng Bayan in Baybayin" 
              class="h-14 transform transition-all duration-300 group-hover:scale-110"
            />
			</div>
			<span class="w-8 h-px bg-gold-400"></span>
			</div>
		</div>
		</div>
	</div>
	</section>
  
	
	<section 
	  class="py-20 bg-gray-900 text-white"
	  in:fade={{ duration: 1000 }}
	>
	  <div class="container mx-auto px-6 lg:px-8 text-center">
		<div class="max-w-2xl mx-auto">
		  <div 
			class="bg-gold-400/10 p-1 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center transform transition-all duration-300 hover:scale-110"
		  >
			<img src="../src/assets/pup-logo3.png" alt="PUP Guide Cover" class="rounded-full">
		  </div>
		  <h2 class="text-4xl font-bold mb-4">PUP Portal Access</h2>
      <p class="mb-8 text-gray-300">
        Access your personalized PUP dashboard to manage your academic journey or administrative tasks.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
		<Button 
		href="https://portalsample.pup.edu.ph/student" 
		class="bg-red-800 hover:bg-red-900 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
	  >
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
		</svg>
		Student Portal
	  </Button>
	  <Button 
		href="https://portalsample.pup.edu.ph/admin" 
		class="bg-gold-600 hover:bg-gold-700 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
	  >
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
		</svg>
		Admin Portal
	  </Button>
		  </div>
		  <div class="flex justify-center space-x-6 mt-12">
		  </div>
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