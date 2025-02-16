<script lang="ts">
	import { Button, Label, Input, Fileupload, Helper, Select } from 'flowbite-svelte';
	import bground from '$lib/assets/pup1.png';
    import logopup  from '$lib/assets/pup-logo.png'
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	let currentStep = $state(1);
    let selectedTypes = $state('Transferee')
    let selectedGender = $state('Male')

    let { firstName = $bindable(''), 
          lastName = $bindable(''), 
          studentNumber = $bindable()
    } = $props();


	function nextStep() {
        if(currentStep != 5){
            currentStep += 1;
        }
		
	}

	function previousStep() {
		 if(currentStep != 1){
            currentStep -= 1;
         }
	}

      const gender:string[] =[
            'Male',
            'Female'
      ]

	 const  studentTypes:string[] = [
			'Transferee',
			'Shiftee',
			'Ladderized'
		]

    

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

<form
	class="flex min-h-screen items-center justify-center px-8 sm:px-6 lg:px-8"
	use:enhance={SignUpStatus}
    method="post"
    action="?/"
    enctype="multipart/form-data"
>
	<div class="w-full max-w-2xl space-y-10 rounded-lg bg-white p-8 shadow-lg">
		<div class="flex justify-center">
			<img src="{logopup}" alt="PUP Logo" class="h-24 w-auto" />
		</div>

		<div class="mb-8 text-center">
			<h2 class="text-3xl font-extrabold text-[#800000]">EXAM REGISTRATION</h2>
			<p class="mt-2 text-sm text-gray-600">
				Step {currentStep} of 5
			</p>
		</div>

        <div class:hidden={currentStep !== 1} class="space-y-6">
			<div>
				<Label for="firstName" class="mb-2 font-semibold text-gray-900">Student Type</Label>
				<Select  bind:value={selectedTypes} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each studentTypes as  types}
                    <option>{types}</option>
                    {/each}
                </Select>
			</div>
			
			<Button type="button" class="w-full bg-red-700" on:click={nextStep}>Next</Button>
		</div>



		<div class:hidden={currentStep !== 2} class="space-y-6">
			<div>
				<Label for="firstName" class="mb-2 font-semibold text-gray-900">First Name</Label>
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
            
            <div>
				<Label for="Middle Name" class="mb-2 font-semibold text-gray-900">Middle Name (Optional)</Label>
				<Input
					name="middleName"
					type="text"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
				/>
			</div>

                
            <div>
				<Label for="Middle Name" class="mb-2 font-semibold text-gray-900">Middle Name (Optional)</Label>
				<Input
					name="middleName"
					type="date"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
				/>
			</div>

            <div>
				<Label for="firstName" class="mb-2 font-semibold text-gray-900">Student Type</Label>
				<Select bind:value={selectedGender} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each gender as  genderType}
                    <option>{genderType}</option>
                    {/each}
                </Select>
			</div>
			

            <div class="flex gap-4">
				<Button type="button" color="alternative" class="w-1/2" onclick={previousStep}>Back</Button>
				<Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" on:click={nextStep}>Next</Button>
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
				<Label for="Contact Number" class="mb-2 font-semibold text-gray-900">Contact Number</Label>
				<Input
					id="password"
					name="contact"
					type="number"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
				/>
				<Label for="confirmPassword" class="mb-2 font-semibold text-gray-900">Address</Label>
				<Input
                
					name="address"
					type="text"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
				/>
			</div>
			<div class="flex gap-4">
				<Button type="button" color="alternative" class="w-1/2" onclick={previousStep}>Back</Button>
				<Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" on:click={nextStep}>Next</Button>
			</div>
		</div>

		<div class:hidden={currentStep !== 4} class="space-y-6">
			<div>
				<Label for="Years of Residency" class="mb-2 font-semibold text-gray-900">Years of Residency</Label>
				<Input
					id="email"
					name="residency"
					type="number"
					placeholder="Years of Residency"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
				/>
			</div>

            <div>
				<Label for="Previous School" class="mb-2 font-semibold text-gray-900">Name of Previous School</Label>
				<Select bind:value={selectedGender} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each gender as  genderType}
                    <option>{genderType}</option>
                    {/each}
                </Select>
			</div>

            <div>
				<Label for="Previous Program," class="mb-2 font-semibold text-gray-900">Name of Previous Program</Label>
				<Select bind:value={selectedGender} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each gender as  genderType}
                    <option>{genderType}</option>
                    {/each}
                </Select>
			</div>

            <div>
				<Label for="Applying To," class="mb-2 font-semibold text-gray-900">Name of Program Applying To</Label>
				<Select bind:value={selectedGender} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each gender as  genderType}
                    <option>{genderType}</option>
                    {/each}
                </Select>
			</div>
			
			<div class="flex gap-4">
				<Button type="button" color="alternative" class="w-1/2" onclick={previousStep}>Back</Button>
				<Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" on:click={nextStep}>Next</Button>
			</div>
		</div>

		<div class:hidden={currentStep !== 5} class="space-y-6">
			<div>
				<Label for="documents" class="mb-2 font-semibold text-gray-900">Upload Required Documents</Label>
				
				<Fileupload
					id="documents"
					name="documents"
					type="file"
					accept=".pdf,.png,.jpg,.jpeg"
				/>


                <Label for="documents" class="mb-2 font-semibold text-gray-900">Upload School Id</Label>
				
				<Fileupload
					id="documents"
					name="documents"
					type="file"
					accept=".pdf,.png,.jpg,.jpeg"
				/>
			</div>
			<div class="flex gap-4">
				<Button type="button" color="alternative" class="w-1/2" on:click={previousStep}>Back</Button>
				<Button type="submit" class="w-1/2 bg-[#800000] hover:bg-[#600000]">Submit</Button>
			</div>
		</div>
	</div>
</form>