import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { workspaceId, title } = req.body;

  try {
    await sql`
      DELETE FROM workspaces
      WHERE id = ${workspaceId} AND name = ${title};
    `;
    return res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
