<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { pokemonStoreWriteable } from '/src/stores/pokemonStore.js';
    import { debounce } from '$lib/commonJS/debounce.js';
    const dispatch = createEventDispatcher();
    let filteredPokemonArray = [];
    
	//pokemon variables
    let searchNameString = '';

    //types variables
	let searchTypeArray = [];
	let searchTypeString = '';
	let types = [];
	let temp_types = [];
	let typesInputField = '';

	let showTypes = false;
	onMount(async () => {
		const conn = await fetch('/apis/pokemons/types');
		const data = await conn.json();
		types = [...data.types];
		temp_types = types;
		
	});
    const bounceSearch = debounce(()=>{
		let filterTarget = $pokemonStoreWriteable;
			if(filteredPokemonArray.length){
				filterTarget = filteredPokemonArray;
			}
		filteredPokemonArray = filterTarget.filter((e) =>
			e.name.toLowerCase().includes(searchNameString.toLowerCase())
		);
		console.log(filteredPokemonArray);
        dispatchFilteredList()
    },300);

    const bounceReset = debounce(()=>{
        filteredPokemonArray = [...$pokemonStoreWriteable];
		
		dispatchFilteredList()
    },300);
	
	const dispatchFilteredList = () => {
		
		dispatch('alteredPokemonList',{
                filteredPokemonArray
            })
	}
    const inputHandler = () => {
        if(searchNameString !== ''){
            bounceSearch();
        }else{
            bounceReset()
        }
    }
	
	$: {
		//show search results
		if (searchTypeString !== '') {
            showTypes = true;
            
			temp_types = types;
			temp_types = temp_types.filter((e) =>
				e.name.toLowerCase().includes(searchTypeString.toLowerCase())
			);
		} else {
			temp_types = types;
            showTypes = false;
		}
		if (searchTypeArray.length) {
			temp_types = temp_types.filter((e) => !searchTypeArray.includes(e));
		}
	}
	$:{
		//remove types from list and filter list
		if (searchTypeArray.length) {
			console.log('typeCheck');
			let filterTarget = $pokemonStoreWriteable;
			if(filteredPokemonArray.length){
				filterTarget = filteredPokemonArray;
			}
			filteredPokemonArray = filterTarget.filter(pokemon => {
				for (let i = 0; i < searchTypeArray.length; i++) {
					const type = searchTypeArray[i];
					for (let x = 0; x < pokemon.types.length; x++) {
						const pType = pokemon.types[x];
						if(JSON.stringify(pType) == JSON.stringify(type)){
							return true
						}
					}
				}
			});
			dispatchFilteredList()
		}
	}
	$:{
		if(searchTypeArray.length == 0)
			filteredPokemonArray = [...$pokemonStoreWriteable]
				dispatchFilteredList()
	}
</script>

<div class="w-4/5 mx-auto mb-8 bg-slate-50 border border-green-300 relative z-30">
	<p class=" text-center text-xl mt-2">Search for pokémon</p>
	<div class="grid grid-rows-2 gap-2">
		<label for="" class=" bg-white border border-slate-300 p-4 rounded-xl my-4 shadow-lg m-4">
			<p class="text-xl mb-2">Name of the pokémon:</p>
			<input
				type="text"
				bind:value={searchNameString}
                on:input="{inputHandler}"
				class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
			/>
		</label>
		<label
			for=""
			class="bg-white border border-slate-300 grid grid-cols-2 p-4 rounded-xl my-4 shadow-lg m-4"
		>
			<div class="inputWrapper">
				<p class="text-xl">Type of the pokemon:</p>
				<div class="relative">
					<input
						type="text"
						bind:this={typesInputField}
						bind:value={searchTypeString}
						class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					/>
					{#if showTypes}
						<div class=" absolute top-full w-40 bg-white border-x border-b z-10">
							{#each temp_types as type}
								<p 
									on:click={() => {
										searchTypeArray = [...searchTypeArray, type];
										searchTypeString = '';
										typesInputField.focus();
									}}
									tabindex="0"
									class="hover:bg-green-100 transition border-b p-2 outline-none focus:bg-green-100 cursor-pointer"
								>
									{type.name}
								</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<div class="selectedTypesWrapper grid grid-cols-4">
				{#each searchTypeArray as selectedType}
					<p on:click="{()=>{						
						searchTypeArray = searchTypeArray.filter(e => e != selectedType);
					}}" class="outline-green-300 typeNode">{selectedType.name}</p>
				{/each}
			</div>
		</label>
	</div>
</div>
