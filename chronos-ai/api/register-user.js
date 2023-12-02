// chronos-ai/api/register-user.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  console.log('Request body:', req.body);

  const { clerkUserId, email, name } = req.body;

  try {
    // First, check if the user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE clerk_user_id = ${clerkUserId}
    `;

    if (existingUser.count > 0) {
      // User already exists, no need to insert
      return res.status(409).json({ error: 'User already exists' });
    }

    // User does not exist, proceed to insert
    const result = await sql`
      INSERT INTO users (clerk_user_id, email, name)
      VALUES (${clerkUserId}, ${email}, ${name})
      RETURNING *;
    `;

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
