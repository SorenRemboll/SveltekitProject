<script>
import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let min = '';
    export let max = '';
    export let label = '';
    let value = '';
    let state = 'default';
    let errors = [];
    let timer;
    let isUnique = 'default';
    $:{
        dispatch('valid',{
            label,
            value,
            state
        })
    }
    $:{
        validate(value)
    }
    const validate = () => {
        if(value != ''){
            errors = [];
            if(value.length < min){
                errors = [...errors,`${label} is too short`]
            }
            if(value.length > max){
                errors = [...errors,`${label} is too long`]
            }
            if(!errors.length){
               debounce()
            }else{
                state = 'invalid'
            }
            
        }
        else{
            isUnique = 'default'
            errors = [];
            state = 'default'
        }
    }

    
	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(async() => {
			const conn = await fetch('/apis/auth/validate',{
                method: 'POST',
                body:JSON.stringify({user_name:value})
            });
            const data = await conn.json();
            if (data.exists) {
                isUnique = false
                errors = [...errors,'This username is taken'];
                state = 'invalid'
            }else{
                isUnique = true;
                state = 'valid'
            }
            state = errors.length == 0 ? 'valid' : 'invalid';

		}, 1000);
	}
    
</script>
<label for="" class="border border-slate-300 p-4 rounded-xl my-4 shadow-lg">
    <p class="text-lg"> {label} <span class=" text-xs ">(Must be between {min} and {max} and unique 
    {#if isUnique == 'default'}
        <i class=" text-slate-600 fas fa-question"></i>   
    {:else if isUnique}
         <i class=" text-green-300 fas fa-check"></i>
    {:else}
        <i class=" text-red-600 fas fa-times"></i>
    {/if})</span> </p>
    
    <input type="text" class="px-2 pb-0 {state} focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
    bind:value={value}
    >
    {#each errors as error}
        <p class="text-red-600 m-4">{error}</p>
    {/each}
</label>

<style>

    .valid{
        border-color: rgb(10, 153, 3);
    }
    .invalid{
        border-color: rgb(252, 81, 81);
    }
</style>