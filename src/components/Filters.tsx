import SoftwareSelect from "./form/SoftwareSelect";
import CategorySelect from "./form/CategorySelect";

export interface FiltersInterface {
    software: number|null;
    categories: number[];
}

interface Props {
    filters: FiltersInterface;
    onChange: (filters: FiltersInterface) => void;
}

export default function Filters({ filters, onChange }: Props) {
    return (
        <div className="flex flex-col gap-4 bg-light-100 dark:bg-dark-100 p-4 my-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Filters</h2>
            <div className="flex flex gap-4">
                <div>
                    <label htmlFor="software">Software</label>
                    <SoftwareSelect onChange={selectedValue => onChange({ ...filters, software: selectedValue })}/>
                </div>
                <div>
                    <label htmlFor="categories">Categories</label>
                    <CategorySelect onChange={selectedValues => onChange({ ...filters, categories: selectedValues })}/>
                </div>
            </div>
        </div>
    );
}