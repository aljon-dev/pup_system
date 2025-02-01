<script lang="ts">
  import { 
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    DarkMode,
  } from 'flowbite-svelte';
  import { 
    ChartPieOutline,
    UserCircleOutline,
    CalendarWeekOutline,
    FileChartBarOutline,
    OpenDoorOutline,
    UserSettingsOutline,
    RectangleListOutline,
    ArchiveOutline
  } from 'flowbite-svelte-icons';
  
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
  let activeUrl = '/'
</script>

<div class="flex">
    <!-- Sidebar -->
    <Sidebar >
      <SidebarWrapper class="bg-red-900  w-64 min-h-screen">
        <SidebarGroup>
          <!-- Dashboard -->
          <SidebarItem label="Dashboard" class=" text-white  font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <ChartPieOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Create Exams -->
          <SidebarItem label="Create Exams" class=" text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <RectangleListOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Students -->
          <SidebarItem label="Students" class=" text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <UserCircleOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Analytics -->
          <SidebarItem label="Analytics" class=" text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <FileChartBarOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Test Bank -->
          <SidebarItem label="Test Bank" class=" text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <ArchiveOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
  
          <!-- Calendar -->
          <SidebarItem label="Calendar" class=" text-white font-semibold hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <CalendarWeekOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
  
        <!-- Bottom Group (Sign Out) -->
        <SidebarGroup border>
          <SidebarItem label="Sign Out" class=" text-white font-semibold hover:bg-black hover:bg-white hover:text-black">
            <svelte:fragment slot="icon">
              <OpenDoorOutline class="w-5 h-5" />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>


  <!-- Main Content -->
  <main class="flex-1 p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- To-do List Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">To-do List</h3>
        <!-- Add todo list content here -->
      </div>

      <!-- Score Analysis Section -->
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">Score Analysis</h3>
        <!-- Add score analysis content here -->
      </div>

      <!-- Student Demographics Section -->
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">Student Demographics</h3>
        <!-- Add demographics content here -->
      </div>
    </div>

    <!-- Exam Statistics Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">Passed/Failed per exam</h3>
        <!-- Add chart here -->
      </div>
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">Number of Exam Created</h3>
        <!-- Add chart here -->
      </div>
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">Recent Top Performing Students</h3>
        <!-- Add table here -->
      </div>
      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold">Item Analysis Table</h3>
        <!-- Add table here -->
      </div>
    </div>
  </main>
</div>