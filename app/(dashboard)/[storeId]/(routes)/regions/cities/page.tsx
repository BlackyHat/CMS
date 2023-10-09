import CitiesClient from './components/client';
import { CityColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const CitiesPage = async ({ params }: { params: { regionId: string } }) => {
  const cities = await prismadb.city.findMany({
    where: { regionId: params.regionId },
    include: { region: true },
    orderBy: { name: 'asc' },
  });

  const formattedCities: CityColumn[] = cities.map(
    ({ id, name, region, createdAt }) => ({
      id,
      name,
      regionsLabel: region.name,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <CitiesClient data={formattedCities} />
      </div>
    </div>
  );
};

export default CitiesPage;
