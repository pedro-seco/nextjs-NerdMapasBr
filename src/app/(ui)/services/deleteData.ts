export default async function deleteData(url:string) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok){
        throw new Error (`Erro ao deletar: ${response.statusText}`);
    }

    return;
}