'use client';

import { MakeColumn, columns } from './columns';
import Heading from '@/components/heading';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface MakesClientProps {
  data: MakeColumn[];
}

const MakesClient: React.FC<MakesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Makes (${data.length})`}
          description="Manage makes for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/makes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for Makes" />
      <Separator />
      <ApiList entityName="makes" entityIdName="makeId" />
    </>
  );
};

export default MakesClient;
