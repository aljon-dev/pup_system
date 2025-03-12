<script lang="ts">
	import { Button, Card, Hr, Input, Label, Modal, P, Radio, Select, Textarea } from "flowbite-svelte";
    import { type Result, type CodeData } from "$lib/types";
	import { EditSolid, TrashBinSolid } from "flowbite-svelte-icons";

   
	


    let {ViewModal = $bindable(false),
         question = $bindable([]),
        
    } = $props();


    let opt = $state('mcq');
    let inputs = $state(['', '', '', '']); 
    let selectedAnswer = $state('');

    let codeData = $state<CodeData | null>(null);


    let programminglanguage = [
        'python',
        'java',
        'javascript',
        'kotlin',
        'c++',
    ]


    
    let code = $state('');
    let language = $state('python');

    let chooseType = ([
        'Non Tech',
        'Tech'
    ])

    
    let letters  = ([
        'A',
        'B',
        'C',
        'D',
    ])

  
   window.onmessage = function (e:MessageEvent) {
    if (e.data && e.data.action) {
        codeData = e.data as CodeData
    }

    if(e.data.action === "runComplete"  && codeData?.result){
     selectedAnswer = codeData.result.output
     alert(selectedAnswer)
    }
};



</script>

  <Modal title="Questions " bind:open={ViewModal}  size="lg">
   
        <div class="flex  grid grid-cols-3 gap-2">
            {#each question ??  [] as questions }
            <Card size="md">
                <div class="flex flex-col">
                 <P> Questions: {questions.question_text} </P>
                 <P>Type: {questions.type === 'true_false' ? 'true or false':`${questions.type }` } </P>
                 <P>Answer: {questions.correct_answer} </P>
                 <Hr/>
                  <div class="flex flex-row gap-2">
                    <Button  color="yellow" type ="submit"> <EditSolid/> </Button>
                    <Button color="red"> <TrashBinSolid/> </Button>
                  </div>

                </div>



            </Card>
            {/each}
        </div>


  </Modal>
