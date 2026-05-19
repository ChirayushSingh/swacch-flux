"use client";

import { Users, Shield, Plus, Search, MoreHorizontal } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage platform users, roles, and access control.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: "142", icon: Users },
          { label: "Workers", value: "112", icon: Users },
          { label: "Supervisors", value: "28", icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <stat.icon className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="font-bold">All Users</h3>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search users..." className="pl-9 pr-4 py-2 bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border bg-secondary/10">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Ward</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: "Rajesh Kumar", email: "rajesh@bmc.gov.in", role: "SUPERVISOR", ward: "Ward 4", status: "Active" },
              { name: "Priya Sharma", email: "priya@bmc.gov.in", role: "WORKER", ward: "Ward 7", status: "Active" },
              { name: "Amit Patil", email: "amit@bmc.gov.in", role: "WORKER", ward: "Ward 12", status: "On Leave" },
              { name: "Sneha Rao", email: "sneha@bmc.gov.in", role: "ADMIN", ward: "All", status: "Active" },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-secondary/20 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">{user.role}</span>
                </td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{user.ward}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1.5 hover:bg-secondary rounded-lg">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
