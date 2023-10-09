import CityForm from './components/city-form';
import prismadb from '@/lib/prismadb';

const CitiesPage = async ({
  params,
}: {
  params: { storeId: string; cityId: string };
}) => {
  const city = await prismadb.city.findUnique({
    where: {
      id: params.cityId,
    },
  });

  const regions = await prismadb.region.findMany({
    orderBy: { name: 'asc' },
  });
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CityForm initialData={city} regions={regions} />
      </div>
    </div>
  );
};

export default CitiesPage;
