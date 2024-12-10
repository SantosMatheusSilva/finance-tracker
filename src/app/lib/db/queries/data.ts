// This file contains all the data fetch functions from the database

import { } from '../definitions/types';
import { queryDb } from '../neondb';

// Sample function 
export async function getData() {
  const response = await queryDb`SELECT version()`;
  return response[0].version;
}

