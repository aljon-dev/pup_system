<script lang="ts">
	import { Button, P,Card, Listgroup, List} from "flowbite-svelte";
	import AddQuestionBank from "../Modals/AddQuestionBank.svelte";
	import { EditSolid, TrashBinSolid } from "flowbite-svelte-icons";
	import { onDestroy, onMount } from "svelte";
    import * as XLSX from "xlsx";

    
    let  {data} = $props();

    let questionsList = $state<any[]>([]);

    let openModal = $state(false)


    const open = (open:boolean)=> {
            openModal = open

    }

    const  downloadQB = () => {

        const  ws = XLSX.utils.json_to_sheet(questionsList);

        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb,ws,"Questions");

        XLSX.writeFile(wb,"QuestionBank")


    }



    onMount(()=>{
     data.questionBank.forEach((questions:any)=>{

    questionsList.push(questions);

    });


    })

    onDestroy(()=>{
        console.log("new");
		return questionsList = [];
   

    })

</script>

<div class="h-min-screen w-full p-8"> 

    <AddQuestionBank bind:openModal={openModal} />


    <div class="flex flex-row justify-between">
        <P class="font-semibold"> Question Bank </P>
       <div class="flex flex-row gap-5">
        
        <Button onclick={()=> open(true)}> Create Question Bank  </Button>
        <Button onclick={downloadQB}> Import Question Bank  </Button>
       </div>
    </div>
  
    <div class="flex grid grid-cols-3 gap-2 mt-5">
        {#each data.questionBank ?? [] as questionbank}
        <Card padding="xl" class="w-full">
            <div class="flex flex-col w-full">
                <div class="w-full">
                    <p class="text-3xl font-semibold">Question: {questionbank.question_text}</p>
                    <p>Type: {questionbank.type}</p>
                    <p>Answer: {questionbank.correct_answer} </p> 
                </div>
                <div class="flex flex-row w-full  gap-5 mt-2">  
                    <form>
                        <Button color="blue"> <TrashBinSolid/></Button>
                    </form>
                    <form>
                        <Button color="yellow"> <EditSolid/> </Button>
                    </form>
                </div>
            </div>
        </Card>
    {/each}

        
    </div>



</div>

