"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  Heart, 
  Home, 
  CreditCard, 
  Users, 
  Gift, 
  Globe, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.menu");

  const navItems = [
    { icon: Home, label: t("dashboard"), href: "/dashboard" },
    { icon: CreditCard, label: t("transactions"), href: "/dashboard/transactions" },
    { icon: Users, label: t("customers"), href: "/dashboard/customers" },
    { icon: Gift, label: t("campaigns"), href: "/dashboard/campaigns" },
    { icon: Globe, label: t("landingPages"), href: "/dashboard/landing" },
    { icon: Settings, label: t("settings"), href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-16 md:w-20 lg:w-64 flex-shrink-0 bg-white border-r border-border flex flex-col items-center lg:items-stretch py-6 z-20 transition-all duration-300">
      <div className="flex items-center justify-center lg:justify-start lg:px-6 mb-8 w-full">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-brand/20">
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <span className="font-bold text-xl ms-3 hidden lg:block tracking-tight">StampWallet</span>
      </div>

      <nav className="flex-1 w-full flex flex-col gap-2 px-3 lg:px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center lg:justify-start h-12 rounded-xl transition-all duration-200 group w-full lg:px-3",
                isActive 
                  ? "bg-brand text-white shadow-sm shadow-brand/20" 
                  : "text-muted-foreground hover:bg-brand-light hover:text-brand"
              )}
              title={item.label}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-brand")} />
              <span className="ms-3 hidden lg:block font-medium">{item.label}</span>
              
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-s-full lg:hidden hidden"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3 lg:px-4 w-full flex justify-center lg:justify-start">
        <button className="w-full flex items-center justify-center lg:justify-start h-12 rounded-xl text-muted-foreground hover:bg-slate-100 transition-colors lg:px-3 group">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="ms-3 hidden lg:block font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            Ahmad Cafe
          </span>
        </button>
      </div>
    </aside>
  );
}
