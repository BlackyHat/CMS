'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

export type ProductColumn = {
  id: string;
  make: string;
  model: string;
  price: number;
  region: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'make',
    header: 'Make',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  { accessorKey: 'isArchived', header: 'Archived' },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
