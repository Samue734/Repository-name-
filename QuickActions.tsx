import { PlusCircle, CalendarPlus, Wrench } from 'lucide-react';

const actions = [
  {
    icon: PlusCircle,
    title: 'Register Asset',
    description: 'Add new assets into inventory.',
  },
  {
    icon: CalendarPlus,
    title: 'Book Resource',
    description: 'Reserve rooms, vehicles, equipment.',
  },
  {
    icon: Wrench,
    title: 'Raise Maintenance',
    description: 'Report issues and initiate workflows.',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.title}
            className="group bg-white rounded-2xl border border-border-light p-8 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-royal/10 mb-4 group-hover:bg-royal/15 transition-colors">
              <Icon size={32} className="text-royal" />
            </div>
            <h3 className="text-h4 text-navy-900 mb-1">{action.title}</h3>
            <p className="text-caption text-navy-600">{action.description}</p>
          </button>
        );
      })}
    </div>
  );
}
