import ProductsNav from '@/components/product-nav';
import React from 'react';

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-16 items-center px-4">
        <ProductsNav className="mx-6" />
      </div>
      {children}
    </>
  );
}
