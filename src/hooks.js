import * as cookie from 'cookie';
import { prisma } from '$lib/db';
export const handle = async({event,resolve}) => {
    const cookieHeader = event.request.headers.get('cookie')
    const cookies = cookie.parse(cookieHeader ?? '');
    if (!cookies.myCookie) {
        return await resolve(event)
    }
    const userdata = await prisma.users.findFirst({
        where:{
            id:parseInt(cookies.myCookie)
        }
    });
    if(userdata){
        event.locals.user = {
            user_fname: userdata.user_fName,
            user_lname: userdata.user_lName,
            user_id: userdata.id,
        }
    }
    return await resolve(event);
}

export const getSession = ({ locals }) => {
    if (!locals.user) return {}
    return {
        payload: locals.user
    }
  }