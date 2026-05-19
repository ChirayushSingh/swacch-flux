'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useComplaints } from '@/lib/hooks/useComplaints';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const WorkerIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const ComplaintIcon = (priority: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-6 h-6 ${priority === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : priority === 'HIGH' ? 'bg-orange-500' : 'bg-amber-500'} rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function GISWarRoom() {
  const center: [number, number] = [19.0760, 72.8777]; // Mumbai
  const { complaints, loading } = useComplaints();

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-border shadow-inner bg-slate-100 dark:bg-slate-950 relative">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizer />
        
        {/* Render Real Complaints from Backend */}
        {!loading && complaints.map((complaint: any) => (
          <Marker 
            key={complaint.id} 
            position={[complaint.lat, complaint.lng]}
            icon={ComplaintIcon(complaint.priority)}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-sm mb-1">{complaint.ticketId}: {complaint.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{complaint.address || 'No address'}</p>
                <div className="flex gap-2">
                  <Badge variant={complaint.priority === 'CRITICAL' ? 'error' : 'warning'}>
                    {complaint.priority}
                  </Badge>
                  <Badge variant="info">
                    {complaint.status}
                  </Badge>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Worker markers would similarly be fetched from useWorkers() */}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-border shadow-lg space-y-2 pointer-events-none">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">War Room Legend</h4>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-xs font-medium">Critical Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-xs font-medium">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-xs font-medium">Active Worker</span>
        </div>
      </div>
    </div>
  );
}

// Helper component for Popup
function Badge({ children, variant }: any) {
  const styles = {
    error: 'bg-rose-100 text-rose-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-100 text-blue-700',
    default: 'bg-slate-100 text-slate-700'
  };
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${styles[variant as keyof typeof styles] || styles.default}`}>
      {children}
    </span>
  );
}
