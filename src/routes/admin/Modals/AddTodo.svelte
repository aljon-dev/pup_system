<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';


import { Button, Input, Label, Modal } from 'flowbite-svelte';

let { defaultModal = $bindable(false),} = $props();



const addToSubmit:SubmitFunction = () =>{

  return async ({result,update}) => {
    const {status,data} = result as  {status:number,type:string,data:{msg:string,status:number}}

    switch(status){
        case 200: break;
        case 400: break;
        case 500: break;

    }

  }
}



</script>

<Modal title="Add To Do List" bind:open={defaultModal} >

  <form method="post" action="?/addTodo" >
    <div class="mb-5">
    <Label>Your Todo </Label>
    <Input name="Todo"  placeholder="Todo" />  
  </div>
  

    <Button type="submit">I accept</Button>
    <Button color="alternative" onclick={()=> defaultModal = false}>Decline</Button>

</form>
</Modal>