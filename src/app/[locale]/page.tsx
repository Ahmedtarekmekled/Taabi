"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Heart, CreditCard, PieChart, Users, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LandingPage() {
  const t = useTranslations("Landing");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="min-h-screen bg-bg text-dark font-sans flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-border fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="font-bold text-lg tracking-tight">StampWallet</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors text-muted-foreground hover:text-foreground font-medium text-sm"
              title="Switch Language"
            >
              <Globe className="w-5 h-5 mr-1" />
              <span className="uppercase">{locale === 'en' ? 'عربى' : 'EN'}</span>
            </button>
            <Link href="/enroll" className="text-sm font-medium text-muted-foreground hover:text-dark">{t("viewDemo")}</Link>
            <Link href="/dashboard">
              <Button className="bg-dark text-white rounded-full px-5 hover:bg-dark/90 text-sm h-9">
                {t("getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-dark leading-tight ${locale === 'ar' ? 'font-lemon font-normal' : ''}`}
            >
              {t("title")}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-10"
            >
              {t("subtitle")}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <Button className="bg-brand hover:bg-brand-hover text-white rounded-full h-14 px-8 text-lg shadow-lg shadow-brand/20 transition-all">
                  {t("getStarted")}
                </Button>
              </Link>
              <Link href="/enroll">
                <Button variant="outline" className="h-14 px-8 rounded-full text-lg border-2">
                  {t("viewDemo")}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm"
            >
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("features.nativeWalletTitle")}</h3>
              <p className="text-muted-foreground">{t("features.nativeWalletDesc")}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm"
            >
              <div className="w-12 h-12 bg-[#FEB434]/10 text-[#FEB434] rounded-2xl flex items-center justify-center mb-6">
                <PieChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("features.analyticsTitle")}</h3>
              <p className="text-muted-foreground">{t("features.analyticsDesc")}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm"
            >
              <div className="w-12 h-12 bg-[#05AA63]/10 text-[#05AA63] rounded-2xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("features.retentionTitle")}</h3>
              <p className="text-muted-foreground">{t("features.retentionDesc")}</p>
            </motion.div>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-white border-t border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 StampWallet Platform. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-brand">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
