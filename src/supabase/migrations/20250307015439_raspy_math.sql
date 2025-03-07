/*
  # Add auth users policy for comments

  1. Changes
    - Add policy to allow joining comments with auth.users
    - Enable access to auth.users email for authenticated users
    - Update foreign key constraint to reference auth.users

  2. Security
    - Ensures comments can only reference valid auth.users
    - Maintains data integrity with proper foreign key constraints
*/

-- Add foreign key constraint to auth.users
ALTER TABLE comments
DROP CONSTRAINT IF EXISTS comments_user_id_fkey,
ADD CONSTRAINT comments_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id);

-- Create policy to allow reading auth.users email
CREATE POLICY "Allow reading user emails for comments"
ON auth.users
FOR SELECT
TO authenticated
USING (true);