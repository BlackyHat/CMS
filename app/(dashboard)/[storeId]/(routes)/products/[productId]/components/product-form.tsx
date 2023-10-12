'use client';

import { formSchema } from '../validation/productSchema';
import FormAdditionalInfo from './form-additional-info';
import FormContactInfo from './form-contact-info';
import FormMainInfo from './form-main-info';
import Heading from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BodyType,
  Category,
  City,
  Color,
  Image,
  Make,
  Model,
  Product,
  Region,
} from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { NumericFormat } from 'react-number-format';
import * as z from 'zod';

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: (Product & { images: Pick<Image, 'url'>[] }) | null;
  categories: Category[];
  bodyTypes: BodyType[];
  makes: (Make & { models: Model[] })[];
  colors: Color[];
  regions: (Region & { cities: City[] })[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  bodyTypes,
  makes,
  colors,
  regions,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          name: undefined,
          images: [],
          price: undefined,
          categoryId: undefined,
          bodyTypeId: undefined,
          makeId: undefined,
          modelId: undefined,
          colorId: undefined,
          mileage: undefined,
          year: undefined,
          fuel: undefined,
          gearbox: undefined,
          typeOfDrive: undefined,
          description: undefined,
          regionId: undefined,
          cityId: undefined,
          isFeatured: false,
          isArchived: false,
          phone: undefined,

          engineSize: undefined,
          vinCode: undefined,
          headlights: undefined,
          spareTire: undefined,
          interiorMatherial: undefined,
          isCrashed: undefined,
          airConditioner: undefined,
          androidAuto: undefined,
          heatedSteeringWheel: undefined,
          electricWindows: undefined,
          electricSideMirrors: undefined,
          electricSeatAdjustment: undefined,
          isofix: undefined,
          navigationSystem: undefined,
          seatVentilation: undefined,
          seatHeating: undefined,
          soundSystem: undefined,
          sportSeats: undefined,
        },
  });
  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product' : 'Add a product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
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
        `/api/stores/${params.storeId}/products/${params.productId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error) {
      toast.error('Something went wrong.');
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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={methods.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images, add 2-3 photo</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onTop={(url) => {
                      const idx = field.value.findIndex(
                        (element) => element.url === url
                      );
                      if (idx !== -1) {
                        const elementToMove = field.value.splice(idx, 1)[0];
                        field.value.unshift(elementToMove);
                        field.onChange([...field.value]);
                      }
                    }}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                    value={field.value.map((image) => image.url)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMainInfo
            loading={loading}
            categories={categories}
            bodyTypes={bodyTypes}
            makes={makes}
            colors={colors}
            regions={regions}
          />

          <Separator />
          <Heading
            title="Description of the car"
            description="Enter additional information about the car, operating conditions, general technical condition, etc"
            className="text-xl"
          />
          <div className="max-w-4xl mr-auto">
            <FormField
              control={methods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your car. Max 2000 symbols"
                      className="resize-none h-[240px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />
          <FormAdditionalInfo loading={loading} />

          <Separator />
          <Heading
            title="Cost of the car"
            description="Enter the price of the car"
            className="text-xl"
          />
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-8">
            <FormField
              control={methods.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator={true}
                      allowNegative={false}
                      decimalScale={0}
                      suffix={' $'}
                      fixedDecimalScale={true}
                      valueIsNumericString={true}
                      disabled={loading}
                      placeholder="Set a price"
                      customInput={Input}
                      value={field.value}
                      onValueChange={(values) => field.onChange(values.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <FormContactInfo loading={loading} />

          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
            size="lg"
          >
            {action}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
export default ProductForm;
