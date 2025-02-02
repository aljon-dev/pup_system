<script lang="ts">
  import logo from '$lib/assets/pup3.png';
  import { 
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    DarkMode,
    Navbar,
    NavHamburger,
    Button,
    Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell
  } from 'flowbite-svelte';
  import { 
    ChartPieOutline,
    UserCircleOutline,
    CalendarWeekOutline,
    FileChartBarOutline,
    OpenDoorOutline,
    UserSettingsOutline,
    RectangleListOutline,
    ArchiveOutline,
    CloseOutline,

	CloseCircleOutline


  } from 'flowbite-svelte-icons';
	 import {browser}  from '$app/environment'
	import BarChart from './Components/BarChart.svelte';
	import DonutChart from './Components/DonutChart.svelte';
	import PieChart from './Components/PieChart.svelte';
	import CreateExams from './DashboarComponents/CreateExams.svelte';
  
  
   let isOpen = $state(true);
   let isMobile = $state(false);
   let Navigator = $state('Dashboard');
   let navIndex = $state(0);

   let NavigatorList = ([
    'Dashboard',
    'CreateExams',
    'Students',
    'Analytics',
    'Test Bank',
    'Calendar',
   ])



   $effect(()=>{

      if(browser){
        const mediaQuery = window.matchMedia('(max-width:767px)');
        isMobile = mediaQuery.matches

        const handleSize = () =>{
          isMobile = mediaQuery.matches
          isOpen = !isMobile;

      }
      mediaQuery.addEventListener('change',handleSize)
      return () => mediaQuery.removeEventListener('change',handleSize)
  }
    

   })

   

   function Navigation(navigation:number): void{

     Navigator = NavigatorList[navigation]
      
   }


 


 
  </script>
  
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- Mobile Hamburger -->
    <div class="md:hidden top:0 left-0 z-50 p-4">
      {#if isOpen == false}
      <NavHamburger onclick={() => (isOpen = !isOpen)} />
      {/if}
    </div>
   
    <!-- Sidebar -->
     {#if isOpen}
     
    <Sidebar  class=" fixed md:relative z-40 ">
      
      <SidebarWrapper class="  bg-red-900 w-64 h-full overflow-hidden ">
        <div class="md:hidden top-0 left-0 z-50 p-4">
        
        <CloseCircleOutline onclick={() => (isOpen = !isOpen)} />
      

        </div>
        <div class="fixed">
        <div class="flex justify-center p-4">
          <img src={logo} alt="logo" class="h-20 w-auto">
        </div>
    
        <SidebarGroup >

          
          <!-- Dashboard -->
          <SidebarItem label="Dashboard"  onclick={()=> Navigation(0)} class="text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <ChartPieOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Create Exams -->
          <SidebarItem  label="Create Exams" onclick={()=> Navigation(1)} class="text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment   slot="icon">
              <RectangleListOutline  class="w-5 h-5"  />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Students -->
          <SidebarItem label="Students" onclick={()=> Navigation(2)} class="text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <UserCircleOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Analytics -->
          <SidebarItem label="Analytics" onclick={()=> Navigation(3)} class="text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <FileChartBarOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Test Bank -->
          <SidebarItem label="Test Bank" onclick={()=> Navigation(4)} class="text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <ArchiveOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Calendar -->
          <SidebarItem label="Calendar"  onclick={()=> Navigation(5)} class="text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <CalendarWeekOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
  
        <!-- Bottom Group (Sign Out) -->
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
    <div>
    <main class="flex-2 p-4 bg-gray-50 dark:bg-gray-900 w-full md:ml-0 mt-16 md:mt-0">
      <!-- To-do List Section -->

   
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-4">
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">To-do List</h3>
          <!-- Add todo list content here -->
        </div>
    
        
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">To-do List</h3>
          <!-- Add todo list content here -->
        </div>
      
  
        <!-- Score Analysis Section -->
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">Score Analysis</h3>
          <BarChart/>
        </div>
  
        <!-- Student Demographics Section -->
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">Student Demographics</h3>
           <PieChart/>
        </div>
      </div>
  
      <!-- Exam Statistics Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">Passed/Failed per exam</h3>
          <DonutChart/>
          <!-- Add chart here -->
        </div>
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">Number of Exam Created</h3>
          <DonutChart/>
        </div>
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">Recent Top Performing Students</h3>
          <Table  >
            <TableHead>
              <TableHeadCell> Name</TableHeadCell>
              <TableHeadCell>Color</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
           
            </TableHead>
            <TableBody >
              <TableBodyRow>
                <TableBodyCell>Apple </TableBodyCell>
                <TableBodyCell>Sliver</TableBodyCell>
                <TableBodyCell>Laptop</TableBodyCell>
            
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Microsoft </TableBodyCell>
                <TableBodyCell>White</TableBodyCell>
                <TableBodyCell>Laptop PC</TableBodyCell>
          
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>Magic Mouse 2</TableBodyCell>
                <TableBodyCell>Black</TableBodyCell>
                <TableBodyCell>Accessories</TableBodyCell>
              
              </TableBodyRow>
            </TableBody>
          </Table>
        
        </div>
        <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h3 class="mb-4 text-xl font-bold">Item Analysis Table</h3>
          <!-- Add table here -->
        </div>
      </div>
    </main>
    </div>

    {/if}

    {#if Navigator == NavigatorList[1]}
        <CreateExams/>

    {/if}

  </div>
 
