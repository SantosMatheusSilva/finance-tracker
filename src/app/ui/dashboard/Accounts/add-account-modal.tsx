import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@heroui/react";
import AddAccountForm from "./add-account-form";

interface AddAccountModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddAccountModal({ isOpen, onOpenChange }: AddAccountModalProps) {
    
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Add Account</ModalHeader>
                <ModalBody>
                    <AddAccountForm />
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}