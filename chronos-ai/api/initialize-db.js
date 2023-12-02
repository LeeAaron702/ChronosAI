// api/initialize-db.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Only allow POST requests to this endpoint
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Drop existing tables with CASCADE to remove dependencies
    await sql`DROP TABLE IF EXISTS notes CASCADE;`;
    await sql`DROP TABLE IF EXISTS workspaces CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;
    await sql`DROP TABLE IF EXISTS organizations CASCADE;`;
    await sql`DROP TABLE IF EXISTS collaborators CASCADE;`;

    // Organizations table
    await sql`CREATE TABLE IF NOT EXISTS organizations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );`;

    // Users table
    await sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      organization_id INTEGER REFERENCES organizations(id) NULL
    );`;

    // Workspaces table
    await sql`CREATE TABLE IF NOT EXISTS workspaces (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      is_shared BOOLEAN NOT NULL DEFAULT false,
      owner_id INTEGER REFERENCES users(id) NULL,
      organization_id INTEGER REFERENCES organizations(id) NULL
    );`;

    // Notes table
    await sql`CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER REFERENCES workspaces(id),
      title VARCHAR(255) NOT NULL,
      content TEXT
    );`;

    return res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    // If there's any error, return a 500 status with the error message
    return res.status(500).json({ error: error.message });
  }
}
