'use client';

import Heading from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Region } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
});

type RegionFormValues = z.infer<typeof formSchema>;

interface RegionFormProps {
  initialData: Region | null;
}

const RegionForm: React.FC<RegionFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit region' : 'Create region';
  const description = (
    initialData ? 'Edit a region' : 'Add a new region'
  ).concat(' *Only for users with admin rights.');
  const toastMessage = initialData ? 'Region updated.' : 'Region created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<RegionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '' },
  });

  const onSubmit = async (data: RegionFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/regions/${params.regionId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/regions`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/regions`);
      toast.success(toastMessage);
    } catch (error) {
      const errorMessage = 'Something went wrong.';
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.statusText || errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/regions/${params.regionId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/regions`);
      toast.success('Region deleted.');
    } catch (error) {
      const errorMessage =
        'Make sure you removed all products using this region first.';
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.statusText || errorMessage);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
          descClassName="text-red-600"
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Region name"
                      onRemove={() => field.onChange('')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegionForm;
