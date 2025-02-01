<script lang="ts">
    import { Button, Label,  Input} from 'flowbite-svelte';
	import Layout from './+layout.svelte';
  </script>
  
<div class="min-h-screen flex items-center justify-center bg-cream">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <div class="flex justify-center mb-6">
     <img src="" alt="logo" class="h-16">
    </div>

     <h2 class="text-2xl font-bold text-maroon mb-6 text-center">Login</h2>
     <form class="space-y-6">
        <div> 
         <Label for="email" class="block mb-2 text-sm font-medium text-maroon">Email</Label>
         <Input  type="email" placeholder="Enter your email" required class="w-full" />
        </div>

        <div> 
            <Label for="password" class="block mb-2 text-sm font-medium text-maroon">Password</Label>
            <Input  type="password" placeholder="Enter your Password" required class="w-full" />
        </div>

        <Button type="submit" class="w-full bg-darkYellow hover:bg-maroon text-white">Login</Button>

     </form>

</div>
</div>