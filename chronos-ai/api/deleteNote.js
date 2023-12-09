import { createClient } from '@supabase/supabase-js';
import { notesIndex } from './pinecone'; // Importing Pinecone client

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).send('Method Not Allowed');
  }

  const { noteId } = req.body;

  if (!noteId) {
    return res.status(400).json({ error: 'Note ID is required' });
  }

  try {
    // Delete the note from the Supabase database
    const { error: supabaseError } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (supabaseError) {
      console.error('Error deleting note:', supabaseError);
      return res.status(500).json({ error: 'Error deleting note' });
    }

    // Delete the corresponding entry from Pinecone
    try {
      await notesIndex.deleteOne(noteId.toString()); // Assuming deleteOne is the correct method for your Pinecone client
    } catch (pineconeError) {
      console.error('Error deleting note from Pinecone:', pineconeError);
      // Decide how to handle partial failure (note deleted in Supabase but not in Pinecone)
      // This might involve logging the error or attempting a compensating transaction
    }

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
