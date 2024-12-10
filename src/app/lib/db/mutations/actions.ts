// This file will export functions that handle data mutations

'use server'

//import { queryDatabase } from "./neondb";

// Sample - server function 
/* async function createComment(formData: FormData) {
    // Create the comments table if it doesn't exist
    await queryDatabase`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
    
    const comment = formData.get('comment');
    
    // Insert the comment into the database
    await queryDatabase`INSERT INTO comments (comment) VALUES ($1)`, [comment];
  } */