"use client";

import { Download, Search, SearchIcon, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: 1,
    name: "Ahmed Mekled",
    email: "ahmedmakledd11@gmail.com",
    amount: "$0.00",
    points: 53,
    usedPts: 0,
    currentPts: 53,
    type: "Add Points",
    platform: "bc web",
    deal: "Transaction",
    date: "Fri, Mar 6, 2026",
    createdBy: "—"
  }
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-dark">Transactions</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-semibold text-dark hover:bg-bg transition-colors">
          <Download className="w-4 h-4" />
          Download CSV
        </button>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 w-64 border border-border bg-bg rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all focus:bg-white"
            />
          </div>
          <select className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer bg-white">
            <option>Sort By: Latest Items</option>
            <option>Oldest</option>
            <option>Most Points</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-bg">
              <TableRow className="hover:bg-bg border-border">
                <TableHead className="w-12 text-center">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer" />
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground">Transactions</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Amount</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Points</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Used Pts</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Current Pts</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Type</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Platform</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Deal</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-border hover:bg-slate-50 transition-colors">
                  <TableCell className="text-center">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {tx.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-dark">{tx.name}</div>
                        <div className="text-xs text-muted-foreground">{tx.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-dark">{tx.amount}</TableCell>
                  <TableCell className="text-dark">{tx.points}</TableCell>
                  <TableCell className="text-dark">{tx.usedPts}</TableCell>
                  <TableCell className="text-dark">{tx.currentPts}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-bg text-green">
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-dark">{tx.platform}</TableCell>
                  <TableCell className="text-dark">{tx.deal}</TableCell>
                  <TableCell className="text-dark text-xs whitespace-nowrap">{tx.date}</TableCell>
                  <TableCell className="text-dark">{tx.createdBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-3 border-t border-border flex items-center justify-between bg-white text-xs text-muted-foreground">
          <span>1–1 of 1 row(s).</span>
          <div className="flex items-center gap-3">
            <span>Rows per page:</span>
            <select className="px-2 py-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer bg-white">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
