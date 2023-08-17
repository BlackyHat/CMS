import ProductClient from './components/client';
import { ProductColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: { category: true, size: true, color: true },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProducts: ProductColumn[] = products.map(
    ({
      id,
      name,
      isFeatured,
      isArchived,
      price,
      category,
      size,
      color,
      createdAt,
    }) => ({
      id,
      name,
      isFeatured,
      isArchived,
      price: formatter.format(price.toNumber()),
      category: category.name,
      size: size.value,
      color: color.value,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
