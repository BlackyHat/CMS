'use client';

import CellAction from './cell-action';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export type BodyTypeColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BodyTypeColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        alt={row.original.label}
        width={150}
        height={60}
        src={row.original.imageUrl}
      />
    ),
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
