import './globals.css';

import { Montserrat, DM_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: [ '200', '400', '500','700', '800'],
  variable: '--font-Heading',
});
const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-block',
});

export const metadata = {
  title: 'Elecciones 2023',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`
        ${montserrat.className} ${dm_sans.className}
        flex justify-center items-center bg-slate-800
        w-full`}>
        <div className="flex flex-col justify-center items-center
          w-full max-w-7xl border-x border-slate-700">
            {children}
        </div>
      </body>
    </html>
  );
};
