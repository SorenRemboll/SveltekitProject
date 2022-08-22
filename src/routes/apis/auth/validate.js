import { prisma } from '$lib/db'

export async function POST({request}){
    const request_data = await request.json();
    const isUnique = await prisma.users.findUnique({
        where:{
            user_name:request_data.user_name
        }
    });
    let exists = false;
    if (isUnique) {
        exists = true;
    }
    return{
        status:200,
        body:{
            exists
        }
    }
}