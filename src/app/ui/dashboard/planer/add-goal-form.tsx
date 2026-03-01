import {
    Form,
    Input,
    Button,
    Select,
    SelectItem,
} from "@heroui/react";


export default function AddGoalForm() {
    return (
        <Form 
        className="items-center w-full max-w-lg flex flex-col gap-4">
            <Select label="Category" labelPlacement="outside" isRequired variant="bordered" placeholder="Select Category" errorMessage="apply zod error message here">
                <SelectItem key="savings">Savings</SelectItem>
                <SelectItem key="investment">Investment</SelectItem>
                <SelectItem key="debt">Debt</SelectItem>
                <SelectItem key="purchase">Purchase</SelectItem>
                <SelectItem key="lifestyle">Lifestyle</SelectItem>
                <SelectItem key="family">Family</SelectItem>
                <SelectItem key="business">Business</SelectItem>
                <SelectItem key="vacations">Vacations</SelectItem>
                <SelectItem key="other">Other</SelectItem>
            </Select>
            <Input label="Goal Name" labelPlacement="outside" isRequired variant="bordered" type="text" placeholder="Enter Goal Name" />
            <Input label="Description" labelPlacement="outside" variant="bordered" type="text" placeholder="Enter Description" />
            <Input label="Target Amount" labelPlacement="outside" isRequired variant="bordered" type="number" placeholder="Enter Target Amount" />
            <Input label="Deadline" labelPlacement="outside" isRequired variant="bordered" type="date" placeholder="Enter Deadline" />
            <Button type="submit" color="primary" /* isLoading={isSubmitting} disabled={isSubmitting} */ className="mt-4">Add Goal</Button>
        </Form>
    )
}