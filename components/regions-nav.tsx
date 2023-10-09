'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const RegionsNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/regions`,
      label: 'Regions Overview',
      active: pathname === `/${params.storeId}/regions`,
    },
    {
      href: `/${params.storeId}/regions/cities`,
      label: 'Cities',
      active: pathname === `/${params.storeId}/regions/cities`,
    },
  ];
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6 mx-6', className)}
    >
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

export default RegionsNav;
