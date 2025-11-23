import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Props { open: boolean; onClose: () => void }

const SettingsModal = ({ open, onClose }: Props) => {
  const { theme, setTheme, saveTheme, revertTheme, isDirty } = useTheme();
  const [draft, setDraft] = useState(theme);

  useEffect(() => {
    setDraft(theme);
  }, [open, theme]);

  useEffect(() => {
    // live preview
    setTheme(draft as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-medium mb-4">Settings</h3>
        <div className="mb-4">
          <label className="flex items-center justify-between">
            <span>Theme</span>
            <select value={draft} onChange={(e) => setDraft(e.target.value as any)} className="ml-2 p-2 border rounded bg-white dark:bg-gray-800">
              <option value="dark">Futuristic (Dark)</option>
              <option value="light">Light</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => { revertTheme(); onClose(); }} className="px-3 py-1 rounded border">Cancel</button>
          <button onClick={async () => { await saveTheme(); onClose(); }} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
