import { useEffect, useState } from "react";
import Select from "react-select";
import type { Category } from "../../lib/interfaces";
import { getCollection } from "../../lib/api";

interface Props {
    onChange: (categories: number[]) => void;
}

export default function CategorySelect({ onChange }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCollection<Category>('categories').then(data => {
            setCategories(data);
            setIsLoading(false);
        });
    }, []);

    const categoryOptions = categories.map(category => ({ value: category.id, label: category.name }));

    return (
        <Select
            id="categories"
            options={categoryOptions}
            isMulti
            isSearchable
            isLoading={isLoading}
            placeholder="Select categories..."
            onChange={selectedOption => onChange(selectedOption ? selectedOption.map(option => option.value) : [])}
        />
    );
}