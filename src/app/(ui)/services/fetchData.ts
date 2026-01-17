export default async function fetchData(url:string, options: RequestInit = {}) {
    try{
        const response = await fetch(url, options);

        if (!response.ok){
            throw new Error (`Erro ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();
        return data
    } catch(error) {console.error(error); return;} 
}