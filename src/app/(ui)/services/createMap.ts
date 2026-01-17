//TODO - IMPLEMENTAR FECTH DA API PARA CRIAR MAPAS

export default async function createMap(url:string) {
    try{
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        return data
    } catch(error) {console.error(error); return;} 
}