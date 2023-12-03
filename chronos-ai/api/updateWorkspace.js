import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { workspaceId, newTitle } = req.body;

  try {
    await sql`
      UPDATE workspaces
      SET name = ${newTitle}
      WHERE id = ${workspaceId};
    `;
    return res.status(200).json({ message: 'Workspace updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
