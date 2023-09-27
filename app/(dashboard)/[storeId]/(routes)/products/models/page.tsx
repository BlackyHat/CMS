import ModelsClient from './components/client';
import { ModelColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const ModelsPage = async ({ params }: { params: { makeId: string } }) => {
  const models = await prismadb.model.findMany({
    where: { makeId: params.makeId },
    include: { make: true },
    orderBy: { createdAt: 'asc' },
  });

  const formattedModels: ModelColumn[] = models.map(
    ({ id, label, make, createdAt }) => ({
      id,
      label,
      makesLabel: make.label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <ModelsClient data={formattedModels} />
      </div>
    </div>
  );
};

export default ModelsPage;
