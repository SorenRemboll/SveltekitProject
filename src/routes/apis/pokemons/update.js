import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const GET = async () => {
   
    createAbilityEntry(1)
    
	return {
		status: 200,
		body: {
			message:'Done'
        }
	}
};


const createAbilityEntry = async(ID_TO_CHECK) => {
    console.log(ID_TO_CHECK);
    if(ID_TO_CHECK == 899){
        console.log('Done');
        return
    }
    const conn = await fetch('https://pokeapi.co/api/v2/pokemon/'+ID_TO_CHECK);
    const data = await conn.json();
    console.log(data);
    let checkCounter = 0;
    for (let i = 0; i < data.stats.length; i++) {
        const element = data.stats[i];
        const insertedAbility = await prisma.pokemon.update({
            where:{
                id:ID_TO_CHECK
            },
            data:{
                stats:{
                    createMany:{
                        data:[{name:element.stat.name,value:element.base_stat}]
                    }
                }
            }
        });
        console.log(insertedAbility);
        if(insertedAbility){
            
            checkCounter++;
        }
    }
    console.log(checkCounter,data.stats.length);
    if (checkCounter == data.stats.length) {
        createAbilityEntry(ID_TO_CHECK + 1);
    } 
}
/* const getAnUpdate = async(mon,localTypes) => {
    const conn = await fetch(`https://pokeapi.co/api/v2/pokemon/${mon.id}`);
    const data = await conn.json();
    console.log(data);
    const connectArr = data.types.map(t => {
       return {id:localTypes.find(e => {
        if(e.name.toLowerCase() == t.type.name){
            return e.id
        }
       }).id}
    });
    const updateObj = await prisma.pokemon.update({
        where:{
            id:parseInt(mon.id)
        },
        data:{
            type:{
                connect: connectArr
            }
        }
    })
}
 */
