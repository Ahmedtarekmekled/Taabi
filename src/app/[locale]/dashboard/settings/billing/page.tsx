"use client";

import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function BillingSettingsPage() {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    setIsUpgrading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsManaging(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setIsManaging(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Billing & Subscriptions</h2>
          <p className="text-slate-500 mt-1">Manage your plan, download invoices, and update your payment method.</p>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand/10 text-brand font-bold px-3 py-1 rounded-full text-sm">FREE PLAN</span>
              <span className="flex items-center gap-1 text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded-md">
                <CheckCircle2 className="w-4 h-4" /> Active
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mt-4">$0 <span className="text-lg text-slate-500 font-medium tracking-normal">/ month</span></h3>
            <p className="text-slate-500 mt-2 text-sm max-w-sm">
              Your current plan allows up to 1 campaign and 200 passes per month. 
            </p>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <button 
              onClick={handleManageBilling}
              disabled={isManaging}
              className="w-full bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              {isManaging ? "Loading..." : "Manage Billing"}
            </button>
          </div>
        </div>
        
        <hr className="border-slate-100 my-8" />
        
        <div className="bg-gradient-to-br from-brand/5 to-indigo-50/20 border border-brand/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Upgrade to Growth</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> Up to 5 Active Campaigns</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> 2,000 passes per month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> Apple & Google Wallet Push Notifications</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> Multi-location support (Up to 3 Branches)</li>
              </ul>
            </div>
            <div className="flex flex-col items-end gap-2">
               <div className="text-2xl font-black text-slate-900">$29 <span className="text-sm font-medium text-slate-500">/ mo</span></div>
               <button 
                  onClick={() => handleUpgrade("price_mock_growth")}
                  disabled={isUpgrading}
                  className="bg-brand text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-mid transition-all shadow-md mt-2 w-full md:w-auto"
                >
                  {isUpgrading ? "Preparing..." : "Upgrade Plan"}
               </button>
               <p className="text-xs text-slate-400 mt-1">14-day free trial included.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-slate-400" />
          Usage Limits
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium text-slate-700">
              <span>Active Passes</span>
              <span>142 / 200</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-brand h-2 rounded-full" style={{ width: "71%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium text-slate-700">
              <span>Push Notifications</span>
              <span>450 / 500</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-400 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <p className="text-xs text-orange-600 mt-2 font-medium">You are approaching your push notification limit.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
