<script lang="ts">
	import { Button, Card, Hr, P } from "flowbite-svelte";
	import CreateExams from "../Modals/CreateExams.svelte";
	import { EditSolid, TrashBinSolid } from "flowbite-svelte-icons";
	import AddQuestionExam from "../Modals/addQuestionExam.svelte";

    let examModal= $state(false);

    let {data} = $props();



    function openModal(open:boolean){
        examModal = open;

    }



</script>
<CreateExams bind:openModal={examModal} />
<AddQuestionExam  {data}/>

    <div class="h-min-screen w-full p-8"> 
        <div class="flex flex-row justify-between">
            <P class="font-semibold"> Exams List </P>
            <Button onclick={()=> openModal(true)}> Create Exam  </Button>
        </div>
      
        <div class="flex grid grid-cols-4">
        {#each data.ExamList as exam}
            <Card>
                <div class="flex flex-col">
                    <P class="font-semibold">  {exam.name} </P>
                    <P> Description:  {exam.description} </P>
                    <P> Duration: {exam.duration} </P>
                    <P> Schedule: {exam.scheduled_at} </P>
                    <P> Type: {exam.student_type ?? 'For All'} </P>
                    <Hr/>
                    <div class="flex flex-row  gap-2">
                        <Button color="blue"> Question </Button>
                        <Button color="blue"> <EditSolid/> </Button>
                        <Button color="red"> <TrashBinSolid/> </Button>
                    </div>
            </Card>
           {/each} 
        </div>
    </div>


