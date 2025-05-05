import { User } from '../schemas/userSchemas';
import { queryDb } from '../neondb';

// Function to query user data
export async function getUserData(userId: number): Promise<User> {
    try {
        const data: User[]= (await queryDb`
        SELECT * FROM users WHERE user_id = ${userId} `) as User[];
        const user = data[0];
        console.log('User data:', user);
        return user;
  
    } catch (error) {
      console.error('Database error', error);
      throw new Error('Failed to fetch user.');
    }
  
  }



