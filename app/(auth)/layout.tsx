export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-full w-full bg-[url('/img/signup_bg.jpg')] bg-repeat bg-50%">
      {children}
    </div>
  );
}
