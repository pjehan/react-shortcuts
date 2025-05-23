import { useState } from "react";
import CategorySelect from "./form/CategorySelect";
import SoftwareSelect from "./form/SoftwareSelect";
import FieldGroup from "./form/FieldGroup";
import Input from "./form/Input";
import Textarea from "./form/Textarea";
import type { Shortcut } from "../lib/interfaces";
import { API_URL } from "../lib/api";

interface Props {
    onSave: () => void;
}

export default function ShortcutForm({ onSave }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        const shortcut: Shortcut = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            context: formData.get("context") as string,
            windows: formData.get("windows") as string,
            macos: formData.get("macos") as string,
            linux: formData.get("linux") as string,
            software: '/software/' + formData.get("software"),
            categories: formData.getAll("categories").map(category => '/categories/' + category),
        };
        const response = await fetch(API_URL + 'shortcuts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shortcut),
        });
        if (response.ok) {
            const data = await response.json();
            onSave();
            console.log("Shortcut added:", data);
        } else {
            console.error("Error adding shortcut:", response.statusText);
        }
        setIsOpen(false);        
    }

    return (
        <div className="flex flex-col gap-4 p-4 my-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Add Shortcut</h2>
                <button onClick={() => setIsOpen(!isOpen)} className="text-blue-500">
                    {isOpen ? "Close" : "Open"}
                </button>
            </div>
            <form action={handleSubmit} className={`flex flex-col gap-4 ${isOpen ? "h-auto" : "h-0 overflow-hidden"}`} style={{ transition: "height 0.3s ease-in-out" }}>
                <FieldGroup htmlFor="title" label="Title">
                    <Input type="text" id="title" name="title" />
                </FieldGroup>
                <FieldGroup htmlFor="description" label="Description">
                    <Textarea id="description" name="description" rows={4}></Textarea>
                </FieldGroup>
                <FieldGroup htmlFor="context" label="Context">
                    <Textarea id="context" name="context" rows={4}></Textarea>
                </FieldGroup>
                <FieldGroup htmlFor="windows" label="Windows">
                    <Input type="text" id="windows" name="windows" />
                </FieldGroup>
                <FieldGroup htmlFor="macos" label="Mac OS">
                    <Input type="text" id="macos" name="macos" />
                </FieldGroup>
                <FieldGroup htmlFor="linux" label="Linux">
                    <Input type="text" id="linux" name="linux" />
                </FieldGroup>
                <FieldGroup htmlFor="software" label="Software">
                    <SoftwareSelect onChange={selectedValue => console.log(selectedValue)} />
                </FieldGroup>
                <FieldGroup htmlFor="categories" label="Categories">
                    <CategorySelect onChange={selectedValues => console.log(selectedValues)} />
                </FieldGroup>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">Add Shortcut</button>
            </form>
        </div>
    );
}