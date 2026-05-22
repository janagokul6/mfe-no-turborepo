import './globals.css';
import '@org/ui/dist/style.css';
import { ShellSessionProvider } from '@/context/ShellSession';
import { ShellNav } from '@/components/ShellNav';

export const metadata = {
  title: 'MFE E-Commerce Shell',
  description: 'Micro frontend host',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellSessionProvider>
          <ShellNav />
          <main>{children}</main>
        </ShellSessionProvider>
      </body>
    </html>
  );
}
