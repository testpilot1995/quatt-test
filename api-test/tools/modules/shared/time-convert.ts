
const { parseISO, formatISO } = require('date-fns');

export async function convertTime(received:string){
     return formatISO(parseISO(received));
}