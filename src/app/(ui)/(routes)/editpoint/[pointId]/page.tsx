import EditPointPageBar from "../../../components/features/EditPointPageBar/EditPointPageBar";
import ButtonBack from "../../../components/common/ButtonBack/ButtonBack";
import { searchPOIs } from "@/src/app/api/points/[pointId]/service";
import { notFound } from "next/navigation";

interface EditPointPageProps {
  params: Promise<{pointId: string}>
}

export default async function editPointPage({params}: EditPointPageProps) {
  const resolvedParams = await params; 
  const pointId = Number(resolvedParams.pointId);
  const point = await searchPOIs(pointId);

  if (!point) {
    notFound();
  }

  return(
      <div className="h-screen p-2 sm:p-6">
        <main className="flex flex-col h-full w-full items-center justify-center gap-5">
          <div>
            <EditPointPageBar point={point}/>
          </div>
          <div>
            <ButtonBack route={`/maps/${point.mapId}`}/>
          </div>
        </main>
      </div>
  );
}