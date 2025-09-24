import { useTask } from '../context/TaskContext';
import { CheckCircle, Clock, AlertCircle, BarChart3 } from 'lucide-react';

const TaskStats = () => {
    const { stats } = useTask();

    const statCards = [
        {
            title: 'Total Tasks',
            value: stats.total,
            icon: BarChart3,
            color: 'text-primary-600 bg-primary-100'
        },
        {
            title: 'Completed',
            value: stats.completed,
            icon: CheckCircle,
            color: 'text-green-600 bg-green-100'
        },
        {
            title: 'Pending',
            value: stats.pending,
            icon: Clock,
            color: 'text-yellow-600 bg-yellow-100'
        },
        {
            title: 'High Priority',
            value: stats.high,
            icon: AlertCircle,
            color: 'text-red-600 bg-red-100'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((stat, index) => (
                <div key={index} className="card p-4">
                    <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskStats;