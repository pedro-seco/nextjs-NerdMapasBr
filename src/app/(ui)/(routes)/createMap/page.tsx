import CreateMapPageBar from "@/src/app/(ui)/components/features/CreateMapPageBar/CreateMapPageBar";
import ButtonBack from "../../components/common/ButtonBack/ButtonBack";

//TODO - Descomissionar essa página -> transformar em um componente createMap overlay de tela

export default function createMapPage() {
    return(
        <div className="h-screen p-2 sm:p-6">
          <main className="flex flex-col h-full w-full items-center justify-center gap-5">
            <div>
              <CreateMapPageBar/>
            </div>
            <div>
              <ButtonBack route={""}/>
            </div>
          </main>
        </div>
    );
}