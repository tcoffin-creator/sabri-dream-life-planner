import { Sparkles, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

type FormStep3Props = {
  data: {
    dream_day: string;
    dream_week: string;
    ideal_living: string;
    monthly_costs: Record<string, number>;
    current_expenses: number;
    dream_expenses: number;
  };
  onChange: (field: string, value: string | Record<string, number> | number) => void;
};

export default function FormStep3({ data, onChange }: FormStep3Props) {
  const [newCostItem, setNewCostItem] = useState('');
  const [newCostAmount, setNewCostAmount] = useState('');

  const addCostItem = () => {
    if (newCostItem && newCostAmount) {
      const updatedCosts = {
        ...data.monthly_costs,
        [newCostItem]: parseFloat(newCostAmount)
      };
      onChange('monthly_costs', updatedCosts);

      const total = Object.values(updatedCosts).reduce((sum, val) => sum + val, 0);
      onChange('dream_expenses', total);

      setNewCostItem('');
      setNewCostAmount('');
    }
  };

  const removeCostItem = (key: string) => {
    const updatedCosts = { ...data.monthly_costs };
    delete updatedCosts[key];
    onChange('monthly_costs', updatedCosts);

    const total = Object.values(updatedCosts).reduce((sum, val) => sum + val, 0);
    onChange('dream_expenses', total);
  };

  const handleCurrentExpensesChange = (value: string) => {
    const num = parseFloat(value) || 0;
    onChange('current_expenses', num);
  };

  const financialGap = (data.dream_expenses || 0) - (data.current_expenses || 0);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dream Life Summary</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Define exactly what your dream life looks like. Be specific and detailed.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Describe your dream day in detail
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Include wake-up time, morning routine, work activities, meals, personal time, social interactions, and evening routine.
          </p>
          <textarea
            value={data.dream_day}
            onChange={(e) => onChange('dream_day', e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: I wake up at 6 AM without an alarm, feeling rested. I meditate for 20 minutes, then work out. By 8 AM, I'm at my home office working on my business. I take lunch at noon with my family..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Describe your dream week
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Work schedule, leisure activities, social life, travel, hobbies.
          </p>
          <textarea
            value={data.dream_week}
            onChange={(e) => onChange('dream_week', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: Monday-Thursday I focus on deep work from 8-4. Fridays are for meetings and planning. Weekends are for family adventures, hobbies, and recharging..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            What does your ideal living situation look like?
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Home, location, car, workspace, and other lifestyle components.
          </p>
          <textarea
            value={data.ideal_living}
            onChange={(e) => onChange('ideal_living', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: A modern 4-bedroom house with a home gym and office, located in a quiet suburb near nature trails. Tesla Model Y. Minimalist, clean aesthetic..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <span className="text-lg font-medium text-gray-900 mb-3 block">
          Monthly costs of your dream lifestyle
        </span>
        <p className="text-sm text-gray-500 mb-4">
          Research and note estimated monthly costs. Be realistic about what it takes to live your dream life.
        </p>

        <div className="space-y-3 mb-4">
          {Object.entries(data.monthly_costs || {}).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{key}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">${value.toLocaleString()}</span>
                <button
                  onClick={() => removeCostItem(key)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newCostItem}
            onChange={(e) => setNewCostItem(e.target.value)}
            placeholder="Item (e.g., Mortgage)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            value={newCostAmount}
            onChange={(e) => setNewCostAmount(e.target.value)}
            placeholder="Amount"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addCostItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {data.dream_expenses > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">Total Dream Lifestyle Cost:</span>
            <span className="ml-2 text-2xl font-bold text-blue-600">${data.dream_expenses.toLocaleString()}/month</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Current monthly expenses
          </span>
          <p className="text-sm text-gray-500 mb-3">
            What are your total current monthly expenses?
          </p>
          <input
            type="number"
            value={data.current_expenses || ''}
            onChange={(e) => handleCurrentExpensesChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            placeholder="5,000"
          />
        </label>

        {data.current_expenses > 0 && data.dream_expenses > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="text-center">
              <span className="text-sm font-medium text-green-900 block mb-1">Your Financial Gap</span>
              <span className="text-3xl font-bold text-green-600">
                ${Math.abs(financialGap).toLocaleString()}/month
              </span>
              <p className="text-sm text-green-700 mt-2">
                {financialGap > 0
                  ? 'This is how much more you need to earn monthly'
                  : 'Your current expenses already cover your dream lifestyle!'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
