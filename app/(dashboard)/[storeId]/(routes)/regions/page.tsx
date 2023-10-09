import RegionsClient from './components/client';
import { RegionColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const RegionsPage = async () => {
  const regions = await prismadb.region.findMany({
    orderBy: { name: 'asc' },
  });

  const formattedRegions: RegionColumn[] = regions.map(
    ({ id, name, createdAt }) => ({
      id,
      name,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <RegionsClient data={formattedRegions} />
      </div>
    </div>
  );
};

export default RegionsPage;
