export type ComplaintStatus = 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED' | 'VERIFIED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  message: string;
  timestamp: string;
  actor: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ComplaintStatus;
  priority: Priority;
  location: {
    lat: number;
    lng: number;
    address: string;
    ward: string;
  };
  citizen: {
    name: string;
    phone: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  images: string[];
  timeline: TimelineEvent[];
}

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'COMP-1001',
    title: 'Garbage Overflow at Market Square',
    description: 'The main bin in the market square is overflowing and hasn\'t been cleared for 2 days. The smell is becoming unbearable.',
    category: 'Solid Waste',
    status: 'ASSIGNED',
    priority: 'HIGH',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Market Square, Sector 4, Mumbai',
      ward: 'Ward A - South'
    },
    citizen: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210'
    },
    assignedTo: {
      id: 'W-001',
      name: 'Suresh Patil',
      phone: '+91 87654 32109',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh'
    },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    slaDeadline: new Date(Date.now() + 3600000 * 12).toISOString(),
    images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=500'],
    timeline: [
      {
        id: 't1',
        status: 'PENDING',
        message: 'Complaint registered by citizen',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        actor: 'Citizen'
      },
      {
        id: 't2',
        status: 'ASSIGNED',
        message: 'Complaint assigned to Suresh Patil',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        actor: 'Admin System'
      }
    ]
  },
  {
    id: 'COMP-1002',
    title: 'Dead Animal Removal',
    description: 'A dead dog is lying near the entrance of Orchid Apartments. Needs urgent removal.',
    category: 'Animal Waste',
    status: 'ESCALATED',
    priority: 'CRITICAL',
    location: {
      lat: 19.0820,
      lng: 72.8820,
      address: 'Orchid Apartments, Road No. 12',
      ward: 'Ward B - East'
    },
    citizen: {
      name: 'Anita Desai',
      phone: '+91 91234 56789'
    },
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    slaDeadline: new Date(Date.now() - 3600000 * 2).toISOString(), // Missed SLA
    images: [],
    timeline: [
      {
        id: 't1',
        status: 'PENDING',
        message: 'Complaint registered',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
        actor: 'Citizen'
      },
      {
        id: 't2',
        status: 'ESCALATED',
        message: 'Auto-escalated due to SLA breach',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        actor: 'SLA Engine'
      }
    ]
  },
  {
    id: 'COMP-1003',
    title: 'Illegal Dumping on Vacant Plot',
    description: 'Construction debris being dumped illegally at night.',
    category: 'Debris/C&D',
    status: 'PENDING',
    priority: 'MEDIUM',
    location: {
      lat: 19.0850,
      lng: 72.8900,
      address: 'Plot 45, Green Valley',
      ward: 'Ward C - North'
    },
    citizen: {
      name: 'Vikram Singh',
      phone: '+91 76543 21098'
    },
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    slaDeadline: new Date(Date.now() + 3600000 * 48).toISOString(),
    images: [],
    timeline: [
      {
        id: 't1',
        status: 'PENDING',
        message: 'Complaint registered',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        actor: 'Citizen'
      }
    ]
  }
];

export const MOCK_STATS = {
  totalActive: 452,
  pending: 128,
  assigned: 215,
  resolvedToday: 84,
  slaCompliance: 92,
  hotspots: [
    { name: 'Dharavi', count: 45, trend: 'up' },
    { name: 'Bandra West', count: 32, trend: 'down' },
    { name: 'Andheri East', count: 28, trend: 'stable' }
  ]
};

export const MOCK_WORKERS = [
  { id: 'W-001', name: 'Suresh Patil', status: 'ACTIVE', load: 8, location: { lat: 19.0760, lng: 72.8777 } },
  { id: 'W-002', name: 'Ramesh Pawar', status: 'ACTIVE', load: 3, location: { lat: 19.0820, lng: 72.8820 } },
  { id: 'W-003', name: 'Mahesh Shinde', status: 'ON_LEAVE', load: 0, location: { lat: 19.0850, lng: 72.8900 } }
];
