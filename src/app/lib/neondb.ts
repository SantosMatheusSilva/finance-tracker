import { neon } from '@neondatabase/serverless';

// Create a persistent database connection
export const sql = neon(process.env.DATABASE_URL!);

// Function to run any SQL query
export async function queryDatabase(query: TemplateStringsArray, ...params: any[]): Promise<any[]> {
  const response = await sql(query, ...params);
  return response;
}
