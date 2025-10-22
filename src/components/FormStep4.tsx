import { Target, Plus, X } from 'lucide-react';
import { useState } from 'react';

type FormStep4Props = {
  data: {
    daily_focus: string[];
    things_to_cut: string[];
    environment_changes: string;
  };
  onChange: (field: string, value: string[] | string) => void;
};

export default function FormStep4({ data, onChange }: FormStep4Props) {
  const [newFocusItem, setNewFocusItem] = useState('');
  const [newCutItem, setNewCutItem] = useState('');

  const addFocusItem = () => {
    if (newFocusItem.trim()) {
      onChange('daily_focus', [...(data.daily_focus || []), newFocusItem.trim()]);
      setNewFocusItem('');
    }
  };

  const removeFocusItem = (index: number) => {
    const updated = data.daily_focus.filter((_, i) => i !== index);
    onChange('daily_focus', updated);
  };

  const addCutItem = () => {
    if (newCutItem.trim()) {
      onChange('things_to_cut', [...(data.things_to_cut || []), newCutItem.trim()]);
      setNewCutItem('');
    }
  };

  const removeCutItem = (index: number) => {
    const updated = data.things_to_cut.filter((_, i) => i !== index);
    onChange('things_to_cut', updated);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Focus & Environment</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Success is about doing the right things and eliminating the wrong things. Engineer your environment to support your transformation.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <span className="text-lg font-medium text-gray-900 mb-2 block">
          What do you need to focus on daily?
        </span>
        <p className="text-sm text-gray-500 mb-4">
          List the specific actions and priorities that will build toward your dream life.
        </p>

        <div className="space-y-2 mb-4">
          {(data.daily_focus || []).map((item, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-green-50 rounded-lg group">
              <span className="text-gray-800 flex-1">{item}</span>
              <button
                onClick={() => removeFocusItem(index)}
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
            value={newFocusItem}
            onChange={(e) => setNewFocusItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addFocusItem()}
            placeholder="Example: 2 hours of deep work on my business"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addFocusItem}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <span className="text-lg font-medium text-gray-900 mb-2 block">
          What do you need to cut out?
        </span>
        <p className="text-sm text-gray-500 mb-4">
          Remember: to <span className="font-semibold italic">decide</span> means to <span className="font-semibold">cut off</span>.
          List distractions, negative influences, or habits to eliminate.
        </p>

        <div className="space-y-2 mb-4">
          {(data.things_to_cut || []).map((item, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-red-50 rounded-lg group">
              <span className="text-gray-800 flex-1">{item}</span>
              <button
                onClick={() => removeCutItem(index)}
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
            value={newCutItem}
            onChange={(e) => setNewCutItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCutItem()}
            placeholder="Example: Mindless scrolling on social media"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addCutItem}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            What environmental changes will you implement?
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Your environment shapes your behavior. What changes to location, daily routine, or social groups will support your new self?
          </p>
          <textarea
            value={data.environment_changes}
            onChange={(e) => onChange('environment_changes', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: Move my workspace away from distractions, join a mastermind group of ambitious entrepreneurs, wake up before the rest of my household, remove social media apps from my phone..."
          />
        </label>
      </div>
    </div>
  );
}
