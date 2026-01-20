import Link from "next/link";
import { FaSquareGithub } from "react-icons/fa6"; // Voltei para o ícone quadrado que você usava
import { GiBrazil } from "react-icons/gi";

export default function NavBar(){
    return(
        <nav className="w-full h-20 bg-[#141414] border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-50 shadow-lg">
            
            {/* Lado Esquerdo: Marca */}
            <div className="flex items-center">
                <Link href="/" className="group flex items-center hover:opacity-80 transition-opacity">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                        NerdMapas
                        <div className="text-emerald-500 mt-1">
                            <GiBrazil size={28} />
                        </div>
                    </h2>
                </Link>
            </div>

            {/* Lado Direito: Links */}
            <div className="flex items-center gap-8">
                <Link 
                    href="/" 
                    className="text-gray-300 hover:text-white text-lg font-medium transition-colors"
                >
                    Início
                </Link>
                
                <div className="h-6 w-px bg-white/10 hidden md:block"></div>

                <Link 
                    href="https://github.com/pedro-seco/nextjs-NerdMapasBr" 
                    target="_blank" 
                    className="text-gray-300 hover:text-white transition-colors"
                    title="GitHub"
                >
                    <FaSquareGithub className="text-4xl" />
                </Link>
            </div>
        </nav>
    );
}