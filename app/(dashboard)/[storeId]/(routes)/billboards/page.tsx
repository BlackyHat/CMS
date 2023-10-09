import BillboardClient from './components/client';
import { BillboardColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    ({ id, label, createdAt }) => ({
      id,
      label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
