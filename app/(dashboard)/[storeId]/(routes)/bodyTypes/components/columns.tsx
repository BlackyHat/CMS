'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

export type BodyTypeColumn = {
  id: string;
  name: string;
  categoryName: string;
  createdAt: string;
};

export const columns: ColumnDef<BodyTypeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
    cell: ({ row }) => row.original.categoryName,
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
