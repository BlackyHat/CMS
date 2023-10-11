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
import { City, Region } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
  regionId: z.string().min(3),
});

type CityFormValues = z.infer<typeof formSchema>;

interface CityFormProps {
  initialData: City | null;
  regions: Region[];
}

const CityForm: React.FC<CityFormProps> = ({ initialData, regions }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit city' : 'Create city';
  const description = initialData ? 'Edit a city' : 'Add a city';
  const toastMessage = initialData ? 'City updated.' : 'City created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', regionId: '' },
  });

  const onSubmit = async (data: CityFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/cities/${params.cityId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/cities`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/regions/cities`);
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
        `/api/stores/${params.storeId}/cities/${params.cityId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/regions/cities`);
      toast.success('City deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products using this city first.');
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="City name"
                      onRemove={() => field.onChange('')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regionId"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Region</FormLabel>
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
                            ? regions.find(
                                (region) => region.id === field.value
                              )?.name
                            : 'Select region'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 overflow-y-auto h-64"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search region..." />
                        <CommandEmpty>No region found.</CommandEmpty>
                        <CommandGroup>
                          {regions.map(({ name, id }) => (
                            <CommandItem
                              value={name}
                              key={name}
                              disabled={loading}
                              onSelect={() => {
                                form.setValue('regionId', id);
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
                              {name}
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

export default CityForm;
