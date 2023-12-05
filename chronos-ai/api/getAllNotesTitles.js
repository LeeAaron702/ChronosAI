import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // The user ID should be passed as a query parameter
  const { workspaceIds } = req.body;
  // Fetch notes across all workspaces for a user
  const { data, error } = await supabase
    .from('notes')
    .select('id, workspace_id, title')
    .in('workspace_id', workspaceIds) // Use the workspace IDs from the request


  if (error) {
    console.error('Error fetching note titles:', error);
    return res.status(500).json({ error: 'Error fetching note titles' });
  }

  return res.status(200).json(data);
}
