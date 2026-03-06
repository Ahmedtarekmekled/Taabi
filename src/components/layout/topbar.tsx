"use client";

import { Bell, Search, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function Topbar() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 lg:px-8 z-10 sticky top-0 w-full">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("menu.dashboard")}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors text-muted-foreground hover:text-foreground font-medium text-sm"
          title="Switch Language"
        >
          <Globe className="w-5 h-5 me-1" />
          <span className="uppercase">{locale === 'en' ? 'عربى' : 'EN'}</span>
        </button>
        {/* Search */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search customers or passes..." 
            className="ps-10 pe-4 py-2 w-64 border border-border bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white border border-transparent hover:border-border transition-all text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 end-1 w-2.5 h-2.5 bg-red border-2 border-background rounded-full"></span>
        </button>

        {/* Action Button */}
        <button className="hidden sm:flex items-center justify-center px-4 py-2 bg-brand hover:bg-brand-mid text-white rounded-full font-medium text-sm transition-all shadow-sm shadow-brand/20 hover:shadow-md hover:-translate-y-0.5">
          Scan QR Code
        </button>
      </div>
    </header>
  );
}
