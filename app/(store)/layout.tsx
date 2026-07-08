import { AnnouncementBar, Navbar } from '@/components/store/header';
import { Footer } from '@/components/store/footer/footer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
