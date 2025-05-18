interface TopbarProps {
  onMenuClick?: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <header className="h-16 bg-white shadow flex items-center px-4 dark:bg-neutral-900">
      <button onClick={onMenuClick} className="text-gray-600 dark:text-gray-300 mr-4">
        ☰
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </header>
  );
};
