import {
    Button, 
    ButtonGroup,
    ButtonProps,
    ButtonGroupProps
} from "@heroui/button";
import{
    PencilIcon,
    TrashIcon,
    PlusIcon,
    ArrowRightCircleIcon,
    PowerIcon
} from '@heroicons/react/24/solid';



// The interfaces that will define the props for the buttons components.
// It extends the BUttonProps from the lib to use its default values.
/**
 * props for the Buttons component.
 */
interface BaseButtonProps extends ButtonProps {
    /* * Indicates if the button is icon-only. Defaults to `true` in the component. */
    isIconOnly?: ButtonProps['isIconOnly'];
    /** Aria-label for accessibility purposes. */
    ariaLabel?: string;
    /** Size of the button. Defaults to `"sm"` in the component. */
    size?: ButtonProps['size'];
    /** Color of the button. Defaults to `"primary"` in the component. */
    color?: ButtonProps['color'];
    /** Border radius of the button. Defaults to `"sm"` in the component. */
    radius?: ButtonProps['radius'];
    /** Variant of the button style. Defaults to `"default"` in the component. */
    variant?: ButtonProps['variant'];
    /** Icon to display on the button. Defaults to `null` in the component. */
    startContent?: ButtonProps['startContent'];
    /** Icon to display on the button. Defaults to `null` in the component. */
    endContent?: ButtonProps['endContent'];
    /** Icon to render inside the button. */
    icon?: React.ReactNode;
    /** element to render inside the button. Defaults to `null` in the component. */
    children?: React.ReactNode;
    /** Event trigger once the button is pressed */
    onPress?: () => void;
    onClose?: () => void;    
}

/**
 * props for the ButtonsGroup component.
 */
interface BaseButtonGroupProps extends ButtonGroupProps {
    /* * Variant of the ButtonGroup Style. Default to `"light"`. */
    variant?: ButtonGroupProps['variant'];
    /* * Size of the ButtonGroup. Default to `"sm"`. */
    size?: ButtonGroupProps['size'];
    /* * Color of the ButtonGroup. Default to `"primary"`. */
    radius?: ButtonGroupProps['radius'];
    /* * Border radius of the ButtonGroup. Default to `"sm"`. */
    color?: ButtonGroupProps['color'];
    onDelete?: (transactionId: number) => void; 
    transactionId?: number; 
}

/**
 * A button for editing transactions, renders as an icon only button.
 * @param {BaseButtonProps} props - The props for the button component.
 * @returns {JSX.Element} A styled button with an edit (pencil) icon.
*/
// Edit Transaction Button 
export function EditButton( {
    isIconOnly = true, 
    ariaLabel = 'Edit', 
    size = 'sm', 
    color = 'primary', 
    radius = 'sm', 
    icon = <PencilIcon className="size-4" />,
    onPress,
    ...rest
}: BaseButtonProps ) : JSX.Element {

    return (
        <Button isIconOnly={isIconOnly} aria-label={ariaLabel} size ={size} color={color} radius={radius} onPress={onPress} {...rest}>
            {icon}
        </Button>
    )
}

// Delete Transaction Button
export function DeleteButton( {
    isIconOnly = true,
    ariaLabel = 'Delete',
    size = 'sm',
    color = 'danger',
    radius = 'sm',
    icon = <TrashIcon className="size-4" />,
    onPress,
    ...rest
}: BaseButtonProps ) : JSX.Element {

    return (
        <Button isIconOnly={isIconOnly} aria-label={ariaLabel} size={size} color={color} radius={radius} onPress={onPress} {...rest}>
            {icon}
        </Button>
    )
}

/**
 * A buttonGroup the ActionButtons. Servers as a wrapper for more than one button.
 * @param {BaseButtonGroupProps} props - The props for the ButtonGroup component.
 * @returns {JSX.Element} A styled button with an edit (pencil) icon.
*/

// Buttons Wrapper
export function ActionButtons({
    variant = 'light',
    size = 'sm',
    radius = 'md',
    onDelete,
    transactionId,
    ...rest
} : BaseButtonGroupProps & {transactionId: number}): JSX.Element {

    return(
        <ButtonGroup variant={variant} size={size} radius={radius} {...rest}>
             <DetailsButton />
            <EditButton />
            <DeleteButton  onPress={() => onDelete && onDelete(transactionId)}/>
        </ButtonGroup>
    )
}

// Add TRansaction Button
export function AddTransactionButton({
    ariaLabel = 'Add Transaction',
    size = 'sm',
    color = 'primary',
    radius = 'sm',
    startContent = <PlusIcon className="size-5"/>,
    children = <p>Add Transaction</p>,
    onPress,
    ...rest
} : BaseButtonProps) : JSX.Element {

    return(
        <Button aria-label={ariaLabel} size={size} color={color} radius={radius} startContent={startContent} onPress={onPress} {...rest}>
             {children}
        </Button>

    )
}

//Details Button
export function DetailsButton({
    ariaLabel = 'Details',
    size = 'sm',
    color = 'primary',
    radius = 'sm',
    isIconOnly = true,
    icon= <ArrowRightCircleIcon className="size-5" />,
    onPress,
    ...rest
    } : BaseButtonProps) : JSX.Element {
        return(
            <Button aria-label={ariaLabel} size={size} color={color} radius={radius} isIconOnly={isIconOnly} onPress={onPress} {...rest} >
                {icon}
            </Button>
            )
}


// Close Button
export function CancelButton ({
ariaLabel = 'cancel',
size = 'sm',
color = 'default',
radius = 'md',
children = <p>Cancel</p>,
onPress,
...rest
} : BaseButtonProps) : JSX.Element {
    return(
        <Button aria-label={ariaLabel} size={size} color={color} radius={radius} onPress={onPress} {...rest}>
            {children}
        </Button>
    )
}

export function ConfirmButton({
    ariaLabel = 'Confirm',
    size = 'sm',
    color = 'primary',
    radius = 'sm',
    children = <p>Confirm</p>,
    onPress,
    ...rest
} : BaseButtonProps) : JSX.Element {
    return(
        <Button aria-label={ariaLabel} size={size} color={color} radius={radius} onPress={onPress} {...rest}>
            {children}
        </Button>
    )
}

export function LogoutButton({
    ariaLabel = 'Log Out',
    size = 'sm',
    color = 'danger',
    radius = 'sm',
    startContent = <PowerIcon className="size-5"/>,
    children = <p>Log Out</p>,
    onPress,
    ...rest
} : BaseButtonProps) : JSX.Element {
    return(
        <Button aria-label={ariaLabel} startContent={startContent} size={size} color={color} radius={radius} onPress={onPress} {...rest}>
            {children}
        </Button>
    )
}