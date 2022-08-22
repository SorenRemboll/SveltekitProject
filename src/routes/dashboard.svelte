<script context="module">
	import { format } from '$lib/commonJS/teamFormatter.js';
    import TeamBlock from '$lib/teamComps/team-block.svelte';
    
   export const load = async ({ fetch, session }) => {
        if(Object.keys(session).length == 0){
            return{
                status:302,
                redirect:'/user'
            }
        }
        const conn = await fetch('/apis/teams/getUserTeams',{
            method:'POST',
            body:JSON.stringify({user_id:session.payload.user_id})
        });
        const data = await conn.json();
        format(data);
        return {
            status:200,
            props:{
                teamData:data.userTeams
            }
        }
    }
</script>
<script>
    import { teamStoreWriteable } from '/src/stores/teamStore.js';
    import Swal from 'sweetalert2'
    import { session } from '$app/stores';
    export let teamData;
    const updateTeamName = (index,newTeamName) => {
        Swal.fire({
			title:`Team ${teamData[index].team_name} is now ${newTeamName}`,
			position:'top-right',
			toast:true,
			timer:1500,
			showConfirmButton:false
		});
        teamData[index].team_name = newTeamName;
        saveTeam(teamData[index])
    }
    const removeFromTeam = async(mon,index) => {
		const dataArr = teamData[index].pokemons.filter(x => x.id != mon.id);
		if(!dataArr.length){
            deleteTeam(teamData[index])
			teamData = teamData.filter( (team,i) => index != i );
			return
		}
        teamData[index].pokemons = dataArr;
        saveTeam(teamData[index])
    } 
    const deleteTeam = async(team) => {
        const conn =  await fetch('/apis/teams/deleteUserTeam',{
            method:'POST',
            body:JSON.stringify({user_id:$session.payload.user_id,team})
        });
        
        if(conn.ok && conn.status == 202){
            teamData = teamData.filter(val => val.id != team.id);
        }
    }
    const takeToDex = (team) => {
        $teamStoreWriteable = [...$teamStoreWriteable,team];
        Swal.fire({
            title:'Added!',
            text:`Your team ${team.team_name} was added to editable table`,
            icon:'success',
            toast:true,
            timer:2000,
            position:'top-right',
            showConfirmButton:false
        })
    }
    const saveTeam = async (team) => {
        const conn = await fetch('/apis/teams/updateTeam',{
            method:'PATCH',
            body:JSON.stringify({user_id:$session.payload.user_id,team})
        });
        const data = await conn.json();
       
        Swal.fire({
            title:'Saved!',
            text:`Your team ${data.updatedTeam.team_name} has successfully updated`,
            icon:'success',
            toast:true,
            timer:2000,
            position:'top-right',
            showConfirmButton:false
        })
    }
</script>
<h1 class="text-center">Welcome {$session.payload.user_fname} {$session.payload.user_lname}!</h1>
<p class="text-center">Here are your teams:</p>
<div class="teamsWrapper grid grid-cols-2 gap-2">
    {#each teamData as team,i}    
        <TeamBlock {deleteTeam} {saveTeam} {removeFromTeam} {updateTeamName} {takeToDex} {team} {i}/>
    {/each}
</div>