'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

export type MakeColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<MakeColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
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
