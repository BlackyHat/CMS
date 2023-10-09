import ProductClient from './components/client';
import { ProductColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      make: true,
      model: true,
      region: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProducts: ProductColumn[] = products.map(
    ({
      id,
      price,
      make,
      region,
      model,
      isFeatured,
      isArchived,
      createdAt,
    }) => ({
      id,
      isFeatured,
      isArchived,
      price,
      make: make.label,
      region: region.name,
      model: model.label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
