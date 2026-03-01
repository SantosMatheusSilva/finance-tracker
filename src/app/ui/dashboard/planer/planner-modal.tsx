import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Tabs,
    Tab,
} from "@heroui/react";
import AddBudgetForm from "./add-budget-form";
import AddGoalForm from "./add-goal-form";


interface PlannerModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PlannerModal({isOpen, onOpenChange} : PlannerModalProps) {
    

    const tabs = [
        {
            key: "budgets",
            title: "Budgets",
            content: <AddBudgetForm />
        },
        {
            key: "goals",
            title: "Goals",
            content: <AddGoalForm />
        }
    ]
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
            <ModalContent>
                <ModalHeader>
                    <h1>Planner</h1>
                </ModalHeader>
                <ModalBody 
                className="items-center"
                >
                    <Tabs items={tabs} className="items-center">
                        {tabs.map((tab) => (
                            <Tab key={tab.key} title={tab.title} className="text-center items-center">
                                {tab.content}
                            </Tab>
                        ))}
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}