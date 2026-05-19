'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5000';

export interface LiveUpdate {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export function useRealTimeUpdate() {
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Only connect socket if user has a session token
    const token = localStorage.getItem('token');
    if (!token) return;

    const tenantId = localStorage.getItem('tenantId');
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    if (tenantId) {
      newSocket.emit('join_org', tenantId);
    }

    newSocket.on('new_complaint', (complaint: any) => {
      const newUpdate: LiveUpdate = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'NEW_COMPLAINT',
        message: `New complaint raised: ${complaint.ticketId}`,
        timestamp: new Date().toISOString()
      };
      setUpdates(prev => [newUpdate, ...prev].slice(0, 10));
    });

    newSocket.on('complaint_assigned', (data: any) => {
      const newUpdate: LiveUpdate = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'STATUS_CHANGE',
        message: `Complaint ${data.complaintId} assigned to worker`,
        timestamp: new Date().toISOString()
      };
      setUpdates(prev => [newUpdate, ...prev].slice(0, 10));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return { updates, socket };
}
