'use client';

import TransitionLink from './TransitionLink';
import Magnetic from './Magnetic';
import { cn } from '@/lib/utils';

const variants = {
  primary:        'bg-accent text-on-accent',
  outline:        'border border-fg/30 text-fg hover:border-fg/70',
  light:          'bg-mist text-ink',
  'outline-light':'border border-mist/40 text-mist hover:border-mist',
};

/**
 * Pill button with a sliding text swap and a background sweep on hover.
 * The sweep is a ::before element that scales from 0→1.
 */
export default function Button({ href, label, onClick, variant = 'primary', className, children, ...rest }) {
  const classes = cn(
    'group relative inline-flex h-14 items-center overflow-hidden rounded-full px-8 text-sm font-semibold tracking-wide transition-shadow duration-400 hover:shadow-lg',
    variants[variant],
    className
  );

  const content = (
    <>
      {/* Hover fill sweep — only for outline variants */}
      {variant.includes('outline') && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100',
            variant === 'outline' ? 'bg-fg' : 'bg-mist'
          )}
        />
      )}

      {/* Sliding text */}
      <span className="relative block overflow-hidden">
        <span
          className={cn(
            'block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full',
            variant.includes('outline') && 'group-hover:text-canvas transition-colors duration-200'
          )}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0',
            variant === 'outline' && 'text-canvas',
            variant === 'outline-light' && 'text-ink'
          )}
        >
          {children}
        </span>
      </span>
    </>
  );

  return (
    <Magnetic strength={0.2}>
      {href ? (
        <TransitionLink href={href} label={label} className={classes} data-cursor="" {...rest}>
          {content}
        </TransitionLink>
      ) : (
        <button type="button" onClick={onClick} className={classes} data-cursor="" {...rest}>
          {content}
        </button>
      )}
    </Magnetic>
  );
}
