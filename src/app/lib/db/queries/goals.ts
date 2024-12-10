import { queryDb } from "../neondb";
import { Goal } from "../definitions/types";

export async function getGoals(userId: number): Promise<Goal[]> {
    try {
        const data: Goal[] = await queryDb`
        SELECT * FROM goals WHERE user_id = ${userId}
        `;
        return data;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch goals.');
    }
}