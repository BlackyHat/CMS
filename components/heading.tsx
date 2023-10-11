import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  description: string;
  className?: string;
  descClassName?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  className,
  descClassName,
}) => {
  return (
    <div>
      <h2
        className={cn(
          'text-xl sm:text-3xl font-bold tracking-tight',
          className
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'text-xs sm:text-small text-muted-foreground',
          descClassName
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default Heading;
