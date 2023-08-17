import CategoryClient from './components/client.';
import { CategoryColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { Billboard } from '@prisma/client';
import { format } from 'date-fns';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: 'desc' },
  });

  const formattedCategories: CategoryColumn[] = categories.map(
    ({ id, name, billboard, createdAt }) => ({
      id,
      name,
      billboardLabel: billboard.label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
