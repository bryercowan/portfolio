/*
  # Update Tetris scores table with public access

  1. Changes
    - Add IF NOT EXISTS checks for policies
    - Change insert policy to allow public access
  
  2. Security
    - Ensure public read access
    - Allow public insert access (no authentication required)
*/

DO $$ BEGIN
  CREATE POLICY IF NOT EXISTS "Anyone can read scores"
    ON tetris_scores
    FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Drop the existing insert policy if it exists
DROP POLICY IF EXISTS "Authenticated users can insert scores" ON tetris_scores;

-- Create new public insert policy
CREATE POLICY "Anyone can insert scores"
  ON tetris_scores
  FOR INSERT
  TO public
  WITH CHECK (true);