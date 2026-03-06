"use client";

import { Copy, Code, Calendar } from "lucide-react";

export default function Dashboard() {
  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could trigger a toast notification here
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
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
          <div className="p-5 flex flex-col gap-2 flex-1">
            <div className="bg-bg border border-border rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">Landing Page</div>
                <div className="text-sm font-medium text-dark">https://royal.stampwallet.app/landing</div>
              </div>
              <button 
                onClick={() => copyUrl("https://royal.stampwallet.app/landing")}
                className="w-8 h-8 rounded-md bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-bg border border-border rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">Referral Page</div>
                <div className="text-sm font-medium text-dark">https://royal.stampwallet.app/referral</div>
              </div>
              <button 
                onClick={() => copyUrl("https://royal.stampwallet.app/referral")}
                className="w-8 h-8 rounded-md bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Agent Card */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-dark flex items-center gap-2 text-sm">
              <Code className="w-4 h-4 text-muted-foreground" />
              AI Agent
            </h3>
          </div>
          <div className="p-5 flex flex-col justify-center items-start flex-1 gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Paste the snippet into your website's HTML file, right before the closing body tag.
            </p>
            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-dark hover:bg-bg transition-colors">
              <Code className="w-4 h-4" />
              Get Code
            </button>
          </div>
        </div>
      </div>

      {/* Audience Chart */}
      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-dark text-sm">Audience</h3>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Mar 01, 2026 – Mar 31, 2026</span>
          </div>
        </div>
        <div className="p-5">
          <div className="text-3xl font-extrabold text-dark mb-4">3</div>
          <div className="h-32 flex items-end gap-2 px-1 pb-2">
            {[10, 8, 12, 6, 40, 10, 8, 5, 60, 12, 8, 15].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-300 group-hover:bg-brand ${val > 30 ? 'bg-brand/70' : 'bg-brand-light'}`}
                  style={{ height: `${val}%` }}
                ></div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Audience", value: "3", sub: "Active card holders", color: "bg-amber" },
          { label: "Total Spent", value: "$0", sub: "This month", color: "bg-green" },
          { label: "Avg. Spent Per Member", value: "$0", sub: "Per customer avg.", color: "bg-brand" },
          { label: "Avg. Spent Per Visit", value: "$0", sub: "Per visit avg.", color: "bg-red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-border rounded-xl shadow-sm p-5 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
              <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
              {stat.label}
            </div>
            <div className="text-3xl font-extrabold text-dark tracking-tight leading-none mb-2">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-auto">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
