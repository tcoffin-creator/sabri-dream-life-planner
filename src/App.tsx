import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Loader2 } from 'lucide-react';
import FormStep1 from './components/FormStep1';
import FormStep2 from './components/FormStep2';
import FormStep3 from './components/FormStep3';
import FormStep4 from './components/FormStep4';
import FormStep5 from './components/FormStep5';
import ActionPlan from './components/ActionPlan';
import { supabase } from './lib/supabase';

type FormData = {
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
  daily_focus: string[];
  things_to_cut: string[];
  environment_changes: string;
  progress_tracking_method: string;
  daily_wins: string[];
  daily_planning_routine: string;
  action_commitment: string;
  additional_thoughts: string;
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    has_decided: false,
    habits_to_cut: '',
    new_version_description: '',
    motivation_fuel: '',
    fuel_description: '',
    daily_fuel_reminder: '',
    dream_day: '',
    dream_week: '',
    ideal_living: '',
    monthly_costs: {},
    current_expenses: 0,
    dream_expenses: 0,
    daily_focus: [],
    things_to_cut: [],
    environment_changes: '',
    progress_tracking_method: '',
    daily_wins: [],
    daily_planning_routine: '',
    action_commitment: '',
    additional_thoughts: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'dream_expenses' || field === 'current_expenses') {
        const gap = (updated.dream_expenses || 0) - (updated.current_expenses || 0);
        return { ...updated };
      }

      return updated;
    });
  };

  const totalSteps = 5;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.has_decided && formData.habits_to_cut && formData.new_version_description;
      case 2:
        return formData.motivation_fuel && formData.fuel_description && formData.daily_fuel_reminder;
      case 3:
        return formData.dream_day && formData.dream_week && formData.ideal_living;
      case 4:
        return formData.daily_focus.length > 0 && formData.things_to_cut.length > 0 && formData.environment_changes;
      case 5:
        return formData.progress_tracking_method && formData.daily_wins.length > 0 &&
               formData.daily_planning_routine && formData.action_commitment;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      setError('Please enter your Anthropic API key to generate your action plan.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const financial_gap = (formData.dream_expenses || 0) - (formData.current_expenses || 0);

      const { data: planData, error: planError } = await supabase
        .from('user_plans')
        .insert({
          ...formData,
          financial_gap,
          status: 'analyzing',
        })
        .select()
        .single();

      if (planError) throw planError;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/analyze-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planData: { ...formData, financial_gap },
          anthropicApiKey: apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze plan');
      }

      const { analysis: aiAnalysis } = await response.json();

      const { error: analysisError } = await supabase
        .from('ai_analyses')
        .insert({
          plan_id: planData.id,
          analysis_content: aiAnalysis,
          win_ticker: aiAnalysis.win_ticker,
          dream_life_summary: aiAnalysis.dream_life_summary,
          focus_areas: aiAnalysis.focus_areas,
          cut_out_items: aiAnalysis.cut_out_items,
          action_steps: aiAnalysis.action_steps,
          momentum_strategy: aiAnalysis.momentum_strategy,
          environment_blueprint: aiAnalysis.environment_blueprint,
        });

      if (analysisError) throw analysisError;

      await supabase
        .from('user_plans')
        .update({ status: 'completed' })
        .eq('id', planData.id);

      setAnalysis(aiAnalysis);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing your plan');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (analysis) {
    return <ActionPlan analysis={analysis} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Dream Life Planner</h1>
          <p className="text-xl text-gray-600">Based on Sabri Suby's "Ambitious But Lazy" Framework</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {currentStep === 1 && <FormStep1 data={formData} onChange={handleChange} />}
          {currentStep === 2 && <FormStep2 data={formData} onChange={handleChange} />}
          {currentStep === 3 && <FormStep3 data={formData} onChange={handleChange} />}
          {currentStep === 4 && <FormStep4 data={formData} onChange={handleChange} />}
          {currentStep === 5 && <FormStep5 data={formData} onChange={handleChange} />}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {showApiKeyInput && (
          <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="block mb-2">
              <span className="text-sm font-medium text-gray-900">Anthropic API Key</span>
              <p className="text-xs text-gray-600 mb-2">
                Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="sk-ant-..."
              />
            </label>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                !isStepValid()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || isAnalyzing}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all ${
                !isStepValid() || isAnalyzing
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Action Plan</span>
                </>
              )}
            </button>
          )}
        </div>

        {!showApiKeyInput && currentStep === totalSteps && (
          <button
            onClick={() => setShowApiKeyInput(true)}
            className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Enter Anthropic API Key
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
