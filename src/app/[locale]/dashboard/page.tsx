"use client";

import { Copy, Code, Calendar, TrendingUp, Users, MapPin, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

// Mock Data for Analytics
const engagementData = [
  { day: "Mon", stamps: 45, redemptions: 5 },
  { day: "Tue", stamps: 52, redemptions: 8 },
  { day: "Wed", stamps: 38, redemptions: 2 },
  { day: "Thu", stamps: 65, redemptions: 12 },
  { day: "Fri", stamps: 85, redemptions: 20 },
  { day: "Sat", stamps: 110, redemptions: 35 },
  { day: "Sun", stamps: 95, redemptions: 28 },
];

const locationData = [
  { name: "Downtown Branch", scans: 245 },
  { name: "Mall Kiosk", scans: 180 },
  { name: "Airport Terminal", scans: 65 },
];

export default function Dashboard() {
  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could trigger a toast notification here
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Page URLs Card */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-dark flex items-center gap-2 text-sm">
              <Code className="w-4 h-4 text-muted-foreground" />
              Page URLs
            </h3>
          </div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="bg-bg border border-border rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-brand mb-1 uppercase tracking-wider">Customer Enrollment</div>
                <div className="text-sm font-medium text-dark truncate pr-4">https://stampwallet.app/enroll</div>
              </div>
              <button 
                onClick={() => copyUrl("https://stampwallet.app/enroll")}
                className="w-8 h-8 rounded-md bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-bg border border-border rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-purple-600 mb-1 uppercase tracking-wider">Cashier POS System</div>
                <div className="text-sm font-medium text-dark truncate pr-4">https://stampwallet.app/cashier</div>
              </div>
              <button 
                onClick={() => copyUrl("https://stampwallet.app/cashier")}
                className="w-8 h-8 rounded-md bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-purple-600 hover:border-purple-600 transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-border rounded-xl shadow-sm p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
              <Users className="w-4 h-4 text-brand" /> Total Members
            </div>
            <div className="text-3xl font-black text-slate-800 tracking-tight">1,248</div>
            <div className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% this week
            </div>
          </div>
          <div className="bg-gradient-to-br from-brand/10 to-indigo-50/50 border border-brand/20 rounded-xl shadow-sm p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-2">
              <Award className="w-4 h-4 text-brand" /> Total Redemptions
            </div>
            <div className="text-3xl font-black text-brand tracking-tight">342</div>
            <div className="text-xs text-brand/70 font-medium mt-1">
              Rewards claimed lifetime
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Engagement Velocity Chart */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-dark text-sm flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-brand" />
               Engagement Velocity
            </h3>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-white px-3 py-1.5 rounded-md border border-slate-200">
              <Calendar className="w-4 h-4" />
              <span>Last 7 Days</span>
            </div>
          </div>
          <div className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="stamps" name="Stamps Issued" stroke="#5B4FE8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="redemptions" name="Rewards Claimed" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Performance */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
           <div className="px-5 py-4 border-b border-border bg-slate-50/50">
             <h3 className="font-bold text-dark text-sm flex items-center gap-2">
               <MapPin className="w-4 h-4 text-brand" />
               Popular Locations
             </h3>
           </div>
           <div className="p-6 h-[300px] flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#334155", fontWeight: 600 }} width={110} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="scans" name="Total Scans" fill="#5B4FE8" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

      </div>

    </div>
  );
}
