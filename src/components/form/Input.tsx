interface Props {
    [key: string]: any;
}

export default function Input(props: Props) {
    return (
        <input
            {...props}
            className="border border-gray-300 rounded p-2"
        />
    );
}