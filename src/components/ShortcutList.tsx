import type { Shortcut } from "../lib/interfaces";
import ShortcutPreview from "./ShortcutPreview";

interface Props {
    shortcuts: Shortcut[],
    loading: boolean
}

export default function ShortcutList({ shortcuts, loading }: Props) {
    let content = null;
    if (loading) {
        content = "Loading...";
    } else {
        content = shortcuts.map(shortcut => <ShortcutPreview key={shortcut.id} shortcut={shortcut} />);
    }
    
    return (
        <div className="flex flex-col gap-4 bg-light-100 dark:bg-dark-100 p-4 my-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Shortcuts ({ shortcuts.length })</h2>
            {content}
        </div>
    );
}