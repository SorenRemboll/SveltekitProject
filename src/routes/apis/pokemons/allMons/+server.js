import { prisma } from '$lib/db'
export const GET = async () => {
	const returnData = await prisma.Pokemon.findMany({
			include:{
				type:true
			}
		});
	return new Response(JSON.stringify(returnData))
}
