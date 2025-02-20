<script lang="ts">
	import { 
	  Label, 
	  Input, 
	  Select,
	  Button,
	  Fileupload,
	  A,
	} from 'flowbite-svelte';
  

    let {
        firstname = $bindable(''),
        lastname = $bindable(''),
        middleName = $bindable(''),
        email = $bindable(''),
        gender = $bindable(''),
        address = $bindable(''),
        residency = $bindable(''),
        contactNumber = $bindable(''),
        program = $bindable(''),
        applyingTo = $bindable(''),
        university = $bindable(''),
        schoolId = $bindable(''),
        cor = $bindable(''),
        previousprogram = $bindable(''),
        registrationStatus = $bindable(''),
      } = $props();


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
      

	

	
	
  </script>
  
  
  
	<div class="flex-1 ">
	  <div class="p-8">
		<h1 class="text-2xl font-bold mb-6">EXAM REGISTRATION STATUS</h1>
		
		<form class="space-y-6">
		  <div class="grid md:grid-cols-4 gap-6">
			<div>
			  <Label for="firstName">First Name</Label>
			  <Input 
                bind:value={firstname}
			
				readonly
				class="bg-gray-50"
			  />
			</div>
			<div>
			  <Label for="lastName">Last Name</Label>
			  <Input 
                bind:value={lastname}
				readonly
				class="bg-gray-50"
			  />
			</div>
			<div>
			  <Label for="middleName">Middle Name</Label>
			  <Input 
				bind:value={middleName}
				readonly
				class="bg-gray-50"
			  />
			</div>
			<div>
			  <Label for="email">Email</Label>
			  <Input 
				bind:value={email}
				readonly
				class="bg-gray-50"
			  />
			</div>
		  </div>

		  <div class="grid md:grid-cols-4 gap-6">
			<div>
			  <Label for="gender">Gender</Label>
			  <Select 
				bind:value={gender}
			  >

				<option value="Male">Male</option>
				<option value="Female">Female</option>
	
			  </Select>

              <input type="hidden" bind:value={gender} />
			</div>
			<div>
			  <Label for="address">Address</Label>
			  <Input 
				id="address"
			    bind:value={address}
				placeholder="Enter your address"
			  />
			</div>
			<div>
			  <Label for="residency">Residency</Label>
			  <Input 
				id="residency"
                bind:value={residency}
			
				placeholder="Enter your residency"
			  />
			</div>
			<div>
             
			  <Label for="contactNumber">Contact Number</Label>
               
         
			  <Input 
				id="contactNumber"
                bind:value={contactNumber}
			
				placeholder="Enter contact number"
			  />
			</div>
		  </div>
          
		  <div class="grid md:grid-cols-3 gap-6">
			<div>
                <Label>Applying To</Label>
                <Select  bind:value={previousprogram}
                >
                  {#each previousProgram as program}
                    <option value={ program}>{ program}</option>
                  {/each}
                </Select>
                <input type="hidden" bind:value={previousprogram} />
  
              </div>
			<div>
			  <Label>Applying To</Label>
			  <Select  bind:value={applyingTo}
			  >
				
				{#each desiredProgram as desiredProgram}
				  <option value={desiredProgram}>{desiredProgram}</option>
				{/each}
			  </Select>
              <input type="hidden" bind:value={applyingTo} />

			</div>

            <div>
                <Label>Univerisities</Label>
                <Select  bind:value={university}
                >
                  
                  {#each Univerisities as university}
                    <option value={university}>{university}</option>
                  {/each}
                </Select>
                <input type="hidden" bind:value={university} />
  
              </div>
		  </div>
  
		  <div class="grid md:grid-cols-2 gap-6">
			<div>
                <div class="flex flex-row gap-5">
                    {#if cor != ""}
           
			  <Label for="cor">School ID Picture</Label>
              <A href="{cor}" target="_blank" class="mb-2">View Here</A>

              {/if}
            </div>
			  <Fileupload 
				placeholder={schoolId}
                
				
			  />
			</div>
			<div>
                <div class="flex flex-row gap-5">
                    {#if cor != ""}
           
			  <Label for="cor">Certificate of Registration (COR)</Label>
              <A href="{cor}" target="_blank" class="mb-2">View Here</A>

              {/if}
            </div>
			  <Fileupload 
				placeholder={cor}
			  />
			</div>
		  </div>
  
		  <div class="border p-4 rounded-lg bg-gray-50">
			<Label class="text-lg">Registration Status</Label>
			<div class="text-xl font-semibold mt-2">

                {#if registrationStatus == "pending"}
                <span class="text-yellow-600">PENDING</span>
                {:else if registrationStatus == "approved"}
				<span class="text-green-600">APPROVED</span>
                {:else if registrationStatus == "rejected"}
				<span class="text-red-600">REJECTED</span>
                {/if}
			</div>
		  </div>
  
		  <div class="flex justify-end">
			<Button type="submit" color="blue">Update Information</Button>
		  </div>
		</form>
	  </div>
	</div>
