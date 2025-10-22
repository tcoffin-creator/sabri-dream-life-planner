import { Scissors } from 'lucide-react';

type FormStep1Props = {
  data: {
    has_decided: boolean;
    habits_to_cut: string;
    new_version_description: string;
  };
  onChange: (field: string, value: string | boolean) => void;
};

export default function FormStep1({ data, onChange }: FormStep1Props) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
          <Scissors className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Decision Making</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          To <span className="font-semibold italic">decide</span> means to <span className="font-semibold">cut off</span> (from Latin <span className="italic">decidere</span>).
          Make a clear decision by cutting off alternatives and old versions of yourself.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.has_decided}
            onChange={(e) => onChange('has_decided', e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div>
            <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              I have made a clear decision to pursue my goals
            </span>
            <p className="text-sm text-gray-500 mt-1">
              This is your commitment to transformation
            </p>
          </div>
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            What old habits, beliefs, or parts of your current self do you need to cut off?
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Be specific. What must you leave behind to become the person capable of achieving your goals?
          </p>
          <textarea
            value={data.habits_to_cut}
            onChange={(e) => onChange('habits_to_cut', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: Staying up late scrolling social media, procrastinating on important tasks, negative self-talk..."
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label className="block">
          <span className="text-lg font-medium text-gray-900 mb-2 block">
            What does your "new version" look like?
          </span>
          <p className="text-sm text-gray-500 mb-3">
            Describe the traits, behaviors, and daily actions of this new person capable of achieving your goals.
          </p>
          <textarea
            value={data.new_version_description}
            onChange={(e) => onChange('new_version_description', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Example: I wake up at 5:30 AM energized. I work out daily. I tackle my most important task first thing. I'm disciplined, focused, and execute consistently..."
          />
        </label>
      </div>
    </div>
  );
}
