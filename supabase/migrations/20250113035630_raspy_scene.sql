/*
  # Create Tetris Leaderboard Table

  1. New Tables
    - `tetris_scores`
      - `id` (uuid, primary key)
      - `player_name` (text)
      - `score` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `tetris_scores` table
    - Add policy for anyone to read scores
    - Add policy for authenticated users to insert their own scores
*/

CREATE TABLE IF NOT EXISTS tetris_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tetris_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scores"
  ON tetris_scores
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert scores"
  ON tetris_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (true);