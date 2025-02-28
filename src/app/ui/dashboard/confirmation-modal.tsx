import {  
    Modal,  
    ModalContent,  
    ModalHeader,  
    ModalBody,  
    ModalFooter,
    ModalProps,
    useDisclosure
} from "@nextui-org/modal";
import { 
    CancelButton,
    ConfirmButton,
 } from "./buttons";

interface BaseModalPops extends ModalProps {
    title?: string;
    message?: string;
    onClose: () => void;
    onConfirm: () => void;
}
export function ConfirmationModal({
    title = "Confirmation",
    message = "Are you sure you want to delete this transaction?",
    size = 'md',
    radius = 'md',
    shadow = 'md',
    backdrop = 'opaque',
    placement = 'auto',
    closeButton,
    onConfirm,
    onClose,
    ...rest
} : BaseModalPops) : JSX.Element {
    const { isOpen, onClose: handleClose } = useDisclosure()

    return(
        <Modal isOpen={isOpen} onClose={handleClose} size={size} radius={radius} shadow={shadow} backdrop={backdrop} placement={placement} closeButton={closeButton} {...rest}>
            <ModalContent>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalBody>
                    <p>
                        {message}
                    </p>
                </ModalBody>
                <ModalFooter>
                        <CancelButton onPress={onClose}>No</CancelButton>
                        <ConfirmButton onPress={() => onConfirm()}>Yes</ConfirmButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}