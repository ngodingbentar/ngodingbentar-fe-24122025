import Lists from "./products/_components/Lists";
import { getProducts } from "./services";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: PageProps) => {
  const { search } = await searchParams;
  const query = typeof search === 'string' ? search : undefined;
  const data = await getProducts(query);

  return (
    <div>
      <Lists data={data} />
    </div>
  );
}

export default Home