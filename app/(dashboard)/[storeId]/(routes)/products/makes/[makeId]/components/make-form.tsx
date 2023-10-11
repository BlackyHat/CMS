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
import { Make } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  label: z.string().min(1),
});

type MakeFormValues = z.infer<typeof formSchema>;

interface MakeFormProps {
  initialData: Make | null;
}

const MakeForm: React.FC<MakeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit makes' : 'Create makes';
  const description = initialData ? 'Edit a makes' : 'Add a makes';
  const toastMessage = initialData ? 'Makes updated.' : 'Makes created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<MakeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '' },
  });

  const onSubmit = async (data: MakeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/makes/${params.makeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/makes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products/makes`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/makes/${params.makeId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/products/makes`);
      toast.success('Make deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products using this Make first.');
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
        <Heading title={title} description={description} />
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Make label"
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

export default MakeForm;
