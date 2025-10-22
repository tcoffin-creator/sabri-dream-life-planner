/*
  # Dream Life Planner Database Schema

  1. New Tables
    - `user_plans`
      - `id` (uuid, primary key) - Unique identifier for each plan
      - `user_id` (uuid) - User identifier for future auth integration
      - `created_at` (timestamptz) - When the plan was created
      - `updated_at` (timestamptz) - Last update timestamp
      - `status` (text) - Plan status: 'draft', 'analyzing', 'completed'
      
      Form Data Fields:
      - `has_decided` (boolean) - Has made clear decision
      - `habits_to_cut` (text) - Old habits/beliefs to cut off
      - `new_version_description` (text) - Description of new self
      - `motivation_fuel` (text) - 'pleasure', 'pain', or 'both'
      - `fuel_description` (text) - Description of pain/pleasure driver
      - `daily_fuel_reminder` (text) - How they'll remind themselves
      - `dream_day` (text) - Detailed dream day description
      - `dream_week` (text) - Detailed dream week description
      - `ideal_living` (text) - Ideal living situation details
      - `monthly_costs` (jsonb) - Breakdown of dream lifestyle costs
      - `current_expenses` (numeric) - Current monthly expenses
      - `dream_expenses` (numeric) - Dream lifestyle monthly expenses
      - `financial_gap` (numeric) - Calculated difference
      - `daily_focus` (text[]) - Array of things to focus on
      - `things_to_cut` (text[]) - Array of distractions/habits to eliminate
      - `environment_changes` (text) - Environmental changes to implement
      - `progress_tracking_method` (text) - How they'll track progress
      - `daily_wins` (text[]) - Small wins to celebrate
      - `daily_planning_routine` (text) - Daily planning description
      - `action_commitment` (text) - Commitment to take action
      - `additional_thoughts` (text) - Any other insights
    
    - `ai_analyses`
      - `id` (uuid, primary key) - Unique identifier
      - `plan_id` (uuid, foreign key) - References user_plans
      - `created_at` (timestamptz) - When analysis was generated
      - `analysis_content` (jsonb) - Complete AI analysis result
      - `win_ticker` (text[]) - Quick wins to track
      - `dream_life_summary` (text) - Synthesized dream life summary
      - `focus_areas` (text[]) - What to focus on
      - `cut_out_items` (text[]) - What to cut out (decidere)
      - `action_steps` (jsonb) - Detailed action plan steps
      - `momentum_strategy` (text) - Momentum building approach
      - `environment_blueprint` (text) - Environment engineering plan

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (auth can be added later)
    - Policies will be restrictive once auth is implemented
*/

-- Create user_plans table
CREATE TABLE IF NOT EXISTS user_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'draft',
  
  -- Section 1: Decision Making
  has_decided boolean DEFAULT false,
  habits_to_cut text,
  new_version_description text,
  
  -- Section 2: Motivation Fuel
  motivation_fuel text,
  fuel_description text,
  daily_fuel_reminder text,
  
  -- Section 3: Dream Life Summary
  dream_day text,
  dream_week text,
  ideal_living text,
  monthly_costs jsonb,
  current_expenses numeric(10, 2),
  dream_expenses numeric(10, 2),
  financial_gap numeric(10, 2),
  
  -- Section 4: Focus and Environment
  daily_focus text[],
  things_to_cut text[],
  environment_changes text,
  
  -- Section 5: Momentum Building
  progress_tracking_method text,
  daily_wins text[],
  daily_planning_routine text,
  action_commitment text,
  
  -- Additional
  additional_thoughts text
);

-- Create ai_analyses table
CREATE TABLE IF NOT EXISTS ai_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES user_plans(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  analysis_content jsonb,
  win_ticker text[],
  dream_life_summary text,
  focus_areas text[],
  cut_out_items text[],
  action_steps jsonb,
  momentum_strategy text,
  environment_blueprint text
);

-- Enable RLS
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- Policies for public access (temporary until auth is added)
CREATE POLICY "Allow public read access to user_plans"
  ON user_plans FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to user_plans"
  ON user_plans FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update to user_plans"
  ON user_plans FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to ai_analyses"
  ON ai_analyses FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to ai_analyses"
  ON ai_analyses FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_analyses_plan_id ON ai_analyses(plan_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_created_at ON user_plans(created_at DESC);