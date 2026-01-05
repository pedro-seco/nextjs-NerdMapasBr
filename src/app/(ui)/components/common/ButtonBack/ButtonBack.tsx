'use client'
import { useRouter } from "next/navigation";

interface ButtonBackProps {
  route: string
}

export default function ButtonBack({route}:ButtonBackProps) {
  const router = useRouter();
  console.log(route);

  return(
      <div>
          <button onClick={() => route ? router.replace(route) : router.replace('/')} className="btn-default"> Voltar</button>
      </div>
  );
}