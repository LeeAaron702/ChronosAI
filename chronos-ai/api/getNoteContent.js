import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  console.log('get note content')

  const { noteId, workspaceId } = req.body;
  console.log("🚀 ~ file: getNoteContent.js:12 ~ handler ~ workspaceId:", workspaceId)
  console.log("🚀 ~ file: getNoteContent.js:12 ~ handler ~ noteId:", noteId)

  if (!noteId || !workspaceId) {
    return res.status(400).json({ error: 'Note ID and Workspace ID are required' });
  }

  const { data, error } = await supabase
    .from('notes')
    .select('content')
    .eq('id', noteId)
    .eq('workspace_id', workspaceId)
    .select();
  console.log("🚀 ~ file: getNoteContent.js:25 ~ handler ~ data:", data)

  if (error) {
    console.error('Error fetching note content:', error);
    return res.status(500).json({ error: 'Error fetching note content' });
  }

  return res.status(200).json(data);
}
