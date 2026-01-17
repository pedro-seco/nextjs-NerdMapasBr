import Link from "next/link";
import { FaSquareGithub } from "react-icons/fa6";
import { GiBrazil } from "react-icons/gi";

export default function NavBar(){
    return(
        <nav className="h-10 mb-2 w-full flex justify-between items-center px-3 ml-1.5">
                <h2 className="flex w-full items-center text-3xl">
                    <Link href="/" className="flex hover:opacity-70">
                    NerdMapas
                    <div className="ml-2 mt-0.5">
                        <GiBrazil />
                    </div>
                    </Link>
                </h2>
            <div className="flex gap-10 items-center px-5">
                <Link href="/" className="hover:opacity-70 text-2xl"> Início</Link>
                <button className="text-2xl hover:opacity-70"> + Criar Mapa (TODO - implementar: popup na tela com redirect)</button>
                <Link href="https://github.com/pedro-seco/nextjs-NerdMapasBr" target="_blank" className="hover:opacity-70 text-4xl"><FaSquareGithub/></Link>
            </div>
        </nav>
    );
}