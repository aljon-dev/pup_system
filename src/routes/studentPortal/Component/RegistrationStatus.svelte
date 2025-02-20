<script lang="ts">
	import { 
	  Label, 
	  Input, 
	  Select,
	 
	  Button,
	  Fileupload,
	
	} from 'flowbite-svelte';
  
	interface UserData {
	  [key: string]: string | File | null | undefined;
	  firstName: string;
	  lastName: string;
	  middleName: string;
	  email: string;
	  gender: string;
	  address: string;
	  residency: string;
	  contactNumber: string;
	  program: string;
	  applyingTo: string;
	  schoolIdImage: File | null;
	  corImage: File | null;
	  status: "PENDING" | "APPROVED" | "REJECTED";
	}
	
	let userData: UserData = {
	  firstName: "John",
	  lastName: "Doe",
	  middleName: "Smith",
	  email: "john.doe@email.com",
	  gender: "",
	  address: "",
	  residency: "",
	  contactNumber: "",
	  program: "",
	  applyingTo: "",
	  schoolIdImage: null,
	  corImage: null,
	  status: "PENDING"
	};
  
	const universities = [
	  "University of Example",
	  "Sample State University",
	  "Test Technical University",
	  "Demo Institute of Technology"
	];
  
	function handleUpdate(field: keyof UserData) {
	  return function(event: Event) {
		const target = event.target as HTMLInputElement | HTMLSelectElement;
		if (target) {
		  userData[field] = target.value;
		}
	  }
	}
  
	function handleFileUpload(event: Event, field: 'schoolIdImage' | 'corImage'): void {
	  const target = event.target as HTMLInputElement;
	  if (target?.files?.[0]) {
		userData[field] = target.files[0];
	  }
	}
  
	function handleSubmit(event: SubmitEvent): void {
	  event.preventDefault();
	  console.log('Form data:', userData);
	}
  </script>
  
  
  
	<div class="flex-1 ">
	  <div class="p-8">
		<h1 class="text-2xl font-bold mb-6">EXAM REGISTRATION STATUS</h1>
		
		<form on:submit={handleSubmit} class="space-y-6">

		  <div class="grid md:grid-cols-4 gap-6">
			<div>
			  <Label for="firstName">First Name</Label>
			  <Input 
				id="firstName"
				value={userData.firstName}
				readonly
				class="bg-gray-50"
			  />
			</div>
			<div>
			  <Label for="lastName">Last Name</Label>
			  <Input 
				id="lastName"
				value={userData.lastName}
				readonly
				class="bg-gray-50"
			  />
			</div>
			<div>
			  <Label for="middleName">Middle Name</Label>
			  <Input 
				id="middleName"
				value={userData.middleName}
				readonly
				class="bg-gray-50"
			  />
			</div>
			<div>
			  <Label for="email">Email</Label>
			  <Input 
				id="email"
				value={userData.email}
				readonly
				class="bg-gray-50"
			  />
			</div>
		  </div>

		  <div class="grid md:grid-cols-4 gap-6">
			<div>
			  <Label for="gender">Gender</Label>
			  <Select 
				id="gender"
				value={userData.gender}
				on:change={handleUpdate('gender')}
			  >
				<option value="">Select Gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			  </Select>
			</div>
			<div>
			  <Label for="address">Address</Label>
			  <Input 
				id="address"
				value={userData.address}
				on:change={handleUpdate('address')}
				placeholder="Enter your address"
			  />
			</div>
			<div>
			  <Label for="residency">Residency</Label>
			  <Input 
				id="residency"
				value={userData.residency}
				on:change={handleUpdate('residency')}
				placeholder="Enter your residency"
			  />
			</div>
			<div>
			  <Label for="contactNumber">Contact Number</Label>
			  <Input 
				id="contactNumber"
				value={userData.contactNumber}
				on:change={handleUpdate('contactNumber')}
				placeholder="Enter contact number"
			  />
			</div>
		  </div>
  
		  <div class="grid md:grid-cols-3 gap-6">
			<div>
			  <Label for="program">Program</Label>
			  <Input 
				id="program"
				value={userData.program}
				on:change={handleUpdate('program')}
				placeholder="Enter your program"
			  />
			</div>
			<div>
			  <Label>Applying To</Label>
			  <Select 
				value={userData.applyingTo}
				on:change={handleUpdate('applyingTo')}
			  >
				<option value="">Select University</option>
				{#each universities as university}
				  <option value={university}>{university}</option>
				{/each}
			  </Select>
			</div>
		  </div>
  
		  <div class="grid md:grid-cols-2 gap-6">
			<div>
			  <Label for="schoolId">School ID Picture</Label>
			  <Fileupload 
				id="schoolId"
				on:change={(e) => handleFileUpload(e, 'schoolIdImage')}
			  />
			</div>
			<div>
			  <Label for="cor">Certificate of Registration (COR)</Label>
			  <Fileupload 
				id="cor"
				on:change={(e) => handleFileUpload(e, 'corImage')}
			  />
			</div>
		  </div>
  
		  <div class="border p-4 rounded-lg bg-gray-50">
			<Label class="text-lg">Registration Status</Label>
			<div class="text-xl font-semibold mt-2">
			  {#if userData.status === 'PENDING'}
				<span class="text-yellow-600">PENDING</span>
			  {:else if userData.status === 'APPROVED'}
				<span class="text-green-600">APPROVED</span>
			  {:else}
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
