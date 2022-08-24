import * as cookie from 'cookie';
import { prisma } from '$lib/db'

export async function POST({request}){
    const request_data = await request.json();
    /* console.log(request_data); */
    const seach_data = await prisma.users.findFirst({
        where:{
            user_name:request_data.inputUserName,
            user_password:request_data.inputPassword
        }
    });
    console.log(seach_data);
    if(seach_data){

        return{
            status:200,
            body:{
                searchStatus:true,
                message:'You were there man!',
                
            },
            headers: {
                'Set-Cookie': cookie.serialize('myCookie', seach_data.id, {
                    path: '/',
                    httpOnly: true
                })
            }
        }
    }
    return{
        status:200,
        body:{
            searchStatus:false,
            message: 'No',
            
        },
    }
}