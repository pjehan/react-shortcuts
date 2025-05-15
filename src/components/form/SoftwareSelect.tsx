import { useEffect, useState } from "react";
import Select from "react-select";
import type { Software } from "../../lib/interfaces";
import { getCollection } from "../../lib/api";

interface Props {
    onChange: (software: number | null) => void;
}

export default function SoftwareSelect({ onChange }: Props) {
    const [softwares, setSoftwares] = useState<Software[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCollection<Software>('software').then(data => {
            setSoftwares(data);
            setIsLoading(false);
        });
    }, []);

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