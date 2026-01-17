export default async function fetchData(url:string) {
    try{
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        return data
    } catch(error) {console.error(error); return;} 
}