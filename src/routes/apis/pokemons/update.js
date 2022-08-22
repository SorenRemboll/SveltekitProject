import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const GET = async () => {
   
    createAbilityEntry(803)
    
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
    const conn = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+ID_TO_CHECK);
    const data = await conn.json();

    let description = data.flavor_text_entries.find(e => e.language.name == 'en' && e.version.name == 'sword')?.flavor_text;
    if (!description) {
        description = data.flavor_text_entries.find(e => e.language.name == 'en' && e.version.name == 'ultra-sun').flavor_text;
    }
    const pkmnUpdate = await prisma.pokemon.update({
        where:{
            id:ID_TO_CHECK
        },
        data:{
            species:data.genera.find(e=>e.language.name == 'en').genus,
            description: description,

        }
    });
    console.log(pkmnUpdate);
    
    if (pkmnUpdate) {
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
