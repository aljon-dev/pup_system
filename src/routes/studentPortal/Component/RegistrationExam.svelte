<script lang="ts">
	import { Button, Label, Input, Fileupload, Helper, Select } from 'flowbite-svelte';
	import bground from '$lib/assets/pup1.png';
    import logopup  from '$lib/assets/pup-logo.png'
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	const desiredProgram = [

	"Bachelor of Science in Computer Science (BSCS)",
	"Bachelor of Science in Information Technology (BSIT)"	

	]

	const previousProgram = [
	"Bachelor of Science in Accountancy (BSA)",
	"Bachelor of Science in Management Accounting (BSMA)",
    "Bachelor of Science in Business Administration Major in Financial Management (BSBAFM)",
    "Bachelor of Science in Architecture (BS-ARCH)",
    "Bachelor of Science in Environmental Planning (BSEP)",
    "Bachelor of Arts in English (ABE)",
    "Bachelor of Arts in Filipino (ABF)",
    "Bachelor of Arts in Philosophy (ABPHILO)",
    "Bachelor of Arts in Theater Arts (ABTA)",
    "Bachelor of Science in Business Administration major in Marketing Management (BSBA-MM)",
    "Bachelor of Science in Business Administration major in Human Resource Development Management (BSBA-HRDM)",
    "Bachelor of Science in Entrepreneurship (BSEntrep)",
    "Bachelor of Science in Office Administration (BSOA)",
    "Bachelor in Advertising and Public Relation (BAPR)",
    "Bachelor of Arts in Journalism (ABJ)",
    "Bachelor of Arts on Broadcasting (BA Broadcasting)",
    "Bachelor of Arts in Communication Research (ABCR)",
    "Bachelor of Science in Computer Science (BSCS)",
    "Bachelor of Science in Information Technology (BSIT)",
    "Bachelor of Technology and Livelihood Education (BTLEd) major in Home Economics, Industrial Arts, Information and Communication Technology",
    "Bachelor of Library and Information Science (BLIS)",
    "Bachelor of Secondary Education (BSEd) major in English, Mathematics, Science, Filipino, Social Studies",
    "Bachelor of Elementary Education (BEEd)",
    "Bachelor of Early Childhood Education (BECEd)",
    "Bachelor of Science in Civil Engineering (BSCE)",
    "Bachelor of Science in Computer Engineering (BSCpE)",
    "Bachelor of Science in Electrical Engineering (BSEE)",
    "Bachelor of Science in Electronics Engineering (BSECE)",
    "Bachelor of Science in Industrial Engineering (BSIE)",
    "Bachelor of Science in Mechanical Engineering (BSME)",
    "Bachelor of Science in Railway Engineering (formerly Bachelor of Science in Railway Engineering and Management) (BSRE)",
    "Bachelor in Physical Education (BPE)",
    "Bachelor of Arts in Political Science (BAPS)",
    "Bachelor of Arts in Political Economy (BAPE)",
    "Bachelor of Arts in International Studies (BAIS)",
    "Bachelor of Public Administration (BPA)",
    "Bachelor in Cooperatives (BC)",
    "Bachelor of Arts in History (ABH)",
    "Bachelor of Science in Economics (BSE)",
    "Bachelor of Science in Psychology (BSPSY)",
    "Bachelor of Science in Sociology (BSS)",
    "Bachelor in Applied Statistics (BAS)",
    "Bachelor of Science in Applied Mathematics (BSAM) major in Actuarial Mathematics",
    "Bachelor of Science in Biology (BSBIO)",
    "Bachelor of Science in Chemistry (BSCHEM)",
    "Bachelor of Science in Food Technology (BSFT)",
    "Bachelor of Science in Mathematics (BSM)",
    "Bachelor of Science in Nutrition and Dietetics (BSND)",
    "Bachelor of Science in Physics (BSP)",
    "Bachelor of Science in Tourism Management (BSTM)",
    "Bachelor in Transportation Management (BTM)",
    "Bachelor of Science in Hospitality Management (BSHM)",
    "Diploma in Information Communication Technology (DICT)" 
]

const Univerisities = [
		"Technological University of the Philippines (TUP)",
		"Polytechnic University of the Philippines (PUP)",
		"University of Perpetual (UP)",
		"University of the Philippines (UP)Diploma in Information and Communication Technology (DICT)"
	]

   

	let currentStep = $state(1);
    let selectedTypes = $state('Transferee')
    let selectedGender = $state('Male')
	let selecteduniversities = $state('');
	let selectedPreviousProgram = $state('');
	let selectedDesiredProgram = $state('');
	let midname = $state('');



    let { 
		
		firstName = $bindable(''), 
          lastName = $bindable(''), 
      
		
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
    action="?/RegisterExam"
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
				
					<input type="hidden" value={selectedTypes} name="selectedTypes"> 

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
					bind:value={firstName}
					type="text"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
					required
				/>
			</div>
			<div>
				<Label for="lastName" class="mb-2 font-semibold text-gray-900">Last Name</Label>
				<Input
					id="lastName"
					name="lastName"
					bind:value={lastName}
					type="text"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
					required
				/>
			</div>
            
            <div>
				<Label for="Middle Name" class="mb-2 font-semibold text-gray-900">Middle Name (Optional)</Label>
				<Input
					name="middleName"
					bind:value={midname}
					type="text"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
					required
				/>
			</div>



                
            

            <div>
				<Label for="firstName" class="mb-2 font-semibold text-gray-900">Gender</Label>
				<Select bind:value={selectedGender} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each gender as  genderType}
                    <option>{genderType}</option>
                    {/each}
                </Select>
				<input type="hidden" name="gender" value={selectedGender}> 
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
					required
				/>
			</div>
			<div>
				<Label for="Contact Number" class="mb-2 font-semibold text-gray-900">Contact Number</Label>
				<Input
					
					name="contact"
					type="number"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
					required
				/>
				<Label for="Address" class="mb-2 font-semibold text-gray-900">Address</Label>
				<Input
                
					name="address"
					type="text"
					class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
					required
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
				<Select bind:value={selecteduniversities} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each Univerisities as  univerisity}
                    <option>{univerisity}</option>
                    {/each}

					
                </Select>

				<input type="hidden" name="univerisities" value={selecteduniversities}> 
			</div>

            <div>
				<Label for="Previous Program," class="mb-2 font-semibold text-gray-900">Name of Previous Program</Label>
				<Select bind:value={selectedPreviousProgram} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]">
                    {#each previousProgram as  programs}
                    <option>{programs}</option>
                    {/each}
                </Select>

				<input type="hidden" name="previousprogram" value={selectedPreviousProgram}> 
			</div>

            <div>
				<Label for="Applying To," class="mb-2 font-semibold text-gray-900">Name of Program Applying To</Label>
				<Select bind:value={selectedDesiredProgram} class="border-gray-300 bg-white text-gray-900 focus:border-[#800000] focus:ring-[#800000]" >
                    {#each desiredProgram as  desireprogram}
                    <option>{desireprogram}</option>
                    {/each}
                </Select>

				<input type="hidden" name="desiredprogram" value={selectedDesiredProgram}> 
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
					required
				/>


                <Label for="documents" class="mb-2 font-semibold text-gray-900">Upload School Id</Label>
				
				<Fileupload
					id="documents"
					name="idpic"
					type="file"
					accept=".pdf,.png,.jpg,.jpeg"
					required
				/>
			</div>
			<div class="flex gap-4">
				<Button type="button" color="alternative" class="w-1/2" on:click={previousStep}>Back</Button>
				<Button type="submit" class="w-1/2 bg-[#800000] hover:bg-[#600000]">Submit</Button>
			</div>
		</div>
	</div>
</form>