interface Props {
    children?: React.ReactNode;
    [key: string]: any;
}

export default function Textarea({ children, ...props }: Props) {
    return (
        <textarea
            {...props}
            className="border border-gray-300 rounded p-2"
        >
            {children}
        </textarea>
    );
}