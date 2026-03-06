"use client";

import { Heart, CreditCard, Scan, BadgeAlert } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EnrollmentPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Orbs & Gradients behind content */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-500/10 blur-[80px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center z-10"
      >
        
        {/* Merchant Info Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-brand to-fuchsia-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/30 mb-4 transform -rotate-3 transition-transform hover:rotate-0">
            <Heart className="w-10 h-10 fill-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Ahmad's Cafe</h1>
          <p className="text-slate-500 font-medium">Join our loyalty program & earn rewards.</p>
        </div>
        
        {/* Stunning Pass Preview Card */}
        <motion.div 
          whileHover={{ scale: 1.02, rotateY: 2 }}
          className="w-full rounded-3xl overflow-hidden shadow-2xl mb-10 transform-gpu perspective-1000 border border-white/50 bg-white/50 backdrop-blur-xl"
        >
          {/* Card Top / Header */}
          <div className="bg-gradient-to-br from-brand via-indigo-600 to-fuchsia-600 p-6 text-white relative overflow-hidden">
            {/* Glossy Overlay Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div className="text-end">
                <div className="text-[10px] text-white/80 font-bold uppercase tracking-widest mb-1">Loyalty Card</div>
                <div className="font-extrabold text-xl tracking-tight">Ahmad's Cafe</div>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-5xl font-black tracking-tighter drop-shadow-md">0<span className="text-xl font-bold text-white/70">/10</span></span>
                <span className="text-xs font-bold text-white bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">0 Stamps</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden border border-black/10 shadow-inner">
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full w-0 shadow-[0_0_10px_currentColor]"></div>
              </div>
            </div>
          </div>
          
          {/* Card Middle / Description */}
          <div className="px-6 py-5 bg-white/60">
            <h3 className="font-extrabold text-slate-800 text-center mb-1 text-lg">10 Stamps = Free Coffee</h3>
            <p className="text-sm text-slate-500 text-center font-medium">Collect 10 stamps to unlock your reward.</p>
          </div>
          {/* Card Bottom / Barcode */}
          <div className="px-6 pb-6 pt-0 bg-white/60">
             <div className="w-full h-20 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-center items-center py-2 px-6 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full skeleton-shine"></div>
                <div className="flex justify-center gap-1.5 h-3/4 w-full">
                  {/* Decorative Barcode Generation */}
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className={`h-full ${i % 2 === 0 ? 'bg-slate-800' : 'bg-transparent'} ${i % 3 === 0 ? 'w-1' : 'w-2'}`}></div>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-widest mt-2 uppercase">1234 5678 9012</div>
             </div>
          </div>
        </motion.div>

        {/* Action Buttons styled exquisitely */}
        <div className="w-full space-y-3">
          <button className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 hover:bg-gray-900 transition-all shadow-xl shadow-black/20 hover:scale-[1.02]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.33 15.65c-1.16 0-1.89-1-3.69-1-1.74 0-2.57 1.02-3.71 1.02-1.28 0-3.37-1.39-4.82-3.48-1.52-2.19-2.61-6.19-1.04-9 1.14-2.03 3.2-3.32 5.48-3.32 1.54 0 2.58.55 3.32.96.64.36 1.13.59 1.56.59.39 0 .86-.23 1.48-.59.73-.41 1.83-1 3.51-1 1.07 0 2.87.26 4.3 1.62.15.14.28.28.38.41-3.23 1.57-4.04 5.3-1.07 7.21-1.02 2.66-3 6.58-5.69 6.58zm-4.71-12.28c.11-.8.44-1.54.96-2.08.68-.73 1.65-1.18 2.6-1.18.52 0 .99.08 1.4.24-.07.78-.4 1.53-.94 2.1-.66.71-1.57 1.12-2.59 1.16-.49.03-.96-.03-1.43-.24z" />
            </svg>
            Add to Apple Wallet
          </button>
          
          <button className="w-full h-14 bg-white border border-slate-200 text-slate-800 rounded-2xl font-bold flex items-center justify-center gap-2.5 hover:bg-slate-50 transition-all shadow-lg shadow-slate-200/50 hover:scale-[1.02]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#4285F4]">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Add to Google Wallet
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button className="w-full h-14 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 hover:bg-[#20b858] transition-all shadow-xl shadow-[#25D366]/30 hover:scale-[1.02]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Send to WhatsApp
          </button>
        </div>

      </motion.div>
    </div>
  );
}
