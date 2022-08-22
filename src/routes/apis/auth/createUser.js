import { prisma } from '$lib/db';
import * as cookie from 'cookie';
export const POST = async({request}) => {
    const request_data = await request.json();
    let createdUser = false;
    try {
        createdUser = await prisma.users.create({
            data:{
                user_fName:request_data.user_fName,
                user_lName:request_data.user_lName,
                user_name:request_data.user_name,
                user_password:request_data.user_password,
            }
        });
    } catch(error){
        console.log(error);
    }
    if (createdUser) {
        return{
            status:200,
            body:{
                redirect: true
            },
            headers: {
                'Set-Cookie': cookie.serialize('myCookie', createdUser.id, {
                    path: '/',
                    httpOnly: true
                })
            }
        } 
    }
    return{
        status:200,
        body:{
            redirect: false
        }
    }
    
}