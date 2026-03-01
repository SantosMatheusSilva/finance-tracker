// For Goals and Budgets services 
import { createGoal } from "../db/mutations/goals";
import { createBudget } from "../db/mutations/budgets";
import { getGoals } from "../db/queries/goals";
import { getBudgets } from "../db/queries/budgets";
import { CreateGoal, Goal } from "../db/schemas/goalsSchemas";
import { CreateBudget, Budget } from "../db/schemas/budgetsSchemas";

export const createGoalService = async (data: CreateGoal) : Promise<{ message: string; errors?: object }> => {
   try {
    const formData = new FormData();
    formData.append('user_id', data.user_id.toString());
    formData.append('category', data.category);
    formData.append('goal_name', data.goal_name);
    formData.append('description', data.description || '');
    formData.append('target_amount', data.target_amount.toString());
    formData.append('deadline', data.deadline);
    
    const result = await createGoal(formData);
    return result;
   } catch (error) {
    console.error('Service error:', error);
    return {
        message: 'Failed to create goal',
    };
   }
}

export const createBudgetService = async (data: CreateBudget) : Promise<{ message: string; errors?: object }> => {
    try {
        const formData = new FormData();
        formData.append('user_id', data.user_id.toString());
        formData.append('expense_category', data.expense_category);
        formData.append('budget_amount', data.budget_amount.toString());
        formData.append('period_start', data.period_start);
        formData.append('period_end', data.period_end);

        const result = await createBudget(formData);
        return result;
    } catch (error) {
        console.error('Service error:', error);
        return {
            message: 'Failed to create budget',
        };
    }
}

export const getGoalsService = async (userId: number) : Promise<Goal[]> => {
   try {
    const goals = await getGoals(userId);
    return goals;
   } catch (error) {
    console.error('Service error:', error);
    throw new Error('Failed to get goals');
   }
}

export const getBudgetsService = async (userId: number) : Promise<Budget[]> => {
    try {
        const budgets = await getBudgets(userId);
        return budgets;
    } catch (error) {
        console.error('Service error:', error);
        throw new Error('Failed to get budgets');
    }
}