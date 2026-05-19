import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
    outline: 'border border-slate-200 text-slate-800 dark:border-slate-800 dark:text-slate-100',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
