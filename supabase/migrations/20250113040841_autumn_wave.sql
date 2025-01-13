/*
  # Update Tetris scores table policies

  1. Changes
    - Drop existing policies
    - Create new public access policies
  
  2. Security
    - Allow public read access
    - Allow public insert access (no authentication required)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read scores" ON tetris_scores;
DROP POLICY IF EXISTS "Authenticated users can insert scores" ON tetris_scores;

-- Create new policies
CREATE POLICY "Anyone can read scores"
  ON tetris_scores
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert scores"
  ON tetris_scores
  FOR INSERT
  TO public
  WITH CHECK (true);