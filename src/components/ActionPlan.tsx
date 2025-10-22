import { CheckCircle, Target, Scissors, TrendingUp, MapPin, AlertCircle, Lightbulb, Shield } from 'lucide-react';

type ActionPlanProps = {
  analysis: {
    win_ticker: string[];
    dream_life_summary: string;
    focus_areas: string[];
    cut_out_items: string[];
    action_steps: {
      week_1: string[];
      month_1: string[];
      month_3: string[];
      month_6: string[];
    };
    momentum_strategy: string;
    environment_blueprint: string;
    decision_analysis: string;
    fuel_strategy: string;
    financial_roadmap: string;
    key_insights: string[];
    potential_obstacles: string[];
    accountability_system: string;
  };
};

export default function ActionPlan({ analysis }: ActionPlanProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Personalized Action Plan</h1>
          <p className="text-xl text-gray-600">Based on Sabri Suby's Framework</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Dream Life Summary</h2>
          <div className="text-lg leading-relaxed whitespace-pre-line">
            {analysis.dream_life_summary}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Focus Areas</h2>
            </div>
            <ul className="space-y-3">
              {analysis.focus_areas.map((area, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center space-x-3 mb-4">
              <Scissors className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cut Out (Decidere)</h2>
            </div>
            <p className="text-sm text-gray-500 mb-3 italic">To decide = to cut off</p>
            <ul className="space-y-3">
              {analysis.cut_out_items.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">×</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-8 h-8 text-violet-600" />
            <h2 className="text-2xl font-bold text-gray-900">Win Ticker - Daily Tracking</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {analysis.win_ticker.map((win, index) => (
              <div key={index} className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                <span className="text-gray-800">{win}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Action Steps Timeline</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Week 1</h3>
              <ul className="space-y-2">
                {analysis.action_steps.week_1.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-bold text-green-600 mb-3">Month 1</h3>
              <ul className="space-y-2">
                {analysis.action_steps.month_1.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-xl font-bold text-yellow-600 mb-3">Month 3</h3>
              <ul className="space-y-2">
                {analysis.action_steps.month_3.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Month 6</h3>
              <ul className="space-y-2">
                {analysis.action_steps.month_6.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Momentum Strategy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{analysis.momentum_strategy}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Environment Blueprint</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{analysis.environment_blueprint}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Financial Roadmap</h2>
          <p className="text-lg leading-relaxed">{analysis.financial_roadmap}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Key Insights</h2>
          </div>
          <div className="space-y-4">
            {analysis.key_insights.map((insight, index) => (
              <div key={index} className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                <p className="text-gray-800">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Potential Obstacles & Solutions</h2>
          </div>
          <div className="space-y-4">
            {analysis.potential_obstacles.map((obstacle, index) => (
              <div key={index} className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                <p className="text-gray-800">{obstacle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Decision Analysis</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">{analysis.decision_analysis}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Fuel Strategy</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{analysis.fuel_strategy}</p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Accountability System</h3>
          <p className="text-gray-700 leading-relaxed">{analysis.accountability_system}</p>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Remember</h2>
          <p className="text-xl mb-2">To <span className="italic font-semibold">decide</span> means to <span className="font-bold">cut off</span></p>
          <p className="text-lg text-gray-300">You've cut off the old version. Now execute relentlessly.</p>
        </div>
      </div>
    </div>
  );
}
