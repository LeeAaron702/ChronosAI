import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).send('Method Not Allowed');
  }

  const { noteId, workspaceId, content } = req.body;

  if (!noteId || !workspaceId || content === undefined) {
    return res.status(400).json({ error: 'Note ID, Workspace ID, and content are required' });
  }

  const { error } = await supabase
    .from('notes')
    .update({ content })
    .eq('id', noteId)
    .eq('workspace_id', workspaceId);

  if (error) {
    console.error('Error saving note content:', error);
    return res.status(500).json({ error: 'Error saving note content' });
  }

  return res.status(200).json({ message: 'Note content saved successfully' });
}
