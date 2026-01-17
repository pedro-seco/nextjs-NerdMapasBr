'use client'

import React, { useEffect, useState } from "react";
import ListOfMaps from "../../components/features/ListOfMaps/ListOfMaps";
import Link from "next/link";
import { MapWithPOIsDTO } from "@/src/app/api/maps/types";
import { useMaps } from "../../components/hooks/useMaps";
import { useFilter } from "../../components/hooks/useFilter";
import SearchBar from "../../components/common/SearchBar/SearchBar";

export default function Home() {
  const {fetchAllMaps} = useMaps();

  const [allMaps, setAllMaps] = useState<MapWithPOIsDTO[]>([]);
  const {searchQuery, setSearchQuery, filteredData} = useFilter(allMaps, (map) => map.name);

  useEffect(() => {
    const loadAll = async () => {
      const list = await fetchAllMaps();
      setAllMaps(list);
    }
    loadAll();
  }, [fetchAllMaps]);

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
          />
        </div>
      </main>
    </div>
  );
}