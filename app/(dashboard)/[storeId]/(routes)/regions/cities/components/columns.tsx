'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

export type CityColumn = {
  id: string;
  name: string;
  regionsLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CityColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'regionsLabel',
    header: 'Region',
    cell: ({ row }) => row.original.regionsLabel,
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
