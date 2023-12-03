import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end('Method not allowed');
  }

  const { workspaceId, title } = req.body;

  try {
    const { data, error } = await supabase
      .from('workspaces')
      .delete()
      .match({ id: workspaceId, name: title });

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      // No rows deleted, possibly because the workspace was not found
      return res.status(404).json({ message: 'Workspace not found' });
    }

    return res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
