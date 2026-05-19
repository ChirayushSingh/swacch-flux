import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <thead className={cn("[&_tr]:border-b bg-slate-50/50 dark:bg-slate-900/50", className)}>{children}</thead>;
}

export function TableBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <tr 
      onClick={onClick}
      className={cn(
        "border-b transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 data-[state=selected]:bg-slate-100", 
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={cn("h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400 [&:has([role=checkbox])]:pr-0", className)}>
      {children}
    </th>
  );
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}>
      {children}
    </td>
  );
}
