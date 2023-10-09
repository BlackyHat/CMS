import RegionsNav from '@/components/regions-nav';
import React from 'react';

export default async function RegionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RegionsNav />
      {children}
    </>
  );
}
