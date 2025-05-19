import Select from "react-select";
import { useApp } from "../../AppContext";

interface Props {
    onChange: (software: number | null) => void;
}

export default function SoftwareSelect({ onChange }: Props) {
    const state = useApp();
    const softwares = state?.software || [];
    const isLoading = state?.isSoftwareLoading || false;
    
    const softwareOptions = softwares.map(software => ({ value: software.id, label: software.name }));

    return (
        <Select
            id="software"
            name="software"
            options={softwareOptions}
            isSearchable
            isClearable
            isLoading={isLoading}
            placeholder="Select software..."
            onChange={selectedOption => onChange(selectedOption ? selectedOption.value : null)}
        />
    )
}