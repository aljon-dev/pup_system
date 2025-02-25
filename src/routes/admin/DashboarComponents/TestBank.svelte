<script lang="ts">
	import { Button, P } from "flowbite-svelte";
	import AddQuestionBank from "../Modals/AddQuestionBank.svelte";


    let  {data} = $props();

    let openModal = $state(false)


    function open(open:boolean){

        openModal = open;
    }


</script>

<div class="h-min-screen w-full p-8"> 

    <AddQuestionBank bind:openModal={openModal} />


    <div class="flex flex-row justify-between">
        <P class="font-semibold"> Question Bank </P>
       <div class="flex flex-row gap-5">
        
        <Button onclick={()=> open(true)}> Create Question Bank  </Button>
        <Button> Import Question Bank  </Button>
       </div>
    </div>
  
    <div class="flex grid grid-cols-4">
   
    </div>



</div>

