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
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { BodyType, Category } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().min(3),
});

type BodyTypeFormValues = z.infer<typeof formSchema>;

interface BodyTypeFormProps {
  initialData: BodyType | null;
}

const BodyTypeForm: React.FC<BodyTypeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit body type' : 'Create body type';
  const description = initialData ? 'Edit a body type' : 'Add a body type';
  const toastMessage = initialData
    ? 'Body type updated.'
    : 'body type created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BodyTypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '', imageUrl: '' },
  });

  const onSubmit = async (data: BodyTypeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/bodyTypes/${params.bodyTypeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/bodyTypes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products/bodyTypes`);
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
        `/api/${params.storeId}/bodyTypes/${params.bodyTypeId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/products/bodyTypes`);
      toast.success('Body type deleted.');
    } catch (error) {
      toast.error(
        'Make sure  you removed all products using this Body type first.'
      );
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body Type URL</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      placeholder="Body Type label"
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

export default BodyTypeForm;