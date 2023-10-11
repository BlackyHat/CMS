import { phonePattern, vinPattern } from '@/utils/constants/formPatterns';
import {
  FuelType,
  GearboxType,
  Headlights,
  InteriorMatherial,
  SpareTire,
  TypeOfDriveOption,
} from '@prisma/client';
import { z } from 'zod';

export const formSchema = z.object({
  //main required information

  images: z
    .object({ url: z.string() })
    .array()
    .refine((arr) => !!arr.length, {
      message: 'Try to add some photos of the car.',
    }),
  name: z.string().min(6).max(36),
  categoryId: z.string().min(1, {
    message: 'Select one of the categories.',
  }),
  bodyTypeId: z.string().min(1, { message: 'Select one of the body types.' }),
  makeId: z.string().min(1, { message: 'Select one of the makes.' }),
  modelId: z.string().min(1, { message: 'Select one of the models.' }),
  year: z.coerce
    .number()
    .min(1925, { message: 'Select the production year from the list.' })
    .max(new Date().getFullYear()),
  regionId: z.string().min(1, { message: 'Select one of the regions.' }),
  cityId: z.string().min(1, { message: 'Select one of the cities.' }),
  spareTire: z
    .nativeEnum(SpareTire, {
      errorMap: () => ({
        message: 'Type of spare tire is required to choose one.',
      }),
    })
    .optional(),
  interiorMatherial: z
    .nativeEnum(InteriorMatherial, {
      errorMap: () => ({
        message: 'Type of interior matherials is required to choose one.',
      }),
    })
    .optional(),
  headlights: z
    .nativeEnum(Headlights, {
      errorMap: () => ({
        message: 'Type of headlights is required to choose one.',
      }),
    })
    .optional(),

  //additional optional information

  mileage: z.coerce
    .number()
    .min(1)
    .max(5000, { message: 'Enter the mileage in thousands of kilometers.' }),
  fuel: z.nativeEnum(FuelType, {
    errorMap: () => ({ message: 'Fuel type is required to select one.' }),
  }),
  gearbox: z.nativeEnum(GearboxType, {
    errorMap: () => ({ message: 'Gearbox type is required to select one.' }),
  }),
  typeOfDrive: z.nativeEnum(TypeOfDriveOption, {
    errorMap: () => ({ message: 'Type of drive is required to select one.' }),
  }),
  colorId: z.string().min(1, { message: 'Select one of the colors set.' }),
  description: z.string().min(12).max(2000),
  engineSize: z.string().min(1).optional().nullable(),
  vinCode: z
    .string()
    .refine((code) => vinPattern.test(code), {
      message: 'Invalid VIN-code. Example: "1HGCM82633A123456"',
    })
    .optional()
    .nullable(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isCrashed: z.boolean().default(false).optional(),
  airConditioner: z.boolean().default(false).optional(),
  androidAuto: z.boolean().default(false).optional(),
  heatedSteeringWheel: z.boolean().default(false).optional(),
  electricWindows: z.boolean().default(false).optional(),
  electricSideMirrors: z.boolean().default(false).optional(),
  electricSeatAdjustment: z.boolean().default(false).optional(),
  isofix: z.boolean().default(false).optional(),
  navigationSystem: z.boolean().default(false).optional(),
  seatVentilation: z.boolean().default(false).optional(),
  seatHeating: z.boolean().default(false).optional(),
  soundSystem: z.boolean().default(false).optional(),
  sportSeats: z.boolean().default(false).optional(),

  //contact required information

  price: z.coerce
    .number()
    .min(1, { message: 'Need to set the price.' })
    .max(10000000),
  phone: z.string().refine((phone) => phonePattern.test(phone), {
    message: 'Invalid phone number format. Example: "+38 (099) 123-45-67"',
  }),
});
