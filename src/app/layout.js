import { Raleway } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import ClientProvider from '@/components/ClientProvider';


const raleway = Raleway({
  subsets: ['latin'], 
  weight: ['100','200','300','400','500','600','700','800','900'], 
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <Navbar/>
      <ClientProvider>
          {children}
      </ClientProvider>
      </body>
    </html>
  );
}
