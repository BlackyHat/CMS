import SelectedItems from './selected-items';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface FieldOptions {
  name?: string;
  label?: string;
  id: string;
}
interface FormProductSelectProps {
  loading: boolean;
  fieldName: string;
  label: string;
  fieldOptions: (string | FieldOptions)[];
}

const FormProductSelect: React.FC<FormProductSelectProps> = ({
  fieldName,
  label,
  loading,
  fieldOptions,
}) => {
  const { register, control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger {...register(fieldName)}>
                <SelectValue
                  defaultValue={field.value}
                  placeholder={`Select a ${label}`}
                  className="capitalize"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectedItems options={fieldOptions} />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormProductSelect;
