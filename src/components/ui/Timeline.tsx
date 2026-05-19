import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2, Clock, User, AlertCircle, MapPin } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TimelineItemProps {
  status: string;
  message: string;
  timestamp: string;
  actor: string;
  isLast?: boolean;
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-0">
      {children}
    </div>
  );
}

export function TimelineItem({ status, message, timestamp, actor, isLast }: TimelineItemProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case 'RESOLVED':
      case 'VERIFIED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'ESCALATED':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center bg-white dark:bg-slate-900 z-10",
          status === 'ESCALATED' ? 'border-rose-200' : 'border-slate-200'
        )}>
          {getIcon(status)}
        </div>
        {!isLast && <div className="w-px h-full bg-slate-200 dark:bg-slate-800 -mt-1 mb-0" />}
      </div>
      <div className="pb-8 pt-0.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{status}</span>
          <span className="text-xs text-slate-500">{new Date(timestamp).toLocaleString()}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{message}</p>
        <div className="text-xs font-medium text-slate-400">By {actor}</div>
      </div>
    </div>
  );
}
