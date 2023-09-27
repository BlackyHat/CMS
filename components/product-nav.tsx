'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const ProductsNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/products`,
      label: 'Products overview',
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/products/bodyTypes`,
      label: 'Body Types',
      active: pathname === `/${params.storeId}/products/bodyTypes`,
    },
    {
      href: `/${params.storeId}/products/makes`,
      label: 'Makes',
      active: pathname === `/${params.storeId}/products/makes`,
    },
    {
      href: `/${params.storeId}/products/models`,
      label: 'Models',
      active: pathname === `/${params.storeId}/products/models`,
    },
    {
      href: `/${params.storeId}/products/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/products/colors`,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default ProductsNav;
