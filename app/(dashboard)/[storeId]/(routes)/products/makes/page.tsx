import MakesClient from './components/client';
import { MakeColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const MakesPage = async ({ params }: { params: { storeId: string } }) => {
  const makes = await prismadb.make.findMany({
    orderBy: { label: 'asc' },
  });

  const formattedMakes: MakeColumn[] = makes.map(
    ({ id, label, createdAt }) => ({
      id,
      label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <MakesClient data={formattedMakes} />
      </div>
    </div>
  );
};

export default MakesPage;
