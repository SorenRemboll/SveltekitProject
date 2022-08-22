<script context="module">
    export async function load({params}){
        const conn = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        const pokemonData = await conn.json();
        return {
            status: 200,
            props: {
                data:pokemonData
            }
        }
    }
</script>
<script>
    export let data;
    
</script>
<h1 class=" text-center text-4xl capitalize">{data.name}</h1>

<div class="wrapper bg-slate-800 p-10 grid grid-cols-2 gap-8">
    <div class="wrapper">
    <div class="types">
    <p class=" mb-2 text-lg">Typing:</p>
    <div class="typeWrapper flex gap-4">
        {#each data.types as type}
             <div class=" p-4 rounded text-black {type.type.name}">
                 <p class=" text-2xl font-bold capitalize">{type.type.name}</p>
             </div>
        {/each}
    </div>
</div>
    <div class="abilities">
        <p class=" text-lg">Abilities:</p>
        <div class="abilityWrapper flex gap-10 flex-row">
        {#each data.abilities as ability}  
            <div class=" {ability.is_hidden ? 'bg-slate-500' : ''} abilityBlock my-4 bg-slate-600">
                <p class=" p-4 rounded-4xl capitalize">{ability.ability.name}
                {#if ability.is_hidden}
                    <span class='italic font-bold'>hidden</span>
                {/if}
                </p>
            </div>
        {/each}
        </div>
    </div>
    <div class="stats">
        
    </div>
    </div>
    <div class="imageArea">
        <img class=" w-48 m-auto" src="{data.sprites.front_default}" alt="{data.name}">
    </div>
</div>
<style>
    .grass{
        background-color: rgb(40, 106, 40);
    }
    .ground{
        background-color: rgb(200, 97, 50);
    }
    .normal{
        background-color: white;
    }
    .flying{
        background-color: rgb(170, 170, 244);
    }
    .rock{
        background-color: rgba(205, 138, 114, 0.863);
    }
    .steel{
        background-color: rgb(186, 186, 186);
    }
    .fire{
        background-color: rgb(242, 59, 59);
    }
    .water{
        background-color: rgb(110, 110, 244);
    }
    .poison{
        background-color: rgb(196, 32, 196);
    }
    .bug{
        background-color: rgb(91, 205, 91);
    }
</style>