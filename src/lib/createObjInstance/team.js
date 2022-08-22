import {getName} from '$lib/teamNameGenerator/coolTeamNameGenerator.js'
export const createTeam = () =>{
    return {
        team_name: getName(),
        pokemons:[]
    }
}