// This file contains all the data fetch functions from the database

import {
    
} from './definitions';
import { queryDatabase } from './neondb';

// Sample function 
export async function getData() {
  const sql = queryDatabase;
  const response = await sql`SELECT version()`;
  return response[0].version;
}

// fetch User 

