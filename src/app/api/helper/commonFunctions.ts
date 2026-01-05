export function isIdValid(id:number){
    
    if(!Number.isInteger(id) || id <= 0) {
        return false
    }
    return true
}

export function isNameValid(name:string){
    const trimmedName = name.trim().length ;
    if (trimmedName === 0 || trimmedName < 3 || trimmedName > 35){
        return true
    }
    
    return false
}

export function isBodyValid(body:any){
    
    if (body === null || isNameValid(body.name)){
        return true
    }
    return false
}

export function isAtributeMissing(atribute:any){
    if (atribute === null){
        return true
    }
    return false
}