import type {Metadata} from 'next';
import './globals.css';
import './animations.css';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PopoverProvider } from "@/components/ui/PopoverManager";

export const metadata: Metadata = {
  title: 'Nomaryth Launcher',
  description: 'Coded with much love',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <PopoverProvider>
            {children}
          </PopoverProvider>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
