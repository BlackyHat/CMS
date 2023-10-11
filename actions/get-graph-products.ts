import prismadb from '@/lib/prismadb';

interface GraphData {
  name: string;
  total: number;
}
export const getGraphProductsCreated = async (storeId: string) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
  });

  const mounthlyProduct: { [key: number]: number } = {};
  for (const product of products) {
    const month = product.createdAt.getMonth();

    mounthlyProduct[month] = (mounthlyProduct[month] || 0) + 1;
  }

  const graphData: GraphData[] = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 },
  ];

  for (const month in mounthlyProduct) {
    graphData[parseInt(month)].total = mounthlyProduct[parseInt(month)];
  }

  return graphData;
};
