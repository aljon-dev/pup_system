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
            <form method="post" action="?/QuestionBank">
               

                
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
