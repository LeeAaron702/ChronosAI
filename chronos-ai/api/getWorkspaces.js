import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('workspaces')
      .select('name')
      .eq('owner_id', userId);

    if (error) {
      throw error;
    }

    // Extract the 'name' property from each workspace object
    const workspaceTitles = data.map(workspace => workspace.name);
    return res.status(200).json(workspaceTitles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
