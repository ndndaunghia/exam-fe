import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

type TypographyProps<T extends React.ElementType> = {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: T;
  responsive?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, 'variant' | 'className'>;

const Typography = <T extends React.ElementType = 'p'>({
  variant,
  children,
  className,
  as,
  responsive = false,
  ...props
}: TypographyProps<T>) => {
  const Component = as || variant;

  const getClassName = (): string => {
    const baseClasses: Record<TypographyVariant, string> = {
      h1: 'font-bold',
      h2: 'font-semibold',
      h3: 'font-semibold',
      h4: 'font-semibold',
      h5: 'font-medium',
      h6: 'font-medium',
      p: '',
    };

    const responsiveClasses: Record<TypographyVariant, string> = {
      h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
      h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
      h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
      h4: 'text-base sm:text-lg md:text-xl lg:text-2xl',
      h5: 'text-sm sm:text-base md:text-lg lg:text-xl',
      h6: 'text-xs sm:text-sm md:text-base lg:text-lg',
      p: 'text-sm sm:text-base',
    };

    const sizeClasses = responsive ? responsiveClasses[variant] : `text-${variant}`;

    return `${baseClasses[variant]} ${sizeClasses} ${className || ''}`.trim();
  };

  return (
    <Component className={getClassName()} {...props}>
      {children}
    </Component>
  );
};

export default Typography;