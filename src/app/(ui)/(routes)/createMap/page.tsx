import CreateMapPageBar from "@/src/app/(ui)/components/features/CreateMapPageBar/CreateMapPageBar";
import ButtonBack from "../../components/common/ButtonBack/ButtonBack";

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