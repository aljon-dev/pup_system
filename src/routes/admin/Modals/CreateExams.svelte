<script lang="ts">
	import { Button, Input, Label, Modal, P } from "flowbite-svelte";


    let {openModal = $bindable(false)} = $props();



</script>


  <Modal title="Creating Exam Subject" bind:open={openModal}   >
        <div class="flex flex-row grid grid-cols-1">
            <form>
                <div class="flex flex-col p-2">
                    <Label>Exam Name</Label>
                    <Input type="text" name="exam_name" placeholder="Enter your exam name here"/>
                </div>              
            </form>
        </div>
  </Modal>
