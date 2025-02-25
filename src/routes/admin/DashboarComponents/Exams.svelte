<script lang="ts">
	import { Button, P } from "flowbite-svelte";
	import CreateExams from "../Modals/CreateExams.svelte";

    let examModal= $state(false);




    function openModal(open:boolean){
        examModal = open;

    }



</script>


    <div class="h-min-screen w-full p-8"> 
        <div class="flex flex-row justify-between">
            <P class="font-semibold"> Exams List </P>
            <Button onclick={()=> openModal(true)}> Create Exam  </Button>
        </div>

        <CreateExams bind:openModal={examModal} />


    </div>


