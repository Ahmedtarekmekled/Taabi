"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QrCode, Heart, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CashierScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Only initialize scanner on the client side
    if (typeof window !== "undefined" && !scanResult) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          // Pause scanning on successful read to prevent duplicate API calls
          setScanResult(decodedText);
          scanner.clear();
        },
        (error) => {
          // Ignore frequent scan failures during positioning
        }
      );

      return () => {
        scanner.clear().catch(console.error);
      };
    }
  }, [scanResult]);

  useEffect(() => {
    // Process the scanned QR code payload
    if (scanResult) {
      processScan(scanResult);
    }
  }, [scanResult]);

  const processScan = async (payload: string) => {
    setIsProcessing(true);
    setStatus("idle");
    
    try {
      // In a real app, this would be a POST request to your backend
      // e.g. api/passes/stamp or api/passes/redeem
      
      console.log("Processing scanned payload:", payload);
      
      // Simulate network latency for issuing a stamp
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus("success");
      setStatusMessage("1 Stamp Added Successfully! 🎉");
      
    } catch (err) {
      setStatus("error");
      setStatusMessage("Failed to verify loyalty card. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-slate-50 relative">
      
      {/* App Header */}
      <header className="bg-brand text-white p-6 pb-8 shadow-md rounded-b-[2rem] relative z-10">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-white" />
            <span className="font-bold text-lg tracking-tight">StampWallet</span>
          </div>
          <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">Cashier POS</span>
        </div>
        <h1 className="text-2xl font-extrabold mt-4">Ready to Scan</h1>
        <p className="text-brand-light text-sm opacity-90">Align the customer's pass inside the frame</p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 -mt-6 z-20 pb-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-2">
          
          <AnimatePresence mode="wait">
            {!scanResult ? (
              <motion.div 
                key="scanner"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="w-full relative min-h-[300px] flex flex-col items-center justify-center"
              >
                {/* 
                  The highly specific ID "reader" is required by the html5-qrcode library 
                  to mount the camera feed.
                */}
                <div id="reader" className="w-full overflow-hidden rounded-2xl [&>div]:border-none [&>div>video]:rounded-2xl shadow-inner bg-slate-100"></div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full py-12 px-6 flex flex-col items-center text-center"
              >
                {isProcessing && (
                  <>
                    <Loader2 className="w-16 h-16 text-brand animate-spin mb-6" />
                    <h2 className="text-xl font-bold text-slate-800">Verifying Pass...</h2>
                    <p className="text-slate-500 mt-2 text-sm">{scanResult.substring(0, 20)}...</p>
                  </>
                )}

                {!isProcessing && status === "success" && (
                  <>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-green-100 shadow-xl">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{statusMessage}</h2>
                    
                    <button 
                      onClick={resetScanner}
                      className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-colors shadow-lg"
                    >
                      Scan Next Customer
                    </button>
                  </>
                )}

                {!isProcessing && status === "error" && (
                  <>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{statusMessage}</h2>
                    
                    <button 
                      onClick={resetScanner}
                      className="mt-8 w-full bg-slate-200 text-slate-800 font-bold py-4 rounded-xl hover:bg-slate-300 transition-colors"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

    </div>
  );
}
