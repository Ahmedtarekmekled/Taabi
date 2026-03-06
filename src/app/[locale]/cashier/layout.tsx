export const metadata = {
  title: "StampWallet Cashier POS",
  description: "Scan customer loyalty passes and issue stamps instantly.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Cashier",
    statusBarStyle: "default",
  },
};

export default function CashierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      {/* 
        This is a dedicated layout specifically for the Cashier PWA. 
        It strips away the heavy Dashboard Sidebars and marketing Navbars 
        so that the shop assistants get a fast, full-screen mobile scanning experience.
      */}
      <main className="w-full h-full max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}
