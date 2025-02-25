<script lang="ts">
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import StudentStatusForm from '../Modals/studentStatusForm.svelte';
	import type { studentRegistration } from '$lib/types';

	let { data } = $props();

	let openModal = $state(false);
	let studentInfo = $state<studentRegistration>({});

	let viewStudentRegistration = (students: studentRegistration) => {
		studentInfo = students;
		openModal = true;
	};

	
</script>

<StudentStatusForm
	userid={studentInfo.user_id}
	firstname={studentInfo.firstname}
	lastname={studentInfo.lastname}
	middleName={studentInfo.middlename}
	email={studentInfo.emailAddress}
	address={studentInfo.address}
	gender={studentInfo.gender}
	residency={studentInfo.Details?.residency}
	contactNumber={studentInfo.Details?.contactnumber}
	applyingTo={studentInfo.Details?.applyingTo}
	university={studentInfo.Details?.universities}
	cor={studentInfo.Details?.COR}
	schoolId={studentInfo.Details?.schoolId}
	previousprogram={studentInfo.Details?.previousProgram}
	registrationStatus={studentInfo.status}
	bind:isModalOpen={ openModal }
/>

<Table>
	<TableHead>
		<TableHeadCell>First Name</TableHeadCell>
		<TableHeadCell>Last Name</TableHeadCell>
		<TableHeadCell>Residency</TableHeadCell>
		<TableHeadCell>Email</TableHeadCell>
		<TableHeadCell>Actions</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each data.studentsRegister ?? [] as student}
			<TableBodyRow>
				<TableBodyCell>{student.firstname}</TableBodyCell>
				<TableBodyCell>{student.lastname}</TableBodyCell>
				<TableBodyCell>{student.Details.residency} Years</TableBodyCell>
				<TableBodyCell>{student.emailAddress}</TableBodyCell>
				<TableBodyCell class="flex flex-row gap-2">
					<Button
						color="blue"
						onclick={() => {
							viewStudentRegistration(student);
						}}
						size="sm">View</Button
					>
					<Button color="red" size="sm">Delete</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
