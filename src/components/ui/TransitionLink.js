'use client';

import Link from 'next/link';
import { usePageTransition } from '@/components/providers/TransitionProvider';

const EXTERNAL = /^(https?:|mailto:|tel:)/;

/**
 * Drop-in replacement for next/link that plays the page transition.
 * Modified clicks (new tab, etc.) and external URLs behave normally.
 */
export default function TransitionLink({ href, label = '', onClick, children, ...props }) {
  const { navigate } = usePageTransition();

  if (EXTERNAL.test(href)) {
    const isWeb = href.startsWith('http');
    return (
      <a href={href} {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        navigate(href, label);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
