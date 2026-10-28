'use client';

import TransitionLink from './TransitionLink';
import Magnetic from './Magnetic';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-accent text-on-accent',
  outline: 'border border-fg/30 text-fg hover:border-fg',
  light: 'bg-mist text-ink',
  'outline-light': 'border border-mist/40 text-mist hover:border-mist',
};

const swap = 'block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';

/**
 * Pill button. Renders a link when `href` is set, otherwise a <button>.
 * The label slides up on hover. `children` should be plain text.
 */
export default function Button({ href, label, onClick, variant = 'primary', className, children, ...rest }) {
  const classes = cn(
    'group relative inline-flex h-14 items-center overflow-hidden rounded-full px-7 text-base font-medium',
    variants[variant],
    className
  );
  const content = (
    <span className="relative block overflow-hidden">
      <span className={cn(swap, 'group-hover:-translate-y-full group-focus-visible:-translate-y-full')}>{children}</span>
      <span aria-hidden="true" className={cn(swap, 'absolute inset-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0')}>
        {children}
      </span>
    </span>
  );

  return (
    <Magnetic>
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
