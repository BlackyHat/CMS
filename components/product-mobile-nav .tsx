'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const ProductNav = ({
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
    <Sheet>
      <SheetTrigger className="mx-4 p-4 flex items-center gap-x-4">
        <SlidersHorizontal className="h-4 w-4" /> Product Overview
      </SheetTrigger>
      <SheetContent className="w-[200px]">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>Product navigation</SheetTitle>
          <SheetDescription className="text-[10px] text-muted-foreground">
            Select params to view or edit.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex lg:space-x-6 mx-6 flex-col items-start space-x-0 gap-y-2">
          {routes.map((route) => (
            <SheetClose key={route.href} asChild>
              <Link
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
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default ProductNav;
