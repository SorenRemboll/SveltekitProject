<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();


    export let label = '';
    export let min = '';
    export let max = '';
    let value = '';
    let state = 'default';
    let errors = [];
    $:{
            dispatch('valid',{
                label,
                value,
                state
            })
    }    $:{
        if(value != ''){
            errors = [];
            if(value.length < min){
                errors = [...errors,`${label} is too short`]
            }
            if(value.length > max){
                errors = [...errors,`${label} is too long`]
            }
            state = errors.length == 0 ? 'valid' : 'invalid';
        }
        else{
            errors = [];
            state = 'default'
        }
    }
</script>
<label for="" class="border border-slate-300 p-4 rounded-xl my-4 shadow-lg">
    <p class="text-lg">{label} <span class=" text-xs ">(Must be between {min} and {max})</span></p>
    
    <input type="text" class="px-2 pb-0 {state} focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
    bind:value={value}
    >
    {#each errors as error}
    <p class="text-red-600 ml-4">{error}</p>
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