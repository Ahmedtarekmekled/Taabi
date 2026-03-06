"use client";

import { useState } from "react";
import { Plus, MapPin, Search } from "lucide-react";

type Location = {
  id: string;
  name: string;
  address: string;
  qrSecret: string;
};

// Mock Initial multi-location data
const initialLocations: Location[] = [
  { id: "loc_1", name: "Downtown Branch", address: "123 Main St", qrSecret: "secret_123" },
  { id: "loc_2", name: "Mall Kiosk", address: "City Center Mall", qrSecret: "secret_456" },
];

export default function SettingsPage() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);

  const addLocation = () => {
    const newLoc = {
      id: `loc_${Date.now()}`,
      name: "New Store Location",
      address: "Enter address...",
      qrSecret: `secret_${Math.floor(Math.random() * 10000)}`
    };
    setLocations([...locations, newLoc]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h2>
          <p className="text-slate-500 mt-1">Manage your workspace, billing, and store locations.</p>
        </div>
      </div>

      {/* Multi-Location Management */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand" />
              Store Locations
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Manage physical venues where cashiers can scan and issue stamps.
            </p>
          </div>
          <button 
            onClick={addLocation}
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-mid transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Location
          </button>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-semibold">Location Name</th>
                <th className="px-6 py-3 font-semibold">Address</th>
                <th className="px-6 py-3 font-semibold">Security Token</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{loc.name}</td>
                  <td className="px-6 py-4 text-slate-500">{loc.address}</td>
                  <td className="px-6 py-4">
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-600 font-mono">
                      {loc.qrSecret}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand hover:text-brand-mid font-medium text-sm">Edit</button>
                    <span className="text-slate-300 mx-2">|</span>
                    <button className="text-red-500 hover:text-red-600 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {locations.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <MapPin className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>No locations created yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* General Settings Placeholder */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
         <h3 className="text-lg font-bold text-slate-900 mb-4">Account Workspace</h3>
         <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Business Name</label>
              <input type="text" defaultValue="Ahmad's Cafe" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Contact Email</label>
              <input type="email" defaultValue="hello@ahmadscafe.com" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed outline-none" readOnly />
            </div>
         </div>
         <div className="mt-6 flex justify-end">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-black transition-colors">
              Save Changes
            </button>
         </div>
      </section>

    </div>
  );
}
