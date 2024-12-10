'use server'

import { neon } from '@neondatabase/serverless';

/* export async function queryDb(query: TemplateStringsArray, ...args: (string | number ) []) {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql (query, ...args);
    return data;
} */

    export async function queryDb<T>(query: TemplateStringsArray, ...args: (string | number ) []): Promise<T[]> {
        try {
            const sql = neon(process.env.DATABASE_URL!);
            const data = await sql (query, ...args);
            return data as T[];
        } catch (error) {
            console.error(error);
            throw new Error('Failed to query the database');
        }
    } 

/* 
        export async function queryDb<T extends Record<string , number>>(
            query: TemplateStringsArray,
            ...args: (string | number)[]
        ): Promise<T[]> {
            try {
                const sql = neon(process.env.DATABASE_URL!);
                const data = await sql(query, ...args);
                return data as T[];
            } catch (error) {
                console.error(error);
                throw new Error('Failed to query the database');
            }
        } */
        
