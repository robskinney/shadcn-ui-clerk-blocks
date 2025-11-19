export default function ComponentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center border rounded-lg p-4 min-h-40 bg-muted dark:bg-muted/10">
      {/* <div className="flex items-center justify-center bg-green-500"> */}
      {children}
      {/* </div> */}
    </div>
  );
}
