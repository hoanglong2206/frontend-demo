import { AppFooter, AppHeader } from "@/core/layouts/components";

const HomePage = async () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="grow"></main>
      <AppFooter />
    </div>
  );
};

export default HomePage;
