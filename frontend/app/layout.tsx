import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ratel Signals',
  description: 'AI-Powered Perpetual Market Intelligence',
  metadataBase: new URL('https://ratel-signals.example.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#06070e] text-white antialiased">{children}</body>
    </html>
  );
}
