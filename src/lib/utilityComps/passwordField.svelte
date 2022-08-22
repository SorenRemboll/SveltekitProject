<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let min = '';
    export let max = '';
    export let label = '';
    let value = '';
    let confirmValue = '';
    let state = 'default';
    let confirmState = 'default';
    let criteria = {
        min_length: 'default_text',
        max_length: 'default_text',
        capialized: 'default_text',
        special: 'default_text',
        matching: 'default_text'
    }
    $:{
        dispatch('valid',{
            label,
            value,
            state
        })

    }   
    $:{
        if(value != ''){
            
            value.length > min ? criteria.min_length = 'valid_text' : criteria.min_length = 'invalid_text';
            value.length < max ? criteria.max_length = 'valid_text' : criteria.max_length = 'invalid_text';
            value.split('').filter( e => {
                if(e.toUpperCase() != e.toLowerCase() && e == e.toUpperCase()){
                    return e
                }
            }).length ? criteria.capialized = 'valid_text' : criteria.capialized = 'invalid_text';
            /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value) ? criteria.special = 'valid_text' : criteria.special = 'invalid_text';
            if (value == confirmValue) {
                criteria.matching = 'valid_text'
                confirmState = 'valid';
            }else{
                criteria.matching = 'invalid_text'
                confirmState = 'invalid';
            }
            if (criteria.min_length == 'valid_text' && criteria.max_length == 'valid_text' && criteria.capialized == 'valid_text' && criteria.special == 'valid_text' && criteria.matching == 'valid_text') {
                state = 'valid';
            }else{
                state = 'invalid';
            }
        }
        else{
            criteria = {
                min_length: 'default_text',
                max_length: 'default_text',
                capialized: 'default_text',
                special: 'default_text',
                matching: 'default_text'
            }
            state = 'default'
            confirmState = 'default'
        }
    }
</script>
<label for="" class="border border-slate-300 p-4 rounded-xl my-4 shadow-lg">
    <p class="text-lg">{label}</p>
    <input type="password" class="px-2 pb-0 {state} focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
    bind:value={value}
    >
    <p class="text-lg mt-4">Confirm {label}</p>
    <input type="password" class="px-2 pb-0 {confirmState} focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
    bind:value={confirmValue}
    >
    <div class="rules border border-black p-4 mt-2 text-sm">
        <p class="mb-2">Password <i>must</i> follow these criteria:</p>
        <p class="{criteria.min_length}" >Must be longer than {min} characters</p>
        <p class="{criteria.max_length}">Must be shorter than {max} characters</p>
        <p class="{criteria.capialized}">Must have a capitalized character</p>
        <p class="{criteria.special}">Must have a special character</p>
        <p class="{criteria.matching}">Passwords must match</p>
    </div>
    
</label>

<style>

    .valid{
        border-color: rgb(10, 153, 3);
    }
    .valid_text{
        color: rgb(10, 153, 3);
    }
    .invalid{
        border-color: rgb(252, 81, 81);
    }
    .invalid_text{
        color: rgb(252, 81, 81);
    }
    .invalid_text::after{
        content: ' \f00d';
        font-family: 'FontAwesome';
    }
    .valid_text::after{
        content: ' \f00c';
        font-family: 'FontAwesome';
    }
    .default_text::after{
        content: ' \f128';
        font-family: 'FontAwesome';
    }
</style>