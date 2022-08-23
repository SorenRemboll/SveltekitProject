import { fetchMons, pokemonStoreWriteable } from '/src/stores/pokemonStore.js';
	import { get } from 'svelte/store';
	
	export const load = async() => {
		await fetchMons();
		return{
			filteredMon: [...get(pokemonStoreWriteable)],	
		}
	}