import prismadb from '@/lib/prismadb';

export const getArchivedProductsCount = async (storeId: string) => {
  const productsArchivedCounts = await prismadb.product.count({
    where: {
      storeId,
      isArchived: true,
    },
  });

  return productsArchivedCounts;
};
