'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import { useComplaint } from '@/lib/hooks/useComplaints';
import { TimelineEvent } from '@/lib/data/mock';
import { Badge } from '@/components/ui/Badge';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ComplaintDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: complaint, isLoading: loading } = useComplaint(id);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[600px]" />
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Complaint Not Found</h2>
        <p className="text-muted-foreground mt-2">The complaint ID you are looking for does not exist.</p>
        <Link href="/admin" className="mt-4 text-primary font-medium hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{complaint.id}</h1>
              <Badge variant={complaint.status === 'ESCALATED' ? 'error' : 'info'}>
                {complaint.status}
              </Badge>
              <Badge variant={complaint.priority === 'CRITICAL' ? 'error' : 'warning'}>
                {complaint.priority}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{complaint.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors text-rose-600">
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Mark Resolved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-4">Complaint Description</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {complaint.description}
            </p>
            
            {complaint.images.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Citizen Uploads</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {complaint.images.map((img: string, i: number) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-border bg-slate-100">
                      <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Action Log / Internal Notes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-4">Internal Discussion</h3>
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl rounded-tl-none p-3 border border-border max-w-[80%]">
                  <p className="text-xs font-bold mb-1">Supervisor Anita</p>
                  <p className="text-sm">Assigned this to Suresh because he's currently near Market Square.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">10:45 AM</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a note or instruction..." 
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <button className="p-2 bg-primary text-white rounded-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Status & SLA */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">SLA Compliance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Time Remaining</span>
                  <span className="text-sm font-bold text-rose-500">2h 45m</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[85%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Reported At</p>
                  <p className="text-sm font-medium">{new Date(complaint.createdAt).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-sm font-medium">{new Date(complaint.slaDeadline).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Assigned Worker */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Assigned Resource</h3>
            {complaint.assignedTo ? (
              <div className="flex items-center gap-4">
                <img src={complaint.assignedTo.avatar} alt="" className="w-12 h-12 rounded-full border border-border" />
                <div className="flex-1">
                  <p className="font-bold">{complaint.assignedTo.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" /> {complaint.assignedTo.phone}
                  </p>
                </div>
                <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <User className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">
                Assign Worker
              </button>
            )}
          </motion.div>

          {/* Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-6">Complaint Timeline</h3>
            <Timeline>
              {complaint.timeline.map((event: TimelineEvent, i: number) => (
                <TimelineItem 
                  key={event.id}
                  status={event.status}
                  message={event.message}
                  timestamp={event.timestamp}
                  actor={event.actor}
                  isLast={i === complaint.timeline.length - 1}
                />
              ))}
            </Timeline>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
