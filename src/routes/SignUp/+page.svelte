<script lang="ts">
	import { Button, Label, Input, Fileupload, Helper } from 'flowbite-svelte';
	import bground from '$lib/assets/pup1.png';
    import logopup  from '$lib/assets/pup-logo.png'
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	let currentStep = $state(1);
   




	

	function nextStep() {
	
			currentStep += 1;
		
	}

	function previousStep() {
		currentStep -= 1;
	}



 

    let SignUpState = $state('');
	let SignUpLoader = $state(false);
	let statusState = $state<Number>();

	const SignUpStatus: SubmitFunction = () => {
		SignUpLoader = true;

		return async ({ result, update }) => {
			const { status, data } = result as {
				status: number;
				type: string;
				data: { msg: string; status: number };
			};

			switch (status) {
				case 200:
					SignUpLoader = false;
					SignUpState = data.msg;
					statusState = data.status;
                    console.log(statusState)

					break;

				case 400:
                     SignUpLoader = false;
                    SignUpState = data.msg;
					statusState = data.status;
                    console.log(statusState)
					break;

				case 500:
                     SignUpLoader = false;
                    SignUpState = data.msg;
					statusState = data.status;
                    console.log(statusState)

					break;

				default:
                SignUpLoader = false;
                console.log(statusState)
					break;
			}

			await update();
		};
	};



</script>

<div class="relative-back">
	<form
        style="background-image: url('{bground}'); background-size: cover; background-position: center;"
		class=" flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-100 to-red-200 px-4 py-12 sm:px-6 lg:px-8"
		use:enhance={SignUpStatus}
        method="post"
        action="?/userSignUp"
        enctype="multipart/form-data"
	>
		<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
			<div class="flex justify-center">
				<img src="{logopup}" alt="PUP Logo" class="h-24 w-auto" />
			</div>

			<div class="mb-8 text-center">
				<h2 class="text-3xl font-extrabold text-[#800000]">PUP Student Portal</h2>
				<p class="mt-2 text-sm text-gray-600">
					Step {currentStep} of 4
				</p>
			</div>

			
				<div class:hidden={currentStep !== 1} class="space-y-6">
					<div >
						<Label for="firstName" class=" mb-2 font-semibold text-gray-900 }">First Name</Label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
				
						
							class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
						/>
					
					</div>
					<div>
						<Label for="lastName" class="mb-2 font-semibold text-gray-900">Last Name</Label>
						<Input
							id="lastName"
							name="lastName"
							type="text"
						
							class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
						/>
						
					</div>
					<Button type="button" class="w-full  bg-red-700" on:click={nextStep}>Next</Button>
				</div>
			
				<div class:hidden={currentStep !== 2} class="space-y-6">
					<div>
						<Label for="studentNumber" class="mb-2 font-semibold text-gray-900"
							>Student Number</Label
						>
						<Input
							id="studentNumber"
							name="studentNumber"
							type="text"
							placeholder="2020-00000-TG-0"
						
							class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
						/>
						
					</div>
					<div class="flex gap-4">
						<Button type="button" color="alternative" class="w-1/2" on:click={previousStep}
							>Back</Button
						>
						<Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" on:click={nextStep}
							>Next</Button
						>
					</div>
				</div>
			
				<div class:hidden={currentStep !== 3} class="space-y-6">
					<div>
						<Label for="email" class="mb-2 font-semibold text-gray-900">PUP Email Address</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="student@pup.edu.ph"
						
							class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
						/>
						
					</div>
					<div>
						<Label for="password" class="mb-2 font-semibold text-gray-900">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
					
							class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
						/>
						

						
			
						<Label for="confirmPassword" class="mb-2 font-semibold text-gray-900"
							>Confirm Password</Label
						>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
						
							class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
						/>
					
					</div>
					<div class="flex gap-4">
						<Button type="button" color="alternative" class="w-1/2" onclick={previousStep}
							>Back</Button
						>
						<Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" onclick={nextStep}
							>Next</Button
						>
					</div>
				</div>
			
				<div class:hidden={currentStep !== 4} class="space-y-6">
					<div>
						<Label for="documents" class="mb-2 font-semibold text-gray-900"
							>Upload Required Documents</Label
						>
						<p class="mb-2 text-sm text-gray-700">
							Please upload your school ID and registration form
						</p>
						<Fileupload
                         id="documents"
                        name="documents"
                        type="file"
                         accept=".pdf,.png,.jpg,.jpeg"
/>
					</div>
					<div class="flex gap-4">
						<Button type="button" color="alternative" class="w-1/2" onclick={previousStep}
							>Back</Button
						>
						<Button type="submit" class="w-1/2 bg-[#800000] hover:bg-[#600000]">Submit</Button>
					</div>
				</div>
		
		</div>
	</form>
</div>
