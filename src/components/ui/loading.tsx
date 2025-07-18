export const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="loader"></div>
      <p className="text-foreground text-lg font-medium">{message}</p>
    </div>
  );
};