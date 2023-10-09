import RegionsNav from '@/components/regions-nav';
import React from 'react';

export default async function RegionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-16 items-center px-4 max-w-screen-2xl m-auto">
        <RegionsNav />
      </div>
      {children}
    </>
  );
}
