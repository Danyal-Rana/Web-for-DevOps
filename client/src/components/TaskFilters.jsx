import { Filter, SortAsc } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const TaskFilters = () => {
    const { filter, setFilter, getTasks } = useTask();

    const handleFilterChange = (key, value) => {
        const newFilter = { ...filter, [key]: value };
        setFilter(newFilter);
        getTasks(newFilter);
    };

    return (
        <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Completion Filter */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600">Status:</label>
                        <select
                            value={filter.completed}
                            onChange={(e) => handleFilterChange('completed', e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">All Tasks</option>
                            <option value="false">Pending</option>
                            <option value="true">Completed</option>
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600">Priority:</label>
                        <select
                            value={filter.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center space-x-2">
                        <SortAsc className="h-4 w-4 text-gray-500" />
                        <label className="text-sm text-gray-600">Sort by:</label>
                        <select
                            value={filter.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="createdAt">Date Created</option>
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;