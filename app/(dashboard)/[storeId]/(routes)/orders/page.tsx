import OrderClient from './components/client';
import { OrderColumn } from './components/columns';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedOrders: OrderColumn[] = orders.map(
    ({ id, phone, address, orderItems, isPaid, createdAt }) => ({
      id,
      phone,
      address,
      products: orderItems
        .map((orderItem) => orderItem.product.name)
        .join(', '),
      totalPrice: formatter.format(
        orderItems.reduce((total, orderItem) => {
          return total + Number(orderItem.product.price);
        }, 0)
      ),
      isPaid,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
