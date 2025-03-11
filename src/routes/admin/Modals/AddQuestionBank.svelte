<script lang="ts">
	import { Button, Input, Label, Modal, P, Radio, Select, Textarea } from "flowbite-svelte";

   
	import { onMount } from "svelte";


    let {openModal = $bindable(false)} = $props();

    let studentTypeChoose = $state('Non Tech');
    let opt = $state('MCQ');


    let inputs = $state(['', '', '', '']); // Array to store input values
    let chooseTrueFalse = $state('True');
    let selectedAnswer = $state('');

    let codeData = $state([]);


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
    if (e.data && e.data.action) {
        codeData = e.data;
    }

    if(e.data.action === "runComplete"){
     selectedAnswer = codeData.result.output
     alert(selectedAnswer)
    }
};



</script>

  <Modal title="Creating Question" bind:open={openModal}   >
        <div class="flex flex-row grid grid-cols-1">
            <form method="POST" action="?/QuestionBank">
                <div class="flex flex-col p-2">
                  <Label>Question</Label>
                  <Input type="text" name="question_text" placeholder="Enter your question here" />
                </div>
              
                <div class="flex flex-col p-2">
                  <Label>Type</Label>
                  <Select bind:value={opt} name="type">
                    <option value="mcq">MCQ</option>
                    <option value="true_false">True/False</option>
                    <option value="programming">Programming</option>
                  </Select>
                </div>
              
                {#if opt === 'mcq'}
                  {#each letters as letter, index}
                    <div class="flex flex-cols-2 gap-2 p-2">
                      <Radio bind:group={selectedAnswer} value={inputs[index]} name="radioBtn"> {letter} </Radio>
                      <Input bind:value={inputs[index]} class="min-w-8" type="text" name="answer-{index}" />
                    </div>
                  {/each}
                {/if}
              
                {#if opt === 'true_false'}
                  <div class="flex flex-col p-2">
                    <Label>Selected Answer</Label>
                    <Select bind:value={selectedAnswer} >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </Select>
                  </div>
                {/if}
              
                {#if opt === 'programming'}
                  <div class="flex flex-col p-2">
                    <Select bind:value={language} name="language">
                      {#each programminglanguage as programming}
                        <option value={programming}>{programming}</option>
                      {/each}
                    </Select>

                    <!-- svelte-ignore a11y_missing_attribute -->
                    <iframe
                    
                      class="mt-5"
                      id="oc-editor"
                      frameBorder="0"
                      height="450px"
                      src="https://onecompiler.com/embed/{language}?codeChangeEvent=true"
                      width="100%"
                    ></iframe>
                    <Input type="hidden" name="code" bind:value={code} />
                  </div>
                {/if}
              
                <div class="flex flex-col p-2">
                  <Label>Category</Label>
                  <Input type="text" name="category" placeholder="Enter category (optional)" />
                </div>

                <div class="flex flex-col p-2">
                    <Label>Correct Answer </Label>
                    <Textarea bind:value={selectedAnswer} readonly />
                    <input type="hidden" name="correctAnswer" bind:value={selectedAnswer}> 
                  </div>
              
                <div class="flex flex-row justify-end gap-2">
                  <Button type="submit" color="blue">Create</Button>
                  <Button type="button" color="red" on:click={() => (openModal = false)}>Cancel</Button>
                </div>
              </form>
        </div>
  </Modal>
