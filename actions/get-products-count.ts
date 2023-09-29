import prismadb from '@/lib/prismadb';

export const getProductsCount = async (storeId: string) => {
  const productsCounts = await prismadb.product.count({
    where: {
      storeId,
    },
  });

  return productsCounts;
};
