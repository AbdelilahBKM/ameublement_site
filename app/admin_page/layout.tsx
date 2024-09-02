import Admin_Header from "@/components/layout/admin_header"
import Footer from "@/components/layout/footer"
import StoreProvider from "@/store/storeProvider"
import dynamic from 'next/dynamic';

// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false });
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <StoreProvider>
        <header className="fixed top-0 bg-white w-full shadow  z-10">
          <Admin_Header />
        </header>
        {children}
      </StoreProvider>
    </div>
  )
}