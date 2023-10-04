import Heading from '@/components/heading';
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

const FormContactInfo = ({ loading }: { loading: boolean }) => {
  const { control } = useFormContext();
  return (
    <>
      <Heading
        title="Contact information"
        description="Enter contact information"
        className="text-xl"
      />
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PatternFormat
                  format="+38 (###) ###-##-##"
                  disabled={loading}
                  placeholder="+38 (099) 123 45 67"
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
      </div>
    </>
  );
};
export default FormContactInfo;
