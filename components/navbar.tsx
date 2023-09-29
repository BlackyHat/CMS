import MobileNav from './mobile-nav';
import { ThemeToggle } from './theme-toggle';
import MainNav from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <div className="hidden min-[640px]:inline-block">
          <MainNav className="mx-6 overflow-x-auto" />
        </div>

        <div className="min-[639px]:hidden">
          <MobileNav />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
