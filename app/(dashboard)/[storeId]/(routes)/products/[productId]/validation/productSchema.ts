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
  name: z.string().min(1),
  mileage: z.coerce.number().min(1),
  year: z.coerce.number().min(1925).max(new Date().getFullYear()),
  fuel: z.nativeEnum(FuelType),
  gearbox: z.nativeEnum(GearboxType),
  typeOfDrive: z.nativeEnum(TypeOfDriveOption),

  regionId: z.string().min(1),
  cityId: z.string().min(1),
  description: z.string().min(1).max(2000),
  phone: z.string().min(7),

  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  bodyTypeId: z.string().min(1),
  makeId: z.string().min(1),
  modelId: z.string().min(1),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),

  engineSize: z.string().min(1).optional().nullable(),
  vinCode: z.string().min(1).optional().nullable(),
  headlights: z.nativeEnum(Headlights).optional(),
  spareTire: z.nativeEnum(SpareTire).optional(),
  interiorMatherial: z.nativeEnum(InteriorMatherial).optional(),

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
});
