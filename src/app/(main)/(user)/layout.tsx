import { InstagramNavbar, InstagramSidebar, BottomNav } from "@/features/instagram/components";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <InstagramNavbar />
      <InstagramSidebar />
      {/* Main content: offset for top navbar (56px) and sidebar (224px on lg, 256px on xl) */}
      <div className="pt-14 lg:pl-56 xl:pl-64 pb-14 lg:pb-0 min-h-screen">
        <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}

