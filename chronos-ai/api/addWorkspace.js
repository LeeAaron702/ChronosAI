import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, isShared, ownerId } = req.body;
  console.log("🚀 ~ file: addWorkspace.js:9 ~ handler ~ req.body:", req.body)

  try {
    const result = await sql`
      INSERT INTO workspaces (name, is_shared, owner_id)
      VALUES (${title}, ${isShared}, ${ownerId})
      RETURNING *;
    `;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
