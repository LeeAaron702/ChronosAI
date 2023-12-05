import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { workspaceId, userId } = req.body;


  // Insert a new note into the 'notes' table
  const { data, error } = await supabase
  .from('notes')
  .insert([{ workspace_id: workspaceId, title: '', content: '' }])
  .select();
    
  if (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ error: 'Error creating note' });
  }

  return res.status(200).json(data[0]);
}
