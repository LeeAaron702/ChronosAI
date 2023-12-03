import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end('Method not allowed');
  }

  const { workspaceId, newTitle } = req.body;

  try {
    const { data, error } = await supabase
      .from('workspaces')
      .update({ name: newTitle })
      .eq('id', workspaceId);

    if (error) {
      throw error;
    }

    // If no rows are affected, it could mean the workspace doesn't exist or the title is the same
    if (data.length === 0) {
      return res.status(404).json({ message: 'Workspace not found or no changes made' });
    }

    return res.status(200).json({ message: 'Workspace updated successfully', data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
