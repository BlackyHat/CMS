'use client';

import { BodyTypeColumn, columns } from './columns';
import Heading from '@/components/heading';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface BodyTypeClientProps {
  data: BodyTypeColumn[];
}

const BodyTypeClient: React.FC<BodyTypeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Body Types (${data.length})`}
          description="Manage Body Types for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/bodyTypes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Body Types" />
      <Separator />
      <ApiList entityName="bodyTypes" entityIdName="bodyTypesId" />
    </>
  );
};

export default BodyTypeClient;
