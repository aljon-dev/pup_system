<script lang="ts">
	import { Button, P } from "flowbite-svelte";


    let  {data} = $props();


</script>

<div class="h-min-screen w-full p-8"> 
    <div class="flex flex-row justify-between">
        <P class="font-semibold"> Question Bank </P>
       <div class="flex flex-row gap-5">
        <Button> Create Question Bank  </Button>
        <Button> Import Question Bank  </Button>
        
       </div>
    </div>
  
    <div class="flex grid grid-cols-4">
   
    </div>



</div>

