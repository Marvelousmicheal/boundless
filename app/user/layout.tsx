import DashboardInset from '@/components/layout/DashboardInset';
import SidebarLayout from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen bg-[#0F0F0F] overflow-hidden'>
      <SidebarProvider>
        <SidebarLayout />
        <DashboardInset>{children}</DashboardInset>
      </SidebarProvider>
    </div>
  );
}
