/*
  # Create waitlist table for email collection

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anonymous users to insert emails
    - Add policy for authenticated users to read waitlist data
*/

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'joined')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to join waitlist
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read waitlist
CREATE POLICY "Authenticated users can read waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at DESC);