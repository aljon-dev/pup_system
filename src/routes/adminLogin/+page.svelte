<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import logo from '$lib/assets/pup3.png';
  import { redirect, type SubmitFunction } from '@sveltejs/kit';
  import { Button, Label, Input, Alert } from 'flowbite-svelte';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';

  let loginState = $state('');
  let loginLoader = $state(false);
  let statusState = $state<Number>();

    

  const loginStatus: SubmitFunction = () => {
  loginLoader = true;

  return async ({ result, update }) => {
 
   const  { status, data } = result as { status: number; type: string; data: { msg: string, status:number } };
  

    switch (status) {

      case 200:
        loginLoader = false
        loginState = data.msg;
        statusState = data.status;
      
        break;
      case 400:
         loginLoader = false
         loginState = 'Invalid user please try again';
         statusState = data.status;
        break;
   
      
      case 500:
         loginLoader = false
         loginState = 'Invalid user please try again';
         statusState = data.status;
         
        break;

      

        
      default:
        loginLoader = false;
        break;
    }

    await update();
  };
};
</script>

<div class="min-h-screen flex flex-col items-center justify-center backgroundImage">
  {#if statusState === 200 }
    <Alert color="green" class="border-t-4 mb-5" aria-live="polite">
      <InfoCircleSolid slot="icon" class="w-5 h-5" />
      <span class="font-medium">Successfully Logged In</span>
      Proceeding to Admin
    </Alert>
  {:else  if statusState === 400 || statusState  === 500 }
    <Alert color="red" class="border-t-4 mb-5" aria-live="polite">
      <InfoCircleSolid slot="icon" class="w-5 h-5" />
      <span class="font-medium">Error</span>
      {loginState}
    </Alert>
  {/if}

  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <div class="flex justify-center mb-6">
      <img src={logo} alt="logo" class="h-16" />
    </div>

    <h2 class="text-2xl font-bold text-maroon mb-6 text-center">Admin Login</h2>
    <form class="space-y-6" method="post" action="?/loginAdminUser" use:enhance={loginStatus}>
      <div>
        <Label for="email" class="block mb-2 text-sm font-medium text-maroon">Email</Label>
        <Input type="email" name="email" placeholder="Enter your email" required class="w-full" />
      </div>

      <div>
        <Label for="password" class="block mb-2 text-sm font-medium text-maroon">Password</Label>
        <Input type="password" name="password" placeholder="Enter your password" required class="w-full" />
      </div>

      <Button type="submit" class="w-full bg-darkYellow hover:bg-maroon text-white">
        {loginLoader ? 'Loading...' : 'Login'}
      </Button>
    </form>
  </div>
</div>