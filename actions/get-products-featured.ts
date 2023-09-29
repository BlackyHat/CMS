import prismadb from '@/lib/prismadb';

export const getFeaturedProductsCount = async (storeId: string) => {
  const productsFeaturedCounts = await prismadb.product.count({
    where: {
      storeId,
      isFeatured: true,
    },
  });

  return productsFeaturedCounts;
};
