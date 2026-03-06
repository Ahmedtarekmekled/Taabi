import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';

// We import both fonts for bilingual support
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

const lemonBrush = localFont({
  src: '../../fonts/LemonBrushArabic.otf',
  variable: '--font-lemon',
});

export const metadata: Metadata = {
  title: "StampWallet | Digital Loyalty",
  description: "Digital Loyalty Stamp Card Platform",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Cashier",
    statusBarStyle: "default",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  // Switch RTL direction based on locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${jakarta.variable} ${plexArabic.variable} ${lemonBrush.variable} antialiased font-sans bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
