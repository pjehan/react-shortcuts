interface Props {
    children: React.ReactNode;
    label?: string;
    htmlFor?: string;
}

export default function FieldGroup({ children, label, htmlFor }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor} className="text-lg font-semibold">{label}</label>
            {children}
        </div>
    );
}