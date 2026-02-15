export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        relative
        max-w-7xl
        mx-auto
        px-6 md:px-10 lg:px-12
      "
    >
      {children}
    </div>
  );
}
