/*
  # Create visitors and comments tables

  1. New Tables
    - `visitors`
      - `id` (uuid, primary key)
      - `visited_at` (timestamp)
      - `ip_address` (text)
    
    - `comments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `nickname` (text)
      - `content` (text)
      - `created_at` (timestamp)
      - `email` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for reading and writing comments
    - Add policies for tracking visitors
*/

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at timestamptz DEFAULT now(),
  ip_address text
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  nickname text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  email text NOT NULL
);

-- Enable RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Visitors policies
CREATE POLICY "Anyone can create visitor records"
  ON visitors
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view visitor count"
  ON visitors
  FOR SELECT
  TO public
  USING (true);

-- Comments policies
CREATE POLICY "Anyone can view comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);