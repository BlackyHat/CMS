import { Button } from './button';
import { cn } from '@/lib/utils';
import { XCircle } from 'lucide-react';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onRemove?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onRemove, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 pr-6 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {onRemove && props.value && (
          <Button
            className="absolute right-0 top-[50%] translate-y-[-50%]"
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <XCircle className="w-4 h-4 stroke-red-600" />
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
