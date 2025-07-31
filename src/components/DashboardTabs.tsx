'use client';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  upcomingCount: number;
}

const TABS = ['Matches', 'Live', 'Results'];

export default function DashboardTabs({ activeTab, setActiveTab, upcomingCount }: DashboardTabsProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg h-12">
      <div className="flex items-center justify-center  border-gray-200 h-full ">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium text-center transition-colors duration-200 focus:outline-none h-full`}
          >
            {tab}
            {tab === 'Matches' && upcomingCount > 0 && (
              <span className="ml-2 inline-block py-0.5 px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                {upcomingCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}