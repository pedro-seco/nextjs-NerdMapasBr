export async function getCityMaxBounds(query: string) {
  const url = `https://nominatim.openstreetmap.org/search?` +
    new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "5",
      adressdetails: "1",
      countrycodes: "br",
      featureType:	"city",
    });

  const response = await fetch(url, {
    headers: {
      "User-Agent": "teste-tecnico/1.0 (pedrinho.seco@gmail.com)",
      "Accept-Language": "pt-BR"
    },

    cache: "no-store",
  });

  if (!response.ok) throw new Error("Falha ao geocodificar cidade");

  const data = (await response.json()) as Array<{
    boundingbox: [string, string, string, string]; // [south, north, west, east]
    lat: string;
    lon: string;
    name:string;
  }>;

  if (!data.length) throw new Error("Cidade não encontrada");

  return data;
}