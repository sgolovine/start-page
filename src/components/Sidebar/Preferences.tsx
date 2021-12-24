export const Preferences = () => {
  return (
    <div>
      <h2 className="mx-1 text-xl font-bold">Preferences</h2>
      <div className="mt-4">
        <div className="h-12 flex flex-row items-center justify-between px-4">
          <p className="font-semibold text-lg">Dark Theme</p>
          <input className="h-5 w-5" type="checkbox" />
        </div>
      </div>
    </div>
  );
};
