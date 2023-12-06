// In api/updateNoteTitle.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).send('Method Not Allowed');
  }

  const { noteId, newTitle } = req.body;

  const { data, error } = await supabase
    .from('notes')
    .update({ title: newTitle })
    .eq('id', noteId)
    .select('id', 'workspace_id', 'title')

  if (error) {
    console.error('Error updating note title:', error);
    return res.status(500).json({ error: 'Error updating note title' });
  }

  return res.status(200).json(data);
}
