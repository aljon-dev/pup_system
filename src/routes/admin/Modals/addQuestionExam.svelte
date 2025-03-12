<script lang="ts">
    import { Button, Input, Label, Modal, P, Radio, Select, Textarea, Card } from "flowbite-svelte";
    import { type Result, type CodeData } from "$lib/types";
    import { EditOutline } from "flowbite-svelte-icons";
    

    let {formModal = $bindable(false),
         examId = $bindable()} = $props();
    
    let programming = $state('python'); 
    let codeData = $state<CodeData | null>(null);

    let programminglanguage = ['python', 'java', 'javascript', 'kotlin', 'c++'];
    let letters = ['A', 'B', 'C', 'D'];

    let questions = $state([{
    questionsText: '',
    type: 'mcq',
    options: ['', '', '', ''],
    selectedAnswer: '',
    programming: 'python', 
}]);


    let iframeMap = $state<Map<Window, number>>(new Map());

    const addQuestions = () => {
        questions = [
            ...questions,
            {
                questionsText: '',
                type: 'mcq',
                options: ['', '', '', ''],
                selectedAnswer: '',
                programming:''
            }
        ];
    };

    const removeQuestions = (index: number) => {
        questions = questions.filter((_, i) => i !== index);
    };

    window.onmessage = (e: MessageEvent) => {
        console.log("Message received:", e.data);

        if (e.data && e.data.action) {
            codeData = e.data as CodeData;

            const questionId = iframeMap.get(e.source as Window);
            if (questionId === undefined) {
                console.error("Unable to find questionId for iframe:", e.source);
                return;
            }

            console.log("Identified questionId:", questionId);

            if (e.data.action === "runComplete" && codeData?.result) {
                console.log("Run complete with result:", codeData.result);

                if (questions[questionId]) {
                    questions[questionId].selectedAnswer = codeData.result.output;
                } else {
                    console.error("Question index out of range:", questionId);
                }
            }
        }
    };

  
    let iframeSrc = $derived(`https://onecompiler.com/embed/${programming}?codeChangeEvent=true`);
   

    </script>
    
    <Modal title="Adding Questions" bind:open={formModal}>
        <div class="flex justify-center space-y-4 max-h-96 overflow-y-auto p-2">
            <form method="POST" action="?/AddQuestions">
                
                {#each questions as question, questionIndex}
                <Input type="hidden" name="examId" value={examId}/> 
                    <div class="mb-6 w-[500px]">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-medium">Question {questionIndex + 1}</h3>
                            {#if questions.length > 1}
                                <Button color="red" size="xs" onclick={() => removeQuestions(questionIndex)}>
                                    Remove
                                </Button>
                            {/if}
                        </div>
    
                        <div class="flex flex-col p-2">
                            <Label>Question</Label>
                            <Input 
                                type="text" 
                                name={`questions[${questionIndex}].questionText`} 
                                placeholder="Enter your question here" 
                                bind:value={question.questionsText} 
                            />
                        </div>
                    
                        <div class="flex flex-col p-2">
                            <Label>Type</Label>
                            <Select 
                                bind:value={question.type} 
                                name={`questions[${questionIndex}].type`}>
                                <option value="mcq">MCQ</option>
                                <option value="true_false">True/False</option>
                                <option value="programming">Programming</option>
                            </Select>
                        </div>
                    
                        {#if question.type === 'mcq'}
                            {#each letters as letter, index}
                                <div class="flex flex-cols-2 gap-2 p-2">
                                    <Radio 
                                        bind:group={question.selectedAnswer} 
                                        value={question.options[index]} 
                                        name={`questions[${questionIndex}].selectedAnswer`}
                                    >
                                        {letter}
                                    </Radio>
                                    <Input 
                                        bind:value={question.options[index]} 
                                        class="min-w-8" 
                                        type="text" 
                                        name={`questions[${questionIndex}].options[${index}]`} 
                                    />
                                </div>
                            {/each}
                        {/if}
                    
                        {#if question.type === 'true_false'}
                            <div class="flex flex-col p-2">
                                <Label>Selected Answer</Label>
                                <Select 
                                    bind:value={question.selectedAnswer}
                                    name={`questions[${questionIndex}].selectedAnswer`} >
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </Select>
                            </div>
                        {/if}
                    
                        {#if question.type === 'programming'}
                            <div class="flex flex-col p-2">
                                <Select bind:value={question.programming}>
                                    {#each programminglanguage as lang}
                                        <option value={lang}>{lang}</option>
                                    {/each}
                                </Select>
    
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <iframe
                                class="mt-5"
                                frameBorder="0"
                                height="450px"
                                src={`https://onecompiler.com/embed/${question.programming}?codeChangeEvent=true`}
                                width="100%"
                                onload={(e) => {
                                   
                                    const iframe = e.currentTarget as HTMLIFrameElement;
                                    iframeMap.set(iframe.contentWindow!, questionIndex);
                                    console.log("Iframe loaded for question:", questionIndex);
                                }}
                            ></iframe>
                            </div>
                        {/if}
                    
                        <div class="flex flex-col p-2">
                            <Label>Correct Answer </Label>
                            <Textarea 
                                bind:value={question.selectedAnswer} 
                                readonly 
                                name={`questions[${questionIndex}].correctAnswer`}
                            />
                        </div>
                    </div>
                {/each}
    
                <div class="flex justify-center mb-4">
                    <Button type="button" color="green" on:click={addQuestions}>
                        Add Question
                    </Button>
                </div>
                
                <div class="flex flex-row justify-end gap-2">
                    <Button type="submit" color="blue">Create</Button>
                    <Button type="button" color="red" on:click={() => (formModal = false)}>Cancel</Button>
                </div>
            </form>
        </div>
    </Modal>