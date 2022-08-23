import { writable } from "svelte/store";
export const pokemonStoreWriteable = writable([]);
export const fetchMons = async() => {
	const conn = await fetch('http://localhost:3000/apis/pokemons/allMons');
	const preData = await conn.json();
	console.log(preData);
	const arr = preData.returnData.map(e => {
		return {
			name: e.name,
			id: e.id,
			img: `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${e.name}.png`,
			types: e.type
		};
	});

	pokemonStoreWriteable.set(arr);
}
