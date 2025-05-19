import Select from "react-select";
import { useApp } from "../../AppContext";

interface Props {
    onChange: (categories: number[]) => void;
}

export default function CategorySelect({ onChange }: Props) {
    const state = useApp();
    const categories = state?.categories || [];
    const isLoading = state?.isCategoriesLoading || false;

    const categoryOptions = categories.map(category => ({ value: category.id, label: category.name }));

    return (
        <Select
            id="categories"
            name="categories"
            options={categoryOptions}
            isMulti
            isSearchable
            isLoading={isLoading}
            placeholder="Select categories..."
            onChange={selectedOption => onChange(selectedOption ? selectedOption.map(option => option.value) : [])}
        />
    );
}