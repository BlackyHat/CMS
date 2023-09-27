import ModelForm from './components/model-form';
import prismadb from '@/lib/prismadb';

const ModelsPage = async ({
  params,
}: {
  params: { storeId: string; modelId: string };
}) => {
  const model = await prismadb.model.findUnique({
    where: {
      id: params.modelId,
    },
  });

  const makes = await prismadb.make.findMany({
    where: { storeId: params.storeId },
    orderBy: { label: 'asc' },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ModelForm initialData={model} makes={makes} />
      </div>
    </div>
  );
};

export default ModelsPage;
