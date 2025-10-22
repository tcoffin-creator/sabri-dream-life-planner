import { TrendingUp, Plus, X } from 'lucide-react';
import { useState } from 'react';

type FormStep5Props = {
  data: {
    progress_tracking_method: string;
    daily_wins: string[];
    daily_planning_routine: string;
    action_commitment: string;
    additional_thoughts: string;
  };
  onChange: (field: string, value: string | string[]) => void;
};

export default function FormStep5({ data, onChange }: FormStep5Props) {
  const [newWinItem, setNewWinItem] = useState('');

  const addWinItem = () => {
    if (newWinItem.trim()) {
      onChange('daily_wins', [...(data.daily_wins || []), newWinItem.trim()]);
      setNewWinItem('');
    }
  };

  const removeWinItem = (index: number) => {
    const updated = data.daily_wins.filter((_, i) => i !== index);
    onChange('daily_wins', updated);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-4">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Momentum Building</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Success comes from consistent daily action. Build unstoppable momentum through tracking, celebrating wins, and taking action immediately.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            How will you track your progress?
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Choose a method that works for you: checklist, journal, app, spreadsheet, etc.
          </p>
          <input
            type="text"
            value={data.progress_tracking_method}
            onChange={(e) => onChange('progress_tracking_method', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Example: Daily checklist in Notion, physical journal, habit tracking app"
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <span className="text-lg font-medium text-gray-900 mb-2 block">
          List the small daily wins you will celebrate
        </span>
        <p className="text-sm text-gray-500 mb-4">
          Momentum builds from acknowledging progress. What small wins will you recognize each day?
        </p>

        <div className="space-y-2 mb-4">
          {(data.daily_wins || []).map((item, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-violet-50 rounded-lg group">
              <span className="text-gray-800 flex-1">{item}</span>
              <button
                onClick={() => removeWinItem(index)}
                className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newWinItem}
            onChange={(e) => setNewWinItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addWinItem()}
            placeholder="Example: Waking up at 6 AM, completing morning workout, 2 hours of deep work"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addWinItem}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Describe your daily planning routine
          </span>
          <p className="text-sm text-gray-500 mb-3">
            How will you prepare for tomorrow? When and how will you plan your next day?
          </p>
          <textarea
            value={data.daily_planning_routine}
            onChange={(e) => onChange('daily_planning_routine', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: Every evening at 9 PM, I review today's wins and plan tomorrow's top 3 priorities. I prepare my workspace and lay out my workout clothes..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Your commitment to action
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Commit to taking action on each new insight or idea before consuming more content. How will you ensure you execute immediately?
          </p>
          <textarea
            value={data.action_commitment}
            onChange={(e) => onChange('action_commitment', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: When I learn something valuable, I immediately schedule time to implement it. I stop consuming and start executing. I measure my progress by action taken, not information consumed..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Additional thoughts or commitments
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Any other relevant insights, commitments, or context from the video or your personal situation?
          </p>
          <textarea
            value={data.additional_thoughts}
            onChange={(e) => onChange('additional_thoughts', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Share any additional insights or commitments..."
          />
        </label>
      </div>
    </div>
  );
}
