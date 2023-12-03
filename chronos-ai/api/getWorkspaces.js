import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const result = await sql`
      SELECT name FROM workspaces WHERE owner_id = ${userId};
    `;
    console.log("🚀 ~ file: getWorkspaces.js:14 ~ handler ~ result:", result)
    // Extract the 'name' property from each workspace object
    const workspaceTitles = result.rows.map(workspace => workspace.name);
    return res.status(200).json(workspaceTitles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
