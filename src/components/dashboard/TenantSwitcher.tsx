'use client';

import { useState } from 'react';
import { useTenant } from '../auth/TenantProvider';
import { Building2, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// In a real app, this would be fetched from the backend organizations API
const MOCK_ORGS = [
  { id: 'bmc-id', name: 'BMC Mumbai', code: 'BMC' },
  { id: 'pmc-id', name: 'PMC Pune', code: 'PMC' },
  { id: 'ndmc-id', name: 'NDMC Delhi', code: 'NDMC' },
];

export function TenantSwitcher() {
  const { tenantId, setTenant } = useTenant();
  const [isOpen, setIsOpen] = useState(false);

  const currentOrg = MOCK_ORGS.find(o => o.id === tenantId) || MOCK_ORGS[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-all text-sm font-medium"
      >
        <Building2 className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">{currentOrg.name}</span>
        <span className="sm:hidden">{currentOrg.code}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Switch Organization</p>
              {MOCK_ORGS.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    setTenant(org.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    tenantId === org.id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {org.name}
                  {tenantId === org.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
