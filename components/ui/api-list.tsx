import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';
import React from 'react';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
  variant?: 'admin' | 'admin_owner';
}

const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
  variant = 'admin',
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
      <ApiAlert
        title="POST"
        variant={variant}
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant={variant}
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
      <ApiAlert
        title="DELETE"
        variant={variant}
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />
    </>
  );
};

export default ApiList;
