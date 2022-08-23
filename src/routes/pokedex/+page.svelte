<script>
	import Card from '$lib/pokemonComps/card.svelte';
	import TeamViewer from '$lib/teamComps/teamViewer.svelte';
	import TeamSelector from '$lib/teamComps/team-selector.svelte';
	import SearchField from '$lib/pokemonComps/search.svelte';
	import Swal from 'sweetalert2';
	
	const rotateAll = () => {
		if (!document.querySelector('.firstLayer.rotated')) return;
		document.querySelector('.firstLayer.rotated').classList.remove('rotated');
	};
	
	export let filteredMon = [];
	const selectedMon = (event) => {
		monFromCard = event.detail.mon;
	};
	const flipMon = () => {
		newMonAdded = false;
	};
	const changeFilteredMon = (event) => {
		Swal.fire({
			title:`${event.detail.filteredPokemonArray.length} ${event.detail.filteredPokemonArray.length < 2 ? 'pokémon' : 'pokémons'} found`,
			position:'top-right',
			toast:true,
			timer:1500,
			showConfirmButton:false
		});
		filteredMon = event.detail.filteredPokemonArray;
	}
	let monFromCard = '';
	let newMonAdded = false;

</script>

<svelte:head>
	<title>Pokédex</title>
</svelte:head>
<SearchField on:alteredPokemonList={changeFilteredMon} />
<TeamViewer on:updateNotice={flipMon} {newMonAdded} />
<TeamSelector
	on:updateNotice={() => {
		newMonAdded = true;
	}}
	{monFromCard}
/>
<div class="mainWrapper grid grid-cols-5 gap-4">
	{#each filteredMon as mon}
		<Card
			on:noticeNew={() => {
				newMonAdded = true;
			}}
			on:selectedMon={selectedMon}
			{rotateAll}
			{mon}
		/>
	{/each}
</div>
