<script lang="ts">
	import {
		Button,
		Card,
		Hr,
		Input,
		Label,
		Modal,
		P,
		Radio,
		Select,
		Textarea,
		Navbar,
		NavBrand,
		Alert
	} from 'flowbite-svelte';
	import { type Result, type CodeData } from '$lib/types';
	import { CaretLeftSolid, EditSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	let { ViewModal = $bindable(false), question = $bindable([]) } = $props();

	const submitFunction: SubmitFunction = () => {
		return async ({ result, update }) => {
			const { status, data } = result as {
				type: string;
				status: number;
				data?: Record<string, any>;
			};
			console.log(status, data);

			if (status === 200 || status === 204) {
				// Get the form that triggered this submission
				const form = document.activeElement?.closest('form') as HTMLFormElement;
				if (form) {
					// Extract the questionId from the form that was submitted
					const formData = new FormData(form);
					const deletedId = formData.get('questionId');

					// Update the questions array by filtering out the deleted question
					question = question.filter((q) => q.id !== Number(deletedId));
					console.log('Removed question ID:', deletedId);
				}
			}
		};
	};
</script>

{#if ViewModal}
	<div class="flex flex-col">
		<!-- Navbar on the left -->
		<Navbar class="flex  w-full items-center justify-center bg-gray-100 p-4">
			<CaretLeftSolid onclick={() => (ViewModal = false)} class="w-15 h-10" />
		</Navbar>

		<!-- Main content -->
		<div class="mt-5 grid flex-1 grid-cols-3 gap-2 p-4">
			{#each question ?? [] as questions}
				<Card size="md">
					<div class="flex flex-col">
						<P>Questions: {questions.question_text}</P>
						<P>Type: {questions.type === 'true_false' ? 'True or False' : questions.type}</P>
						<P>Answer: {questions.correct_answer}</P>
						<Hr />
						<div class="flex flex-row gap-2">
							<Button color="yellow" type="submit"><EditSolid /></Button>
							<form method="POST" action="?/DeleteQuestions" use:enhance={submitFunction}>
								<Input type="hidden" value={questions.id} name="questionId" />
								<Button color="red" type="submit"><TrashBinSolid /></Button>
							</form>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</div>
{/if}
