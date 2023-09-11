import MakesClient from './components/client';
import { MakeColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const MakesPage = async ({ params }: { params: { storeId: string } }) => {
  const makes = await prismadb.make.findMany({
    where: { storeId: params.storeId },
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MakesClient data={formattedMakes} />
      </div>
    </div>
  );
};

export default MakesPage;
