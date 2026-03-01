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

//import { getGoalsService } from "@/app/lib/services/plannerServices";
import { Goal } from "@/app/lib/db/schemas/goalsSchemas";



const calculateDaysLeft = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}


export default function GoalCard({ goal }: { goal: Goal }) {

    const calculateGoalProgress = (goal: Goal) => {
        const currentAmount = goal.current_amount;
        const targetAmount = goal.target_amount;
        const progress = (currentAmount / targetAmount) * 100;
        return progress;
    }

    return (
        <Card key={goal.goal_id} className="h-32 w-1/4 m-3 mt-0">
            <CardHeader>
                <h1>{goal.goal_name}</h1>
            </CardHeader>
            <CardBody>
                <h2>{goal.status}</h2>
            </CardBody>
            <Progress 
             classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-green-500 to-red-500",
                label: "tracking-wider font-medium text-default-600",
                value: `text-foreground/60 ${calculateGoalProgress(goal)}%`,
              }}
            size="md"
            color="success"
            label={calculateDaysLeft(goal.deadline, goal.created_at.toISOString())}// TODO: switch for days left
            radius="sm"
            showValueLabel={true}
            value={goal.current_amount} // TODO: implement function to calculate current expense amount for the goal.
            maxValue={goal.target_amount} />
            <CardFooter>
                <p>{goal.deadline}</p>
            </CardFooter>
        </Card>
    )
}