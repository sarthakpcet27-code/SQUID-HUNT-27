import type { AnchorHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function NavLink({ href, children, className = '', ...props }: NavLinkProps) {
  return (
    <motion.a 
      href={href}
      className={`text-editorial-sm uppercase tracking-[0.2em] text-squid-muted hover:text-squid-pink transition-colors duration-snappy ${className}`}
      whileHover={{ y: -2 }}
      {...props as any}
    >
      {children}
    </motion.a>
  );
}
