/*
  # Create visitor tracking and comments tables

  1. New Tables
    - `page_visits`
      - `id` (uuid, primary key)
      - `page_path` (text)
      - `visited_at` (timestamp)
      - `ip_address` (text)
    
    - `comments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for reading and writing comments
    - Add policies for tracking visits
*/

-- Create page_visits table
CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visited_at timestamptz DEFAULT now(),
  ip_address text
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for page_visits
CREATE POLICY "Anyone can create page visits"
  ON page_visits FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view visit counts"
  ON page_visits FOR SELECT
  TO public
  USING (true);

-- Policies for comments
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);