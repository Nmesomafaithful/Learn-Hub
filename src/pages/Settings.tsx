import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const SettingsPage = () => {
  const { theme, setTheme, saveTheme, revertTheme, isDirty } = useTheme();
  const [draft, setDraft] = useState(theme);

  useEffect(() => setDraft(theme), [theme]);
  useEffect(() => setTheme(draft as any), [draft]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        <label className="flex items-center justify-between mb-4">
          <span>Theme</span>
          <select value={draft} onChange={(e) => setDraft(e.target.value as any)} className="p-2 border rounded bg-white dark:bg-gray-800">
            <option value="dark">Futuristic (Dark)</option>
            <option value="light">Light</option>
          </select>
        </label>
        <div className="flex justify-end gap-2">
          <button onClick={() => revertTheme()} className="px-3 py-1 rounded border">Revert</button>
          <button onClick={async () => await saveTheme()} disabled={!isDirty} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
