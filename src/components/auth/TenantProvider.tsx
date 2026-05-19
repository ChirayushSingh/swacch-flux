'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '@/services/authService';

interface TenantContextType {
  tenantId: string | null;
  setTenant: (id: string) => void;
  user: any | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setTenantId(AuthService.getTenantId());
    setUser(AuthService.getCurrentUser());
  }, []);

  const setTenant = (id: string) => {
    localStorage.setItem('tenantId', id);
    setTenantId(id);
    // Refresh page or trigger data re-fetch
    window.location.reload();
  };

  return (
    <TenantContext.Provider value={{ tenantId, setTenant, user }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
