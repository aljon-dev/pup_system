<script lang="ts">
	import { Button, Input, Label, Modal, Navbar, P, Select } from 'flowbite-svelte';
	import { CaretLeftSolid } from 'flowbite-svelte-icons';

	let { openModal = $bindable(false) } = $props();

	let studentTypeChoose = $state('Non Tech');

	let chooseType = ['Non Tech', 'Tech'];
</script>

<div class="flex flex-col">
	<!-- Navbar on the left -->
	<Navbar class="flex  w-full items-center justify-center bg-gray-100 p-4">
		<CaretLeftSolid onclick={() => (openModal = false)} class="w-15 h-10" />
	</Navbar>

	<div class="flex grid grid-cols-1 flex-row">
		<form method="post" action="?/CreateExam">
			<div class="flex flex-col p-2">
				<Label>Create Exams</Label>
				<Input type="text" name="exam_name" placeholder="Enter your Exam name here" />
			</div>

			<div class="flex flex-col p-2">
				<Label>Description</Label>
				<Input type="text" name="exam_description" placeholder="Enter Exam Description here" />
			</div>

			<div class="flex flex-col p-2">
				<Label>Durations</Label>
				<Input type="number" name="exam_duration" placeholder="Enter Exam Duration here" />
			</div>

			<div class="flex flex-col p-2">
				<Label>Scheduled</Label>
				<Input type="date" name="exam_schedule" placeholder="Enter Scheduled here" />
			</div>

			<div class="flex flex-col p-2">
				<Label>Category</Label>
				<Select bind:value={studentTypeChoose} name="exam_type">
					{#each chooseType as type}
						<option value={type} selected={studentTypeChoose === type}>{type}</option>
					{/each}
				</Select>

				<Input
					type="hidden"
					bind:value={studentTypeChoose}
					name="student_type"
					placeholder="Enter Scheduled here"
				/>
			</div>

			<div class="flex flex-row justify-end gap-2">
				<Button type="submit" color="blue">Create</Button>
				<Button type="button" color="red" on:click={() => (openModal = false)}>Cancel</Button>
			</div>
		</form>
	</div>
</div>
