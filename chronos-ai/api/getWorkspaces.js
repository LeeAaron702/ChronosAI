// getWorkspaces.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('workspaces')
      .select('id, name, owner_id')
      .eq('owner_id', userId);

    if (error) {
      throw error;
    }
    return res.status(200).json(data); // Send the entire data array

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
