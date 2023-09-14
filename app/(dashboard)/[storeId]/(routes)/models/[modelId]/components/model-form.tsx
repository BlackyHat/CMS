'use client';

import Heading from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Make, Model } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  label: z.string().min(1),
  makeId: z.string().min(3),
});

type ModelFormValues = z.infer<typeof formSchema>;

interface ModelFormProps {
  initialData: Model | null;
  makes: Make[];
}

const ModelForm: React.FC<ModelFormProps> = ({ initialData, makes }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit model' : 'Create model';
  const description = initialData ? 'Edit a model' : 'Add a model';
  const toastMessage = initialData ? 'Model updated.' : 'Model created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '', makeId: '' },
  });

  const onSubmit = async (data: ModelFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/models/${params.modelId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/models`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/models`);
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
        `/api/stores/${params.storeId}/models/${params.modelId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/models`);
      toast.success('Model deleted.');
    } catch (error) {
      toast.error('Make sure you removed all makes using this model first.');
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Model label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="makeId"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Make</FormLabel>
                  <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? makes.find((make) => make.id === field.value)
                                ?.label
                            : 'Select make'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 overflow-y-auto h-64"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search make..." />
                        <CommandEmpty>No make found.</CommandEmpty>
                        <CommandGroup>
                          {makes.map(({ label, id }) => (
                            <CommandItem
                              value={label}
                              key={label}
                              disabled={loading}
                              onSelect={() => {
                                form.setValue('makeId', id);
                                setOpenPopover(false);
                                false;
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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

export default ModelForm;
