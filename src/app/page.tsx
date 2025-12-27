import Lists from "./products/_components/Lists";
import { getProducts } from "./services";

const Home = async () => {
  const data = await getProducts();
  return (
    <div>
      <Lists data={data} />
    </div>
  );
}

export default Home