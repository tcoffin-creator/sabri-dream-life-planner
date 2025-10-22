import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserPlan = {
  id: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'analyzing' | 'completed';
  has_decided: boolean;
  habits_to_cut: string | null;
  new_version_description: string | null;
  motivation_fuel: string | null;
  fuel_description: string | null;
  daily_fuel_reminder: string | null;
  dream_day: string | null;
  dream_week: string | null;
  ideal_living: string | null;
  monthly_costs: Record<string, number> | null;
  current_expenses: number | null;
  dream_expenses: number | null;
  financial_gap: number | null;
  daily_focus: string[] | null;
  things_to_cut: string[] | null;
  environment_changes: string | null;
  progress_tracking_method: string | null;
  daily_wins: string[] | null;
  daily_planning_routine: string | null;
  action_commitment: string | null;
  additional_thoughts: string | null;
};

export type AIAnalysis = {
  id: string;
  plan_id: string;
  created_at: string;
  analysis_content: Record<string, unknown>;
  win_ticker: string[];
  dream_life_summary: string;
  focus_areas: string[];
  cut_out_items: string[];
  action_steps: Record<string, unknown>;
  momentum_strategy: string;
  environment_blueprint: string;
};
