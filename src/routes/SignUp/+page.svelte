<script lang="ts">
    import { Button, Label, Input, Fileupload, Helper } from 'flowbite-svelte';
    import bground from '$lib/assets/pup1.png';
    
    let currentStep = $state(1);

    let formData = {
        firstName: '',
        lastName: '',
        studentNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        documents: undefined as FileList | undefined
    };

    let errors: Record<string, string> = {};
    
    
    let passwordChecks = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    };


    const validatePassword = (password: string) => {
        passwordChecks.length = password.length >= 8;
        passwordChecks.uppercase = /[A-Z]/.test(password);
        passwordChecks.lowercase = /[a-z]/.test(password);
        passwordChecks.number = /[0-9]/.test(password);
        passwordChecks.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    }


    $effect(()=>{

    validatePassword(formData.password);

    })




    function nextStep() {
        if (validateCurrentStep()) {
            currentStep + 1;
        }
    }
    
    function previousStep() {
        currentStep--;
    }
    
    function validateCurrentStep(): boolean {
        errors = {};
        
        switch(currentStep) {
            case 1:
                if (!formData.firstName) errors.firstName = 'First name is required';
                if (!formData.lastName) errors.lastName = 'Last name is required';
                break;
            case 2:
                if (!formData.studentNumber) errors.studentNumber = 'Student number is required';
                break;
            case 3:
                if (!formData.email) errors.email = 'Email is required';
                if (!formData.email.endsWith('@pup.edu.ph')) errors.email = 'Must use a PUP email address';
                if (!formData.password) errors.password = 'Password is required';
                if (!Object.values(passwordChecks).every(check => check)) {
                    errors.password = 'Password does not meet all requirements';
                }
                if (formData.password !== formData.confirmPassword) {
                    errors.confirmPassword = 'Passwords do not match';
                }
                break;
        }
        
        return Object.keys(errors).length === 0;
    }
    
    function handleSubmit(event: SubmitEvent) {
        if (validateCurrentStep()) {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            console.log('Form submitted:', Object.fromEntries(formData));
        }
        event.preventDefault();
    }
</script>
<div style="background-image: url('{bground}'); background-size: cover; background-position: center;" class="relative">




<form 
    class=" min-h-screen  bg-gradient-to-b from-yellow-100 to-red-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    on:submit={handleSubmit}
>
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        
        <div class="flex justify-center">
            <img src="$lib/assets/pup-logo.png" alt="PUP Logo" class="h-24 w-auto"/>
        </div>
        
        <div class="text-center mb-8">
            <h2 class="text-3xl font-extrabold text-[#800000]">
                PUP Student Portal
            </h2>
            <p class="mt-2 text-sm text-gray-600">
                Step {currentStep} of 4
            </p>
        </div>

        {#if currentStep === 1}
            <div class="space-y-6">
                <div>
                    <Label for="firstName" class="mb-2 text-gray-900 font-semibold">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        bind:value={formData.firstName}
                        color={errors.firstName ? 'red' : 'base'}
                        class="bg-white border-gray-300 text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
                    />
                    {#if errors.firstName}
                        <Helper color="red">{errors.firstName}</Helper>
                    {/if}
                </div>
                <div>
                    <Label for="lastName" class="mb-2 text-gray-900 font-semibold">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        bind:value={formData.lastName}
                        color={errors.lastName ? 'red' : 'base'}
                        class="bg-white border-gray-300 text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
                    />
                    {#if errors.lastName}
                        <Helper color="red">{errors.lastName}</Helper>
                    {/if}
                </div>
                <Button type="button" class="w-full  bg-red-700" onclick={()=> nextStep}>Next</Button>
            </div>
        {/if}

        {#if currentStep === 2}
            <div class="space-y-6">
                <div>
                    <Label for="studentNumber" class="mb-2 text-gray-900 font-semibold">Student Number</Label>
                    <Input
                        id="studentNumber"
                        name="studentNumber"
                        type="text"
                        placeholder="2020-00000-TG-0"
                        bind:value={formData.studentNumber}
                        color={errors.studentNumber ? 'red' : 'base'}
                        class="bg-white border-gray-300 text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
                    />
                    {#if errors.studentNumber}
                        <Helper color="red">{errors.studentNumber}</Helper>
                    {/if}
                </div>
                <div class="flex gap-4">
                    <Button type="button" color="alternative" class="w-1/2" on:click={previousStep}>Back</Button>
                    <Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" on:click={nextStep}>Next</Button>
                </div>
            </div>
        {/if}

        {#if currentStep === 3}
            <div class="space-y-6">
                <div>
                    <Label for="email" class="mb-2 text-gray-900 font-semibold">PUP Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="student@pup.edu.ph"
                        bind:value={formData.email}
                        color={errors.email ? 'red' : 'base'}
                        class="bg-white border-gray-300 text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
                    />
                    {#if errors.email}
                        <Helper color="red">{errors.email}</Helper>
                    {/if}
                </div>
                <div>
                    <Label for="password" class="mb-2 text-gray-900 font-semibold">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        bind:value={formData.password}
                        color={errors.password ? 'red' : 'base'}
                        class="bg-white border-gray-300 text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
                    />
                    {#if errors.password}
                        <Helper color="red">{errors.password}</Helper>
                    {/if}

                    
                    <div class="mt-4 space-y-2 text-sm">
                        <p class="font-semibold text-gray-900">Password Requirements:</p>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 border rounded-sm {passwordChecks.length ? 'bg-green-500' : 'border-gray-300'}"></div>
                            <span class={passwordChecks.length ? 'text-green-500' : 'text-gray-700'}>At least 8 characters</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 border rounded-sm {passwordChecks.uppercase ? 'bg-green-500' : 'border-gray-300'}"></div>
                            <span class={passwordChecks.uppercase ? 'text-green-500' : 'text-gray-700'}>One uppercase letter</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 border rounded-sm {passwordChecks.lowercase ? 'bg-green-500' : 'border-gray-300'}"></div>
                            <span class={passwordChecks.lowercase ? 'text-green-500' : 'text-gray-700'}>One lowercase letter</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 border rounded-sm {passwordChecks.number ? 'bg-green-500' : 'border-gray-300'}"></div>
                            <span class={passwordChecks.number ? 'text-green-500' : 'text-gray-700'}>One number</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 border rounded-sm {passwordChecks.special ? 'bg-green-500' : 'border-gray-300'}"></div>
                            <span class={passwordChecks.special ? 'text-green-500' : 'text-gray-700'}>One special character</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Label for="confirmPassword" class="mb-2 text-gray-900 font-semibold">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        bind:value={formData.confirmPassword}
                        color={errors.confirmPassword ? 'red' : 'base'}
                        class="bg-white border-gray-300 text-gray-900 focus:border-[#800000] focus:ring-[#800000]"
                    />
                    {#if errors.confirmPassword}
                        <Helper color="red">{errors.confirmPassword}</Helper>
                    {/if}
                </div>
                <div class="flex gap-4">
                    <Button type="button" color="alternative" class="w-1/2" onclick={previousStep}>Back</Button>
                    <Button type="button" class="w-1/2 bg-[#800000] hover:bg-[#600000]" onclick={nextStep}>Next</Button>
                </div>
            </div>
        {/if}

        {#if currentStep === 4}
            <div class="space-y-6">
                <div>
                    <Label for="documents" class="mb-2 text-gray-900 font-semibold">Upload Required Documents</Label>
                    <p class="text-sm text-gray-700 mb-2">Please upload your school ID and registration form</p>
                    <Fileupload
                        id="documents"
                        name="documents"
                        bind:files={formData.documents}
                        accept=".pdf,.png,.jpg,.jpeg"
                    />
                </div>
                <div class="flex gap-4">
                    <Button type="button" color="alternative" class="w-1/2" on:click={previousStep}>Back</Button>
                    <Button type="submit" class="w-1/2 bg-[#800000] hover:bg-[#600000]">Submit</Button>
                </div>
            </div>
        {/if}
    </div>
</form>
</div>