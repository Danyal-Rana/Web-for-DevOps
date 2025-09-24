import { useState } from 'react';
import { Check, Edit, Trash2, Calendar, Flag } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { formatDate, isOverdue, getPriorityBadgeClass } from '../utils/helpers';

const TaskItem = ({ task, onEdit }) => {
    const { toggleTask, deleteTask } = useTask();
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        await toggleTask(task._id, !task.completed);
        setLoading(false);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(task._id);
        }
    };

    const isDue = isOverdue(task.dueDate);

    return (
        <div className={`card transition-all duration-200 hover:shadow-lg ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
            } ${isDue && !task.completed ? 'border-red-300 bg-red-50' : ''}`}>
            <div className="flex items-start space-x-3">
                {/* Checkbox */}
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${task.completed
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : 'border-gray-300 hover:border-primary-400'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {task.completed && <Check className="h-3 w-3" />}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className={`text-sm font-medium ${task.completed
                                    ? 'text-gray-500 line-through'
                                    : 'text-gray-900'
                                }`}>
                                {task.title}
                            </h3>

                            {task.description && (
                                <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {task.description}
                                </p>
                            )}

                            <div className="flex items-center space-x-3 mt-2">
                                {/* Priority Badge */}
                                <span className={getPriorityBadgeClass(task.priority)}>
                                    <Flag className="inline h-3 w-3 mr-1" />
                                    {task.priority}
                                </span>

                                {/* Due Date */}
                                {task.dueDate && (
                                    <span className={`text-xs flex items-center ${isDue && !task.completed
                                            ? 'text-red-600 font-medium'
                                            : task.completed
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`}>
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formatDate(task.dueDate)}
                                        {isDue && !task.completed && (
                                            <span className="ml-1 text-red-600 font-semibold">
                                                (Overdue)
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => onEdit(task)}
                                className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                                title="Edit task"
                            >
                                <Edit className="h-4 w-4" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                title="Delete task"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;