import { Flame } from 'lucide-react';

type FormStep2Props = {
  data: {
    motivation_fuel: string;
    fuel_description: string;
    daily_fuel_reminder: string;
  };
  onChange: (field: string, value: string) => void;
};

export default function FormStep2({ data, onChange }: FormStep2Props) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4">
          <Flame className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Motivation Fuel</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          What drives you forward? Pain pushes you away from what you don't want. Pleasure pulls you toward what you do want.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block mb-4">
          <span className="text-lg font-medium text-gray-900 mb-3 block">
            What will you use as your fuel to stay motivated?
          </span>
        </label>

        <div className="space-y-3">
          <label className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 group"
            style={{
              borderColor: data.motivation_fuel === 'pain' ? '#EF4444' : '#E5E7EB'
            }}>
            <input
              type="radio"
              name="motivation_fuel"
              value="pain"
              checked={data.motivation_fuel === 'pain'}
              onChange={(e) => onChange('motivation_fuel', e.target.value)}
              className="mt-1 w-5 h-5 text-red-600 border-gray-300 focus:ring-2 focus:ring-red-500"
            />
            <div>
              <span className="font-medium text-gray-900">Pain</span>
              <p className="text-sm text-gray-600">Running away from what you don't want</p>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 group"
            style={{
              borderColor: data.motivation_fuel === 'pleasure' ? '#10B981' : '#E5E7EB'
            }}>
            <input
              type="radio"
              name="motivation_fuel"
              value="pleasure"
              checked={data.motivation_fuel === 'pleasure'}
              onChange={(e) => onChange('motivation_fuel', e.target.value)}
              className="mt-1 w-5 h-5 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <div>
              <span className="font-medium text-gray-900">Pleasure</span>
              <p className="text-sm text-gray-600">Moving toward what you desire</p>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 group"
            style={{
              borderColor: data.motivation_fuel === 'both' ? '#3B82F6' : '#E5E7EB'
            }}>
            <input
              type="radio"
              name="motivation_fuel"
              value="both"
              checked={data.motivation_fuel === 'both'}
              onChange={(e) => onChange('motivation_fuel', e.target.value)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900">Both</span>
              <p className="text-sm text-gray-600">Pushed by pain, pulled by pleasure</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            Describe your pain point or pleasurable vision
          </span>
          <p className="text-sm text-gray-500 mb-3">
            What painful reality are you escaping? Or what amazing future are you building toward? Be vivid and emotional.
          </p>
          <textarea
            value={data.fuel_description}
            onChange={(e) => onChange('fuel_description', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: I'm tired of living paycheck to paycheck, feeling stressed about bills, and missing out on experiences with my family. OR I'm building toward complete financial freedom, traveling the world, and making a real impact..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            How will you remind yourself of this fuel daily?
          </span>
          <p className="text-sm text-gray-500 mb-3">
            What specific system or ritual will keep this motivation alive every single day?
          </p>
          <textarea
            value={data.daily_fuel_reminder}
            onChange={(e) => onChange('daily_fuel_reminder', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: Morning journal entry, vision board on my wall, phone wallpaper with my goal, daily review before bed..."
          />
        </label>
      </div>
    </div>
  );
}
