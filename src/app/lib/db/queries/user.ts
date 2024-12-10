import { User } from '@/app/lib/db/definitions/types';
import { queryDb } from '../neondb';

// Function to query user data
export async function getUserData(userId: number): Promise<User> {
    try {
        const data: User[]= (await queryDb`
        SELECT * FROM users WHERE user_id = ${userId} `) as User[];
   /*    const data = await queryDb` 
        SELECT 
          user_id,
          username,
          email
        FROM users
        WHERE user_id = ${userId};
        `; */
  
       /*  const {user_id, username, email, password } = data[0];
        return { user_id, username, email, password }; */
        const user = data[0];
        return user;
  
    } catch (error) {
      console.error('Database error', error);
      throw new Error('Failed to fetch user.');
    }
  
  }



