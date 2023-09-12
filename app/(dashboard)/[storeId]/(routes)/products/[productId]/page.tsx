import ProductForm from './components/product-form';
import prismadb from '@/lib/prismadb';

const ProductsPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const bodyTypes = await prismadb.bodyType.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const makes = await prismadb.make.findMany({
    where: {
      storeId: params.storeId,
    },
    include: { models: true },
    orderBy: { label: 'asc' },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          bodyTypes={bodyTypes}
          makes={makes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
