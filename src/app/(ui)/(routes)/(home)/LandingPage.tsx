'use client'

import ListOfMaps from "../../components/features/ListOfMaps/ListOfMaps";
import { useFilter } from "../../components/hooks/useFilter";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import useMaps from "../../components/hooks/useMaps";
import CreateMapBar from "../../components/features/CreateMapBar/CreateMapBar";
import { FaMapMarkedAlt } from "react-icons/fa";
import ButtonDelete from "../../components/common/ButtonDelete/ButtonDelete";
import { ENTITIES } from "../../types/enums";

export default function LandingPage() {
  const { allMaps, updateMaps } = useMaps();
  const { searchQuery, setSearchQuery, filteredData } = useFilter(allMaps, (map) => map.name);

  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <main className="max-w-7xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700 pb-6">
          <div className="flex items-center gap-3">
            <FaMapMarkedAlt className="text-4xl text-white" /> 
            <div>
              <h1 className="text-3xl font-bold text-white">Meus Mapas</h1>
              <p className="text-gray-400 text-sm">Gerencie suas regiões e pontos de venda</p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <CreateMapBar onUpdate={updateMaps} />
          </div>
        </header>
        <div className="w-full max-w-lg">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por um mapa..."
          />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ListOfMaps
            maps={filteredData}
            onUpdate={updateMaps}
          />
        </section>
        {filteredData.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-end">
            <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">Zona de perigo:</span>
                <ButtonDelete
                    entity={ENTITIES.ALLMAPS}
                    onUpdate={updateMaps}
                />
            </div>
        </div>
    )}
      </main>
    </div>
  );
}