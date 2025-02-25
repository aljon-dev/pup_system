<script lang="ts">
	import { Button, Input, Label, Modal, P, Select } from "flowbite-svelte";


    let {openModal = $bindable(false)} = $props();

    let studentTypeChoose = $state('Non Tech');

    let chooseType = ([
        'Non Tech',
        'Tech'
    ])



</script>

  <Modal title="Creating Exam Subject" bind:open={openModal}   >
        <div class="flex flex-row grid grid-cols-1">
            <form method="post" action="?/CreateExam">
                <div class="flex flex-col p-2">
                    <Label>Create Exams</Label>
                    <Input type="text" name="exam_name" placeholder="Enter your Exam name here"/>
                </div>        
                
                <div class="flex flex-col p-2">
                    <Label>Description</Label>
                    <Input type="text" name="exam_description" placeholder="Enter Exam Description here"/>
                </div>  

                <div class="flex flex-col p-2">
                    <Label>Durations</Label>
                    <Input type="number" name="exam_duration" placeholder="Enter Exam Duration here"/>
                </div>  

                <div class="flex flex-col p-2">
                    <Label>Scheduled</Label>
                    <Input type="date" name="exam_schedule" placeholder="Enter Scheduled here"/>
                </div>  


                
                <div class="flex flex-col p-2">
                  <Select bind:value={studentTypeChoose} name="exam_type"> 
                    {#each chooseType as type}
                        <option value={type} selected={studentTypeChoose === type}>{type}</option>
                    {/each}
                  </Select>

                  <Input type="hidden" bind:value={studentTypeChoose} name="student_type" placeholder="Enter Scheduled here"/>
                </div>  

                


                <div class="flex flex-row justify-end gap-2">
                    <Button type="submit" color="blue">Create</Button>
                    <Button type="button" color="red" on:click={()=> openModal = false}>Cancel</Button>
                </div>
                
            </form>
        </div>
  </Modal>
