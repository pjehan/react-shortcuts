import type { Shortcut } from "../lib/interfaces";

interface Props {
    shortcut: Shortcut;
}

export default function ShortcutPreview({ shortcut }: Props) {
    let logoUrl = shortcut.image?.contentUrl;
    if (logoUrl) {
        logoUrl = 'https://shortcuts.api.pierre-jehan.com/' + logoUrl;
    } else {
        logoUrl = 'https://placehold.co/600x400';
    }

    return (
        <div className="flex flex-col gap-4 bg-light-100 dark:bg-dark-100 p-4 my-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{shortcut.title}</h2>
            <div className="flex gap-4">
                <img src={logoUrl} alt={shortcut.title} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex flex-col">
                    <p>{shortcut.description}</p>
                    <p>Software: {shortcut.software.name}</p>
                    <p>Categories: {shortcut.categories.map(category => category.name).join(", ")}</p>
                    <ul>
                        <li>Windows : {shortcut.windows}</li>
                        <li>Mac : {shortcut.macos}</li>
                        <li>Linux : {shortcut.linux}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}