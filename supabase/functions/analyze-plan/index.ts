import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PlanData {
  has_decided: boolean;
  habits_to_cut: string;
  new_version_description: string;
  motivation_fuel: string;
  fuel_description: string;
  daily_fuel_reminder: string;
  dream_day: string;
  dream_week: string;
  ideal_living: string;
  monthly_costs: Record<string, number>;
  current_expenses: number;
  dream_expenses: number;
  financial_gap: number;
  daily_focus: string[];
  things_to_cut: string[];
  environment_changes: string;
  progress_tracking_method: string;
  daily_wins: string[];
  daily_planning_routine: string;
  action_commitment: string;
  additional_thoughts: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { planData, anthropicApiKey }: { planData: PlanData; anthropicApiKey: string } = await req.json();

    if (!anthropicApiKey) {
      return new Response(
        JSON.stringify({ error: "Anthropic API key is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `You are an expert life coach and strategist analyzing a comprehensive life plan based on Sabri Suby's "Ambitious But Lazy" framework. Your task is to provide a detailed, personalized action plan.

Here is the user's complete plan:

## 1. DECISION MAKING
- Has decided: ${planData.has_decided ? 'Yes' : 'No'}
- Habits to cut off: ${planData.habits_to_cut}
- New version description: ${planData.new_version_description}

## 2. MOTIVATION FUEL
- Fuel type: ${planData.motivation_fuel}
- Fuel description: ${planData.fuel_description}
- Daily reminder method: ${planData.daily_fuel_reminder}

## 3. DREAM LIFE SUMMARY
- Dream day: ${planData.dream_day}
- Dream week: ${planData.dream_week}
- Ideal living: ${planData.ideal_living}
- Current expenses: $${planData.current_expenses}/month
- Dream expenses: $${planData.dream_expenses}/month
- Financial gap: $${planData.financial_gap}/month

## 4. FOCUS & ENVIRONMENT
- Daily focus areas: ${planData.daily_focus?.join(', ')}
- Things to cut out: ${planData.things_to_cut?.join(', ')}
- Environment changes: ${planData.environment_changes}

## 5. MOMENTUM BUILDING
- Progress tracking: ${planData.progress_tracking_method}
- Daily wins to celebrate: ${planData.daily_wins?.join(', ')}
- Daily planning routine: ${planData.daily_planning_routine}
- Action commitment: ${planData.action_commitment}

## ADDITIONAL THOUGHTS
${planData.additional_thoughts}

Based on this comprehensive information, provide a detailed analysis in the following JSON format:

{
  "win_ticker": ["array of 5-7 quick daily wins to track"],
  "dream_life_summary": "A compelling 2-3 paragraph synthesis of their dream life vision",
  "focus_areas": ["array of 3-5 main areas they must focus on with specific actions"],
  "cut_out_items": ["array of 3-5 specific things they must eliminate (decidere - to cut off)"],
  "action_steps": {
    "week_1": ["specific actions for week 1"],
    "month_1": ["specific milestones for month 1"],
    "month_3": ["specific milestones for month 3"],
    "month_6": ["specific milestones for month 6"]
  },
  "momentum_strategy": "Detailed paragraph on how to build and maintain momentum",
  "environment_blueprint": "Detailed paragraph on how to engineer their environment for success",
  "decision_analysis": "Analysis of their commitment level and what cutting off the old self really means",
  "fuel_strategy": "How to leverage their pain/pleasure fuel daily",
  "financial_roadmap": "Specific strategy to close the $${planData.financial_gap}/month gap",
  "key_insights": ["array of 3-5 powerful insights based on their specific situation"],
  "potential_obstacles": ["array of 3-4 likely obstacles and how to overcome them"],
  "accountability_system": "Recommended accountability and tracking system"
}

Be specific, actionable, and motivating. Reference their exact goals and situation.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(
        JSON.stringify({ error: `Claude API error: ${error}` }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const analysisText = data.content[0].text;
    
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(
        JSON.stringify({ error: "Could not parse AI response" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify({ analysis }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});