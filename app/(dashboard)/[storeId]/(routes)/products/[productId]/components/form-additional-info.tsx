import Heading from '@/components/heading';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

const FormAdditionalInfo = ({ loading }: { loading: boolean }) => {
  const { control } = useForm();
  return (
    <>
      <Heading
        title="Additional info"
        description="Check some preset config of your car"
        className="text-xl"
      />
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="engineSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine Size</FormLabel>
              <FormControl>
                <PatternFormat
                  format="%.% L"
                  patternChar="%"
                  disabled={loading}
                  placeholder="Set an engine size"
                  mask="_"
                  customInput={Input}
                  value={field.value}
                  onValueChange={(values) =>
                    field.onChange(values.formattedValue)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="vinCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vin Code</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Vin-code"
                  onChange={field.onChange}
                  onRemove={() => field.onChange('')}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured</FormLabel>
                <FormDescription>
                  This product will appear on the home page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isArchived"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Archived</FormLabel>
                <FormDescription>
                  This product will not appear anywhere in the store.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="sportSeats"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Sport seats</FormLabel>
                <FormDescription>
                  Whether the car have sports seats.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="seatHeating"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Seat Heating</FormLabel>
                <FormDescription>
                  Whether the car have heated seats.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="seatVentilation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Seat Ventilation</FormLabel>
                <FormDescription>
                  Whether the car has seat ventilation.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="navigationSystem"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Navigation System</FormLabel>
                <FormDescription>
                  Whether the car has navigation system.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isofix"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Isofix</FormLabel>
                <FormDescription>
                  Whether the car has isofix system.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="electricSeatAdjustment"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Electric Seat Adjustment</FormLabel>
                <FormDescription>
                  Whether the car has electric seat adjustment.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="electricSideMirrors"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Electric Side Mirrors</FormLabel>
                <FormDescription>
                  Whether the car has electric side mirrors.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="electricWindows"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Electric Windows</FormLabel>
                <FormDescription>
                  Whether the car has electric windows.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="heatedSteeringWheel"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Heated Steering Wheel</FormLabel>
                <FormDescription>
                  Whether the car has heated steering wheel.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="androidAuto"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Android Auto</FormLabel>
                <FormDescription>
                  Whether the car has android auto.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="soundSystem"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Sound System</FormLabel>
                <FormDescription>
                  Whether the car has sound system.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="airConditioner"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Air Conditioner</FormLabel>
                <FormDescription>
                  Whether the car has air conditioner.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isCrashed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Crashed</FormLabel>
                <FormDescription>Is the car was damaged.</FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
export default FormAdditionalInfo;
