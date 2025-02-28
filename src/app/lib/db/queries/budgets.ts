import { queryDb } from "../neondb";
import { Budget } from "../schemas/budgetsSchemas";
import { formatDateToLocal} from "../../utils/utils";

export async function getBudgets(userId: number): Promise<Budget[]> {
    try {
        const data: Budget[] = await queryDb`
        SELECT 
            budgets.budget_id,
            budgets.user_id,
            budgets.expense_category AS category,
            budgets.budget_amount,
            budgets.status,
            budgets.period_start,
            budgets.period_end
        FROM budgets
        WHERE budgets.user_id = ${userId}
        ORDER BY budgets.period_end DESC
        `;
        const budgets = data.map((budget) => ({
            ...budget,
            period_start: formatDateToLocal(budget.period_start),
            period_end: formatDateToLocal(budget.period_end)
        }))
        return budgets;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch budgets.');
    }
}