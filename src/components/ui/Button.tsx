'use client';

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const variantStyles = {
  primary: 'bg-primary text-background hover:bg-primary-dark border border-transparent',
  secondary: 'bg-secondary text-text-inverse hover:bg-secondary/80 border border-transparent',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-background',
  ghost: 'bg-transparent text-text-primary border border-transparent hover:text-primary',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

type ButtonBaseProps = {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-sans uppercase tracking-wider font-medium',
    'transition-all duration-300 ease-in-out',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    'cursor-pointer',
    className
  );

  const hoverAnim = { y: -2 };
  const tapAnim = { y: 0 };

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={hoverAnim}
        whileTap={tapAnim}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>)}
      >
        {children}
      </motion.a>
    );
  }

  const { href: _href, ...buttonRest } = props as ButtonAsButton;
  return (
    <motion.button
      className={classes}
      whileHover={hoverAnim}
      whileTap={tapAnim}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...(buttonRest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)}
    >
      {children}
    </motion.button>
  );
}

export default Button;
