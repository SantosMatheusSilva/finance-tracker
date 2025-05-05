import {Spinner, SpinnerProps} from "@heroui/spinner";


interface LoadingProps {
    size?: SpinnerProps['size'];
    color?: SpinnerProps['color'];
    label?: SpinnerProps['label'];
    labelColor?: SpinnerProps['labelColor'];
}
export default function Loading({size, color, label, labelColor}: LoadingProps) {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Spinner size={size} color={color} label={label} labelColor={labelColor} />
        </div>
    )
}