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
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
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
	import { browser } from '$app/environment';
	import BarChart from './Components/BarChart.svelte';
	import DonutChart from './Components/DonutChart.svelte';
	import PieChart from './Components/PieChart.svelte';
	import CreateExams from './Modals/CreateExams.svelte';
	import AddTodo from './Modals/AddTodo.svelte';
	import StudentList from './DashboarComponents/StudentList.svelte';

	let isOpen = $state(true);
	let isMobile = $state(false);
	let Navigator = $state('Dashboard');
	let navIndex = $state(0);
	let todoModal = $state(false);

	let { data } = $props();

	let NavigatorList = [
		'Dashboard',
		'CreateExams',
		'Students',
		'Analytics',
		'Test Bank',
		'Calendar'
	];

	$effect(() => {
		if (browser) {
			const mediaQuery = window.matchMedia('(max-width:767px)');
			isMobile = mediaQuery.matches;

			const handleSize = () => {
				isMobile = mediaQuery.matches;
				isOpen = !isMobile;
			};
			mediaQuery.addEventListener('change', handleSize);
			return () => mediaQuery.removeEventListener('change', handleSize);
		}
	});

	function Navigation(navigation: number): void {
		Navigator = NavigatorList[navigation];
	}
</script>

<div class="flex min-h-screen flex-col md:flex-row">
	<!-- Mobile Hamburger -->
	<div class="top:0 left-0 z-50 p-4 md:hidden">
		{#if isOpen == false}
			<NavHamburger onclick={() => (isOpen = !isOpen)} />
		{/if}
	</div>

	<!-- Sidebar -->
	{#if isOpen}
		<Sidebar class=" fixed z-40 md:relative ">
			<SidebarWrapper class="  h-full w-64 overflow-hidden bg-red-900 ">
				<div class="left-0 top-0 z-50 p-4 md:hidden">
					<CloseCircleOutline onclick={() => (isOpen = !isOpen)} />
				</div>
				<div class="fixed">
					<div class="flex justify-center p-4">
						<img src={logo} alt="logo" class="h-20 w-auto" />
					</div>

					<SidebarGroup>
						<!-- Dashboard -->
						<SidebarItem
							label="Dashboard"
							onclick={() => Navigation(0)}
							class="font-semibold text-white hover:bg-white hover:text-black"
						>
							<svelte:fragment slot="icon">
								<ChartPieOutline class="h-5 w-5" />
							</svelte:fragment>
						</SidebarItem>

						<!-- Create Exams -->
						<SidebarItem
							label="Create Exams"
							onclick={() => Navigation(1)}
							class="font-semibold text-white hover:bg-white hover:text-black"
						>
							<svelte:fragment slot="icon">
								<RectangleListOutline class="h-5 w-5" />
							</svelte:fragment>
						</SidebarItem>

						<!-- Students -->
						<SidebarItem
							label="Students"
							onclick={() => Navigation(2)}
							class="font-semibold text-white hover:bg-white hover:text-black"
						>
							<svelte:fragment slot="icon">
								<UserCircleOutline class="h-5 w-5" />
							</svelte:fragment>
						</SidebarItem>

						<!-- Analytics -->
						<SidebarItem
							label="Analytics"
							onclick={() => Navigation(3)}
							class="font-semibold text-white hover:bg-white hover:text-black"
						>
							<svelte:fragment slot="icon">
								<FileChartBarOutline class="h-5 w-5" />
							</svelte:fragment>
						</SidebarItem>

						<!-- Test Bank -->
						<SidebarItem
							label="Test Bank"
							onclick={() => Navigation(4)}
							class="font-semibold text-white hover:bg-white hover:text-black"
						>
							<svelte:fragment slot="icon">
								<ArchiveOutline class="h-5 w-5" />
							</svelte:fragment>
						</SidebarItem>

						<!-- Calendar -->
						<SidebarItem
							label="Calendar"
							onclick={() => Navigation(5)}
							class="font-semibold text-white hover:bg-white hover:text-black"
						>
							<svelte:fragment slot="icon">
								<CalendarWeekOutline class="h-5 w-5" />
							</svelte:fragment>
						</SidebarItem>
					</SidebarGroup>

					<!-- Bottom Group (Sign Out) -->
					<SidebarGroup border>
						<form action="?/SignOut" method="post">
							<Button
								type="submit"
								color="alternative"
								class="font-semibold  text-white hover:bg-white hover:text-black"
							>
								<div class="flex flex-row gap-2">
									<OpenDoorOutline class="h-5 w-5" />
									<p>Sign Out</p>
								</div>
							</Button>
						</form>
					</SidebarGroup>
				</div>
			</SidebarWrapper>
		</Sidebar>
	{/if}

	{#if Navigator == NavigatorList[0]}
		<div>
			<main class="flex-2 mt-16 w-full bg-gray-50 p-4 md:ml-0 md:mt-0 dark:bg-gray-900">
				<!-- To-do List Section -->

				<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
						<div class="flex flex-row">
							<h3 class="mb-4 text-xl font-bold">To-do List</h3>

							<Button class="float-right ml-36" onclick={() => (todoModal = true)}>Add</Button>
						</div>
						<div class="overflow-scrollable mt-5">
							<Table>
								<TableHead>
									<TableHeadCell>Todo</TableHeadCell>
								</TableHead>
								<TableBody tableBodyClass="divide-y">
									{#each data.todos ?? [] as todo}
										<TableBodyRow>
											<TableBodyCell>{todo.todo}</TableBodyCell>
										</TableBodyRow>
									{/each}
								</TableBody>
							</Table>
						</div>
					</div>

					<!-- Score Analysis Section -->
					<BarChart />
					<!-- Student Demographics Section -->
					<PieChart />
				</div>

				<!-- Exam Statistics Section -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
						<h3 class="mb-4 text-xl font-bold">Passed/Failed per exam</h3>
						<DonutChart />
						<!-- Add chart here -->
					</div>
					<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
						<h3 class="mb-4 text-xl font-bold">Number of Exam Created</h3>
						<DonutChart />
					</div>
					<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
						<h3 class="mb-4 text-xl font-bold">Recent Top Performing Students</h3>
						<Table>
							<TableHead>
								<TableHeadCell>Name</TableHeadCell>
								<TableHeadCell>Color</TableHeadCell>
								<TableHeadCell>Category</TableHeadCell>
							</TableHead>
							<TableBody>
								<TableBodyRow>
									<TableBodyCell>Apple</TableBodyCell>
									<TableBodyCell>Sliver</TableBodyCell>
									<TableBodyCell>Laptop</TableBodyCell>
								</TableBodyRow>
								<TableBodyRow>
									<TableBodyCell>Microsoft</TableBodyCell>
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
					<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
						<h3 class="mb-4 text-xl font-bold">Item Analysis Table</h3>
						<!-- Add table here -->
					</div>
				</div>
			</main>
		</div>
	{/if}

	{#if Navigator == NavigatorList[1]}
		<CreateExams />
	{/if}

	{#if Navigator == NavigatorList[2]}
		<main class="flex-2 mt-16 w-full bg-gray-50 p-4 md:ml-0 md:mt-0 dark:bg-gray-900">
			<StudentList {data} />
		</main>
	{/if}

	<!-- MODALS HERE -->

	<AddTodo defaultModal={todoModal} />
</div>
