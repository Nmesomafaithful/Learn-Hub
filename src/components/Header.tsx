import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import SettingsModal from "@/components/SettingsModal";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Learn Hub</Link>
        <div className="flex items-center gap-3">
          <Link to="/courses" className="hidden md:inline">Courses</Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open settings"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ⚙️
          </button>
        </div>
      </div>
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Header;
