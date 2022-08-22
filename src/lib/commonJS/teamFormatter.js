export const format = (arrayOfTeams) => {
    arrayOfTeams = arrayOfTeams.userTeams
    const formattedArrayOfTeams = arrayOfTeams.map(team => {
        const formattedPokemons = team.pokemons.map(pokemon => {
            return {
                name: pokemon.name,
                id: pokemon.id,
                img: `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon.name}.png`
            };
        });
        team.pokemons = formattedPokemons;
        return team
    });
}