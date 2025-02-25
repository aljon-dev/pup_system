<script lang="ts">
	import { Button, Input, Label, Modal, P, Radio, Select } from "flowbite-svelte";

   
	import { onMount } from "svelte";


    let {openModal = $bindable(false)} = $props();

    let studentTypeChoose = $state('Non Tech');
    let opt = $state('MCQ');

    let chooseTrueFalse = $state('True');
    let selectedAnswer = $state('');


    
    let code = $state('');
    let language = $state('python');

    let chooseType = ([
        'Non Tech',
        'Tech'
    ])

    let trueFalse = ([
        'True',
        'False'
    ])


    let  chooseOption = ([
        'MCQ',
        'True/False',
        'Programming',
    ])
    
    let letters  = ([
        'A',
        'B',
        'C',
        'D',
    ])

  
    window.onmessage = function (e) {
            if (e.data && e.data.language) {
               
                
              
            }
        };



        




</script>

  <Modal title="Creating Exam Subject" bind:open={openModal}   >
        <div class="flex flex-row grid grid-cols-1">
            <form method="post" action="?/QuestionBank">

                <div class="flex flex-col p-2">
                    <Label>Question</Label>
                    <Input type="text" name="question" placeholder="Enter Name here"/>
                </div>

                
                <div class="flex flex-col p-2">
                    <Label>Type</Label>
                   <Select bind:value={opt} > 
                        {#each chooseOption as option}
                            <option value={option}>{option}</option>
                        {/each}

                        <Input type="hidden" name="type" bind:value={opt} />
                   </Select>
                </div>


                {#if opt === 'MCQ'}
                 {#each letters as letter}
                    <div class="flex flex-cols-2 p-2">
                     <Radio bind:group={selectedAnswer} value={letter} name="answer" > {letter} </Radio>
                    </div>
                 {/each}

                {/if}

                <div class="flex flex-col p-2">
                    {#if opt === 'True/False'}
                    <Label>Correct Answer</Label>
                    <Select bind:value={selectedAnswer} > 
                        {#each  trueFalse as option}
                            <option value={option}>{option}</option>
                        {/each}
                       
                   </Select>
                   
                    {/if}

                 
                    <Label>Correct Answer</Label>
                    <Input type="text" name="question" placeholder="Enter Corrected Answer" bind:value={selectedAnswer} readonly/>
                    
            
                    {#if opt === 'Programming'}
                    <iframe 
                    id="oc-editor"
                    frameBorder="0" 
                    height="450px"
                    src="https://onecompiler.com/embed/python?codeChangeEvent=true"
                    width="100%"
                   ></iframe>

                

                    {/if}


                </div>
                


                <div class="flex flex-row justify-end gap-2">
                    <Button type="submit" color="blue">Create</Button>
                    <Button type="button" color="red" on:click={()=> openModal = false}>Cancel</Button>
                </div>
                
            </form>
        </div>
  </Modal>
