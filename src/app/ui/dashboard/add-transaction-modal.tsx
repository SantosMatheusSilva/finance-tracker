'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    RadioGroup, 
    Radio,
    Input,
    Divider,
    Select, 
    SelectItem,
    ModalProps
  } from "@heroui/react";
//import { useEffect } from "react";

interface BaseModalProps extends ModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onCloseAction: () => void;
} 

export default function AddTransactionModal({
    onOpenChange, 
    isOpen, 
    onCloseAction,
} : BaseModalProps )  {
  
    return (
        <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <> 
                    <ModalHeader
                    >
                        Add Transaction
                    </ModalHeader>
                    <Divider className="my-2"></Divider>
                    <ModalBody>
                                    <RadioGroup
                                    className="border-1 border-gray-500 rounded-lg p-2 flex justify-between w-full"
                                    size="lg"
                                    name="Transaction-Type"
                                    isRequired
                                    orientation="horizontal"
                                    label="Transaction Type"
                                    >
                                        <Radio className="w-full text-center" 
                                        value="Expense"
                                        size="lg"
                                        color="danger">
                                            Expense
                                        </Radio>
                                        <Radio 
                                        className="w-full text-center"
                                        color="primary"
                                        size="lg"
                                        value="Income"
                                        > 
                                            <strong className="text-xl">Income</strong></Radio>
                                    </RadioGroup>
                                    <Input
                                    label='Amount'
                                    placeholder="0.00"
                                    startContent={<p className="text-primary-500">€</p>}
                                    type="number"
                                    required
                                    variant="bordered"
                                    isRequired
                                    description='How much was it?'
                                    />

                                    <Select
                                    label="Acount"
                                    placeholder="Select an account"
                                    variant="bordered"
                                    isRequired
                                    description='Which account was used?'
                                    >
                                       <SelectItem></SelectItem>
                                    </Select>

                                    <Select
                                    label="Category"
                                    placeholder="Select a category"
                                    variant="bordered"
                                    isRequired
                                    description='What category suits it better?'
                                    > 
                                        <SelectItem></SelectItem>
                                    </Select>

                                    <Input
                                    label="Description"
                                    placeholder="Description"
                                    variant="bordered"
                                    description="What was it for?"
                                    />
                    </ModalBody>
                    <Divider className="my-2"></Divider>
                    <ModalFooter>
                        <Button color="danger" onPress={onClose}>Cancel</Button>
                        <Button color="primary" onPress={onCloseAction}>Add</Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    )
}