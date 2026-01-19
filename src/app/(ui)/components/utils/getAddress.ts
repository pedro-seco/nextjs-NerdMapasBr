import { NominatingResponse } from "../../types/types";

export function getCleanAddress(item: NominatingResponse): string {
  const { address, name } = item;

  // 1. Tenta identificar o nome mais específico (O "O QUE")
  // Ordem de prioridade: Nome do POI > Rua > Bairro > Cidade
  const poiName = address.amenity || address.shop || address.building || address.aeroway || address.leisure;
  const street = address.road;
  const neighborhood = address.suburb || address.neighbourhood || address.city_district;
  const cityOrTown = address.city || address.town || address.municipality || address.village;

  // Definimos o 'mainPart' (a primeira parte da string)
  // Se o item tem um nome explícito (ex: "Hospital Samaritano"), usamos ele.
  // Caso contrário, tentamos pegar da rua, depois bairro, depois cidade.
  let mainPart = name || poiName || street || neighborhood || cityOrTown || "";

  // 2. Definimos o 'contextPart' (O "ONDE")
  // Se o principal for um POI ou Rua, o contexto é o Bairro ou Cidade.
  // Se o principal for um Bairro, o contexto é a Cidade.
  let contextPart = "";

  if (mainPart === poiName || mainPart === street) {
    // Ex: "Hospital Samaritano" -> Contexto: "Santa Cecília" ou "São Paulo"
    contextPart = neighborhood || cityOrTown || "";
  } else if (mainPart === neighborhood) {
    // Ex: "Ipanema" -> Contexto: "Rio de Janeiro"
    contextPart = cityOrTown || "";
  } 
  // Se o mainPart já for a cidade (ex: Ipanema-MG), não precisamos de contexto extra antes do estado

  // Limpeza: Evitar repetição (Ex: Cidade: Rio de Janeiro, Estado: Rio de Janeiro)
  // Mas manter para "Ipanema, Rio de Janeiro - RJ"
  if (contextPart === mainPart) contextPart = "";

  // 3. Estado
  const state = address.state || "";

  // 4. Montagem Final
  const parts: string[] = [];

  if (mainPart) parts.push(mainPart);
  if (contextPart) parts.push(contextPart);
  
  // Junta a primeira parte
  let finalString = parts.join(", ");

  // Adiciona o estado separado por traço
  if (state) {
     // Pequena verificação: Se a cidade e o estado forem iguais (Rio de Janeiro), 
     // e a string já terminar com esse nome, não adiciona o estado para não ficar "Rio de Janeiro - Rio de Janeiro"
     // A menos que seja um bairro (ex: Ipanema, Rio de Janeiro - Rio de Janeiro fica bom).
     // Para simplificar e manter padrão visual, vamos sempre adicionar, exceto se for idêntico.
     if (finalString !== state) {
         finalString += ` - ${state}`;
     }
  }

  return finalString;
}