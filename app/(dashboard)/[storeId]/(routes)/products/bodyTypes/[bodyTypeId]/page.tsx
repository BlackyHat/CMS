import BodyTypeForm from './components/body-type-form';
import prismadb from '@/lib/prismadb';

const BodyTypesPage = async ({
  params,
}: {
  params: { bodyTypeId: string };
}) => {
  const bodyType = await prismadb.bodyType.findUnique({
    where: {
      id: params.bodyTypeId,
    },
  });
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BodyTypeForm initialData={bodyType} />
      </div>
    </div>
  );
};

export default BodyTypesPage;
