<script>
	import Header from '$lib/utilityComps/header.svelte';
    import "/src/assets/app.css";
    const keyboardHandler = (event) =>{ 
        if(event.key === 'Enter'){
            document.activeElement.click();
        }
    }
</script>
<Header/>
<main class=" w-4/5 mx-auto p-10" on:keypress="{keyboardHandler}">
    <slot></slot>
</main>

