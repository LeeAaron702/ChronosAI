import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method not allowed');
    }
    const { clerkUserId, email, name } = req.body;

    try {
        // Check if the user already exists
        const { data: existingUser, error: findError } = await supabase
            .from('users')
            .select('*')
            .eq('clerk_user_id', clerkUserId)
            .maybeSingle();

        if (findError) {
            console.error('Error finding user:', findError);
            return res.status(500).json({ error: 'Error finding user' });
        }

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Insert the new user
        const { data, error: insertError } = await supabase
            .from('users')
            .insert([{ clerk_user_id: clerkUserId, email, name }]);

        if (insertError) {
            console.error('Error inserting user:', insertError);
            return res.status(500).json({ error: 'Error inserting user' });
        }

        // Return the inserted user data
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in handler:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
