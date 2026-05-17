import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VitalSense - Precision in Patient Care',
  description: 'Remote Patient Monitoring Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
