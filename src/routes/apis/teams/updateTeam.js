import { prisma } from "$lib/db"
export const PATCH = async( {request} ) => {
    const request_data = await request.json();    
        
    const updateObject = await prisma.team.update({
        where:{
            id:parseInt(request_data.team.id)
        },
        data:{
            team_name: request_data.team.team_name,
            pokemons:{
                set:request_data.team.pokemons.map(e => {return {id:parseInt(e.id)}})
            }
        }
    });
    if(updateObject){
        return{
            status:200,
            body:{
                updatedTeam:updateObject
            }
        }
    }else{
        return{
            status:200,
            body:{
                message: `Something went wrong with updating team ${request_data.team.team_name}`
            }
        }
    }
    
}