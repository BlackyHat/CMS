import ProductsMobileNav from '@/components/product-mobile-nav ';
import ProductsNav from '@/components/product-nav';
import React from 'react';

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden min-[640px]:flex h-16 items-center px-4 max-w-screen-2xl m-auto">
        <ProductsNav className="mx-6" />
      </div>

      <div className="min-[639px]:hidden">
        <ProductsMobileNav />
      </div>
      {children}
    </>
  );
}
