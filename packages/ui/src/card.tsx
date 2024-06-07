export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 rounded-md">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      {children}
    </div>
  );
}