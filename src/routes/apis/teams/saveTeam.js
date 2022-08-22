import {prisma} from '$lib/db';

export async function POST( {request} ){
    const request_data = await request.json();
    
    const createdTeam = await prisma.users.update({
        where:{
            id: parseInt(request_data.id)
        },
        data:{
            teams:{
                create:{
                    team_name: request_data.team.team_name,
                    pokemons: {
                        connect:request_data.team.pokemons.map(e => {return {id:e.id}}),
                    },
                    

                }
            }
        }
    });
    
    return{
        status:200,
        body:{
            message:'request_data'
        }
    }
}