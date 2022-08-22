<script>
	import { session } from '$app/stores';
    export let i;
    export let team;
    export let removeFromTeam;
    export let updateTeamName;
    export let saveTeam;
    export let deleteTeam = '';
    export let takeToDex = '';
    let editReady = false;
    let newTeamName = team.teamName;
</script>

<div class="teamWrapper-container relative p-4 mb-4 bg-slate-100 rounded ">
    {#if !editReady}
        <p on:click={()=>{editReady = !editReady}} class=" cursor-pointer group mb-2">Team Name: <span class=" font-extrabold text-black">{team.team_name}</span><i class=" group-hover:text-green-300 ml-2 transition fas fa-pencil-alt"></i></p>
        {#if $session?.payload}
            {#if takeToDex}
                <i on:click={takeToDex(team)} class=" absolute right-2 top-2 text-2xl cursor-pointer hover:text-green-300 transition hover:scale-110 fas fa-edit"></i>
            {:else}
                <i on:click={saveTeam(team)} class=" absolute right-4 top-4 text-2xl cursor-pointer hover:text-green-300 transition hover:scale-110 fas fa-save"></i>
            {/if}
            {#if deleteTeam}
                <i on:click={deleteTeam(team)} class=" hover:text-black text-2xl transition cursor-pointer absolute rounded right-4 top-12 text-red-600 fas fa-times" />
            {/if}
        {/if}
    {:else}
    <form on:submit|preventDefault={
        () => {
             updateTeamName(i,newTeamName);
            editReady = !editReady;
        }
    }>
        <input bind:value={newTeamName} class="newName mb-2 border-b focus:outline-none border-black bg-slate-100" type="text">
         <i on:click={()=>{updateTeamName(i,newTeamName);editReady = !editReady}} class=" fas fa-check"></i>
    </form>
    {/if}
    <div class="teamWrapper-mons mx-auto grid grid-cols-3 w-80 place-items-end over-x-scroll bg-slate-500">
        {#each team.pokemons as mon}
            <div class="monWrapper w-16 m-2 rounded h-16 flex items-center justify-center relative bg-slate-200 ">
                <i
                    on:click={removeFromTeam(mon,i)}
                    class=" hover:text-black transition cursor-pointer absolute top-2 rounded left-2 text-red-600 fas fa-times"
                />
                <img
                class="h-full w-full"
                    src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/{mon.name}.png"
                    alt="pokemon icon"
                />
            </div>
        {/each}
    </div>
</div>