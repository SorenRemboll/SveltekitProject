import { prisma } from "$lib/db"

export const GET = async ({request}) =>{
    const types = await prisma.type.findMany()
    return{
        status:200,
        body:{
            types
        }
    }
}