import { getGraphProductsCreated } from '@/actions/get-graph-products';
import { getArchivedProductsCount } from '@/actions/get-products-archived';
import { getProductsCount } from '@/actions/get-products-count';
import { getFeaturedProductsCount } from '@/actions/get-products-featured';
import Heading from '@/components/heading';
import Overview from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign, Package } from 'lucide-react';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const productsCount = await getProductsCount(params.storeId);
  const productsByMonth = await getGraphProductsCreated(params.storeId);
  const productsFeaturedCounts = await getFeaturedProductsCount(params.storeId);
  const productsArchivedCounts = await getArchivedProductsCount(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 sm:grid-cols-3 grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <DollarSign className="h-4 w-4 to-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{productsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Featured products
              </CardTitle>
              <CreditCard className="h-4 w-4 to-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{productsFeaturedCounts}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products in Archive
              </CardTitle>
              <Package className="h-4 w-4 to-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productsArchivedCounts}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={productsByMonth} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
