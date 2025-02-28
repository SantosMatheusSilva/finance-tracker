'use server';

import { queryDb } from "../neondb";
import { 
    updateGoalSchema, 
    createGoalSchema } from "../schemas/goalsSchemas";

// Mutation function to create a Goal 
export async function createGoal(formdata: FormData): Promise <{ message: string; errors?: object }> {
    // First validate the data from the form fields
    const validatedForm = createGoalSchema.safeParse({
        user_id: formdata.get('user_id'),
        category: formdata.get('category'),
        goal_name: formdata.get('goal_name'),
        description: formdata.get('description'),
        target_amount: formdata.get('target_amount'),
        deadline: formdata.get('deadline'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        errors: validatedForm.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create Goal',
        }
    }

    // Prepare data for insertion
    const {user_id, category, goal_name, description, target_amount, deadline} = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        INSERT INTO goals (user_id, category, goal_name, description, target_amount, deadline)
        VALUES (${user_id}, ${category}, ${goal_name}, ${description?? ''}, ${target_amount}, ${deadline})
        `;
        return {
            message: 'Goal created successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to create Goal',
        }
    }
}

// Mutation function to update a Goal
export async function updateGoal(goal_id: number, formdata: FormData): Promise <{ message: string; errors?: object }> {
    // First validate the data from the form fields
    const validatedForm = updateGoalSchema.safeParse({
        category: formdata.get('category'),
        goal_name: formdata.get('goal_name'),
        description: formdata.get('description'),
        target_amount: formdata.get('target_amount'),
        deadline: formdata.get('deadline'),
        status: formdata.get('status'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        errors: validatedForm.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to update Goal',
        }
    }

    // Prepare data for insertion
    const {category, goal_name, description, target_amount, deadline, status} = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        UPDATE goals
        SET 
        category = ${category}, 
        goal_name = ${goal_name}, 
        description = ${description}, 
        target_amount = ${target_amount}, 
        deadline = ${deadline}, 
        status = ${status}
        WHERE goal_id = ${goal_id}
        `;
        return {
            message: 'Goal updated successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to update Goal',
        }
    }
}

// Mutation function to Delete a Goal 
export async function deleteGoal(goal_id: number): Promise <{ message: string; errors?: object }> {
    // Insertion block TRY
    try {
        await queryDb`
        DELETE FROM goals
        WHERE goal_id = ${goal_id}
        `;
        return {
            message: 'Goal deleted successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to delete Goal',
        }
    }
}