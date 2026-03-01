'use client'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@heroui/card";
import {
    Progress,
} from "@heroui/progress";
import { Budget } from "@/app/lib/db/schemas/budgetsSchemas";



const calculateDaysLeft = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}


export default function BudgetCard({ budget }: { budget: Budget }) {
    return (
        <Card key={budget.budget_id} className="h-32 w-1/4 m-3 mt-0">
        <CardHeader>
            <h1>{budget.expense_category}</h1>
        </CardHeader>
        <CardBody>
            <h2>{budget.status}</h2>
            <Progress 
             classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-green-500 to-red-500",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
            size="md"
            color="success"
            label={budget.status} // TODO: switch for days left
            radius="sm"
            showValueLabel={true}
            value={budget.budget_amount} // TODO: implement function to calculate current expense amount for the goal.
            maxValue={budget.budget_amount} />
        </CardBody>
        <CardFooter className="flex flex-row justify-between">
            <p>{budget.period_start}</p>
            <p>{budget.period_end}</p>
            <p>{calculateDaysLeft(budget.period_start, budget.period_end)} days left</p>
        </CardFooter>
    </Card>
    )
}


