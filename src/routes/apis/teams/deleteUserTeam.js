import { prisma } from "$lib/db";

export const POST = async({request}) => {
    const request_data = await request.json();
    const deleteObj = await prisma.team.delete({
        where:{
            id: parseInt(request_data.team.id)
        }
    })
    if(deleteObj){
        return{
            status:202,
            body:{
                message:`You deleted ${request_data.team.team_name}`
            }
        }
    }else{
        return{
            status:200,
            body:{
                message: 'Nothing was deleted'
            }
        }
    }
    
}