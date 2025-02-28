import { queryDb } from "../neondb";
import { Goal } from "../schemas/goalsSchemas";
import { formatDateToLocal } from "../../utils/utils";

export async function getGoals(userId: number): Promise<Goal[]> {
    try {
        const data: Goal[] = await queryDb`
        SELECT * FROM goals WHERE user_id = ${userId}
        `;

        const goals = data.map((goal) => ({
            ...goal,
            deadline: formatDateToLocal(goal.deadline)
        }));
        return goals
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch goals.');
    }
}