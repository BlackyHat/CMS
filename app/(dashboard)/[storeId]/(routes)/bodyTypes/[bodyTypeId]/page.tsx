import CategoryForm from './components/body-type-form';
import prismadb from '@/lib/prismadb';

const BodyTypesPage = async ({
  params,
}: {
  params: { bodyTypeId: string; storeId: string };
}) => {
  const bodyType = await prismadb.bodyType.findUnique({
    where: {
      id: params.bodyTypeId,
    },
  });
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={bodyType} categories={categories} />
      </div>
    </div>
  );
};

export default BodyTypesPage;
