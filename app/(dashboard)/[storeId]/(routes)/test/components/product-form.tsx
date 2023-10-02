// 'use client';

// import Heading from '@/components/heading';
// import { AlertModal } from '@/components/modals/alert-modal';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import { PatternFormat, NumericFormat } from 'react-number-format';
// import * as z from 'zod';

// const phonePattern = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;
// const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/i;

// const formSchema = z.object({
//   mileage: z.coerce
//     .number()
//     .min(1)
//     .max(5000, { message: 'Enter the amount in thousands of kilometers.' })
//     .optional(),
//   phone: z
//     .string()
//     .refine((phone) => phonePattern.test(phone), {
//       message: 'Invalid phone number format. Example: "+38 (099) 123-45-67"',
//     })
//     .optional(),
//   price: z.coerce.number().min(1).max(10000000).optional(),
//   vinCode: z
//     .string()
//     .refine((code) => vinPattern.test(code), {
//       message: 'Invalid VIN-code. Example: "1HGCM82633A123456"',
//     })
//     .optional()
//     .nullable(),
// });

// type ProductFormValues = z.infer<typeof formSchema>;

// const ProductForm = () => {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const title = 'Create product';
//   const description = 'Add a product';
//   const action = 'Create';

//   const form = useForm<ProductFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       price: undefined,
//       mileage: undefined,
//       phone: undefined,
//       vinCode: undefined,
//     },
//   });

//   const onSubmit = async (data: ProductFormValues) => {
//     try {
//       setLoading(true);
//       console.log('DATA', data);
//     } catch (error) {
//       toast.error('Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AlertModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={() => {}}
//         loading={loading}
//       />
//       <div className="flex items-center justify-between">
//         <Heading title={title} description={description} />
//       </div>
//       <Separator />
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 w-full"
//         >
//           <Heading
//             title="Main information"
//             description="*The fields are mandatory"
//             className="text-xl"
//           />
//           <div className="grid grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="mileage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Kilometer</FormLabel>
//                   <FormControl>
//                     <NumericFormat
//                       thousandSeparator={true}
//                       allowNegative={false}
//                       decimalScale={0}
//                       suffix={' ths km.'}
//                       fixedDecimalScale={true}
//                       valueIsNumericString={true}
//                       disabled={loading}
//                       placeholder="Set a kilometers"
//                       customInput={Input}
//                       value={field.value}
//                       onValueChange={(values) => field.onChange(values.value)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Separator />
//           <Heading
//             title="Additional info"
//             description="Check some preset config of your car"
//             className="text-xl"
//           />
//           <div className="grid grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="vinCode"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Vin Code</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Vin-code"
//                       onChange={field.onChange}
//                       value={field.value || ''}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Separator />
//           <Heading
//             title="Cost of the car"
//             description="Enter the price of the car"
//             className="text-xl"
//           />
//           <div className="grid grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <FormControl>
//                     <NumericFormat
//                       thousandSeparator={true}
//                       allowNegative={false}
//                       decimalScale={0}
//                       suffix={' $'}
//                       fixedDecimalScale={true}
//                       valueIsNumericString={true}
//                       disabled={loading}
//                       placeholder="Set a price"
//                       customInput={Input}
//                       value={field.value}
//                       onValueChange={(values) => field.onChange(values.value)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Separator />

//           <Heading
//             title="Contact information"
//             description="Enter contact information"
//             className="text-xl"
//           />
//           <div className="grid grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone</FormLabel>
//                   <FormControl>
//                     <PatternFormat
//                       format="+38 (###) ###-##-##"
//                       disabled={loading}
//                       placeholder="+38 (099) 123 45 67"
//                       mask="_"
//                       customInput={Input}
//                       value={field.value}
//                       onValueChange={(values) =>
//                         field.onChange(values.formattedValue)
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button
//             disabled={loading}
//             className="ml-auto"
//             type="submit"
//             size="lg"
//           >
//             {action}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };
// export default ProductForm;
