import fetchData from "../../services/fetchData";
import LandingPage from "./LandingPage";

export default async function Home() {

  const data = await (fetchData('http://localhost:3000/api/maps', {cache: 'no-store'}));
  const maps = data || [];

  return (
    <div>
      <LandingPage maps={maps}/>
    </div>
  );
}