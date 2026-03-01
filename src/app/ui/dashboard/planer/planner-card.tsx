'use client'
import {
    Card, 
    CardHeader,
    CardBody,
} from "@heroui/card";
//import {ScrollShadow} from "@heroui/scroll-shadow";
// import { useUser } from "@/app/context/sessionDataProvider";
// import { useDashboard } from "@/app/context/dashboardContext";
import BudgetCard from "./budget-card";
import GoalCard from "./goal-card";
//import { Suspense } from "react";
//import { BudgetsCardSkeleton, GoalsCardSkeleton } from "@/app/ui/Skeleletons";
import { getBudgetsService } from "@/app/lib/services/plannerServices";
import { getGoalsService } from "@/app/lib/services/plannerServices";
import { useUser } from "@/app/context/sessionDataProvider";
import { useState, useEffect } from "react"
import { Budget } from "@/app/lib/db/schemas/budgetsSchemas";
import { Goal } from "@/app/lib/db/schemas/goalsSchemas";
import { AddTransactionButton } from "../buttons";
import PlannerModal from "./planner-modal";

export default  function PlannerCard() {
  const user = useUser()
  const userId = user.sessionUser.user_id;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const getBudgetsAndGoals = async () => {
      const budgets = await getBudgetsService(userId);
      const goals = await getGoalsService(userId);
      setBudgets(budgets);
      setGoals(goals);
    };
    getBudgetsAndGoals();
  }, [userId]);

    const handleAddBudget = () => {
        //console.log("Add Budget");
        setIsModalOpen(true);
    }

    const handleAddGoal = () => {
        //console.log("Add Goal");
        setIsModalOpen(true);
    }
    return (
        <>
            {isModalOpen && <PlannerModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />}
            <div className="flex flex-col gap-4 lg:flex-row justify-between h-full">
                <Card className="w-full max-w-full h-full lg:w-1/2">
                    <CardHeader>
                        <h1 className="text-xl text-gray-400">Budgets</h1>
                    </CardHeader>
                    {budgets.length === 0 ? (
                        <Card className="h-32 w-1/4 m-3 mt-0">
                            <CardHeader>
                                <h1 className="text-lg text-gray-400">No budgets found</h1>
                            </CardHeader>
                            <CardBody>
                                <AddTransactionButton onPress={handleAddBudget}>
                                    <p>Add Budget</p>
                                </AddTransactionButton>
                            </CardBody>
                        </Card>
                    ) : (
                        <CardBody>
                            {budgets.map((budget) => (
                                <BudgetCard key={budget.budget_id} budget={budget} />
                            ))}
                        </CardBody>
                    )}
                </Card>
                <Card className="w-full max-w-full h-full lg:w-1/2">
                    <CardHeader>
                        <h1 className="text-lg text-gray-400">Goals</h1>
                    </CardHeader>
                    {goals.length === 0 ? (
                        <Card className="h-32 w-1/4 m-3 mt-0">
                            <CardHeader>
                                <h1 className="text-xl text-gray-400">No goals found</h1>
                            </CardHeader>
                            <CardBody>
                                <AddTransactionButton onPress={handleAddGoal}>
                                    <p>Add Goal</p>
                                </AddTransactionButton>
                            </CardBody>
                        </Card>
                    ) : (
                    <CardBody>
                        {goals.map((goal) => (
                            <GoalCard key={goal.goal_id} goal={goal} />
                        ))}
                    </CardBody>
                    )}
                </Card>
            </div>
        </>
    )
}