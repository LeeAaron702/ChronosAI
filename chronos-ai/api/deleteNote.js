// chronos-ai/api/deleteNote.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
    console.log("delete note")
  if (req.method !== 'DELETE') {
    return res.status(405).send('Method Not Allowed');
  }

  const { noteId } = req.body;

  if (!noteId) {
    return res.status(400).json({ error: 'Note ID is required' });
  }

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  if (error) {
    console.error('Error deleting note:', error);
    return res.status(500).json({ error: 'Error deleting note' });
  }

  return res.status(200).json({ message: 'Note deleted successfully' });
}
