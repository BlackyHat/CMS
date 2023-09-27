import MakeForm from './components/make-form';
import prismadb from '@/lib/prismadb';

const MakesPage = async ({ params }: { params: { makeId: string } }) => {
  const make = await prismadb.make.findUnique({
    where: {
      id: params.makeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MakeForm initialData={make} />
      </div>
    </div>
  );
};

export default MakesPage;
