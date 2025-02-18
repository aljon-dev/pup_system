<script lang="ts">
import { browser } from '$app/environment';


import { Sidebar,SidebarGroup,SidebarItem,SidebarWrapper, NavHamburger} from 'flowbite-svelte'
import { CloseCircleOutline, OpenDoorOutline } from 'flowbite-svelte-icons';
import logo from '$lib/assets/pup3.png';
	import RegistrationExam from './Component/RegistrationExam.svelte';


let isOpen = $state(true);
let isMobile =  $state(false);
let Navigator = $state('Announcement');

let {data} = $props();


let firstname = $state(data.student?.first_name);
let lastname = $state(data.student?.last_name);
let studentnumber = $state(data.student?.student_number);



let NavigatorList = ([
    'Announcement',
    'Schedule',
    'Exam',
    'Registration',
    'Status',
])




$effect(() => {

    if(browser){
        const mediaQuery = window.matchMedia('(max-width:767px)');
        isMobile = mediaQuery.matches;

        const handleSize = () => {
         isMobile = mediaQuery.matches
         isOpen = !isMobile;   
         }
         mediaQuery.addEventListener('change',handleSize)
         return () => mediaQuery.removeEventListener('change',handleSize);
        }
    })
 

    function Navigation (navigation:number):void{ 
        Navigator = NavigatorList[navigation];
    }


</script>

<div class="flex flex-col md:flex-row min-h-screen">
    
    <div class="md:hidden top:0 left-0 z-50 p-4">
        {#if isOpen == false}
        <NavHamburger onclick={()=> (isOpen = !isOpen)}/>
        {/if}
    </div>

    {#if isOpen}
    <Sidebar class="fixed md:relative z-40">
        <SidebarWrapper class="bg-red-900 w-64 h-full overflow-hidden">
            <div class="md:hidden top-0 left-0 z-5o p-4">

                <CloseCircleOutline onclick={() => (isOpen = !isOpen)} />

            </div>

            <div class="fixed">
                <div class="flex justify-center p-4">
                  <img src={logo} alt="logo" class="h-20 w-auto">
                </div>
            

            <SidebarGroup>
                <SidebarItem label="Announcement" onclick={()=> Navigation(0)} class="text-white font-semibold hover:bg-white hover:text-black">
                    <svelte:fragment slot="icon">
                        

                    </svelte:fragment>


                </SidebarItem>

                <SidebarItem label="Schedule" onclick={()=> Navigation(1)} class="text-white font-semibold hover:bg-white hover:text-black">
                    <svelte:fragment slot="icon">
                        

                    </svelte:fragment>


                </SidebarItem>

                <SidebarItem label="Exam" onclick={()=> Navigation(2)} class="text-white font-semibold hover:bg-white hover:text-black">
                    <svelte:fragment slot="icon">
                        

                    </svelte:fragment>


                </SidebarItem>


                <SidebarItem label="Exam Registration" onclick={()=> Navigation(3)} class="text-white font-semibold hover:bg-white hover:text-black">
                    <svelte:fragment slot="icon">
                        

                    </svelte:fragment>


                </SidebarItem>

                <SidebarItem label="Exam Registration Status" onclick={()=> Navigation(4)} class="text-white font-semibold hover:bg-white hover:text-black">
                    <svelte:fragment slot="icon">
                        

                    </svelte:fragment>


                </SidebarItem>



            </SidebarGroup>

            <SidebarGroup border>
                <SidebarItem label="Sign Out" class="text-white font-semibold hover:bg-white hover:text-black">
                  <svelte:fragment slot="icon">
                    <OpenDoorOutline class="w-5 h-5" />
                  </svelte:fragment>
                </SidebarItem>
              </SidebarGroup>
            </div>
        </SidebarWrapper>
    </Sidebar>
    {/if}

    {#if Navigator == NavigatorList[0]}
  
    <main class="flex-2 p-4 bg-gray-50 dark:bg-gray-900 w-full md:ml-0 mt-16 md:mt-0">
    <p>Announcement</p>
    </main>
   
    {/if}


    {#if Navigator == NavigatorList[1]}
  
    <main class="flex-2 p-4 bg-gray-50 dark:bg-gray-900 w-full md:ml-0 mt-16 md:mt-0">
    <p>Schedule</p>
    </main>
   
    {/if}

    {#if Navigator == NavigatorList[2]}
  
    <main class="flex-2 p-4 bg-gray-50 dark:bg-gray-900 w-full md:ml-0 mt-16 md:mt-0">
    <p>EXAM</p>
    </main>
   
    {/if}

    {#if Navigator == NavigatorList[3]}
  
    <main class="flex-2 p-4 bg-gray-50 dark:bg-gray-900 w-full md:ml-0 mt-16 md:mt-0">
    
     <RegistrationExam 

         firstName={firstname}
         lastName ={lastname}
         
     />




    </main>
   
    {/if}


    {#if Navigator == NavigatorList[4]}
  
    <main class="flex-2 p-4 bg-gray-50 dark:bg-gray-900 w-full md:ml-0 mt-16 md:mt-0">
    <p>EXAM REGISTRATION STATUS</p>
    </main>
   
    {/if}




</div>





