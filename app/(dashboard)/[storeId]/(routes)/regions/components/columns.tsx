'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

export type RegionColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<RegionColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
