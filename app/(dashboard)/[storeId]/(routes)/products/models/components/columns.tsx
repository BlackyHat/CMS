'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

export type ModelColumn = {
  id: string;
  label: string;
  makesLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<ModelColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'makesLabel',
    header: 'Make',
    cell: ({ row }) => row.original.makesLabel,
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
