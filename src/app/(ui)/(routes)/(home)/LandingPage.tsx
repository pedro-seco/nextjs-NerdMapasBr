'use client'

import ListOfMaps from "../../components/features/ListOfMaps/ListOfMaps";
import Link from "next/link";
import { useFilter } from "../../components/hooks/useFilter";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import useMaps from "../../components/hooks/useMaps";

export default function LandingPage() {
  const {allMaps, updateMaps} = useMaps();
  const {searchQuery, setSearchQuery, filteredData} = useFilter(allMaps, (map) => map.name);

  return (
    <div className="h-full p-8 sm:p-6">
      <main className="h-full grow flex flex-col items-center justify-center w-full pb-10">
        <div className="search-default gap-2">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por um mapa..."
          />
        </div>
        <div className=" relative w-1/2 min-w-100">
          <div className="absolute -top-4 right-4 px-2 bg-[#232121] z-10">
            <Link href="/createMap" className="btn-create-default text-xl">+ Criar Mapa</Link>
          </div>  
          <ListOfMaps
            maps={filteredData}
            onUpdate={updateMaps}
          />
        </div>
      </main>
    </div>
  );
}