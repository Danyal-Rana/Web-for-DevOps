import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import Navbar from '../components/Navbar';
import TaskStats from '../components/TaskStats';
import TaskFilters from '../components/TaskFilters';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import Loading from '../components/Loading';

const Dashboard = () => {
    const {
        tasks,
        loading,
        getTasks,
        getTaskStats,
        filter
    } = useTask();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getTasks();
        getTaskStats();
    }, []);

    const handleCreateTask = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    // Filter tasks based on search term
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                    <p className="mt-2 text-gray-600">
                        Manage and organize your daily tasks efficiently
                    </p>
                </div>

                {/* Stats */}
                <TaskStats />

                {/* Search and Create */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        onClick={handleCreateTask}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Task</span>
                    </button>
                </div>

                {/* Filters */}
                <TaskFilters />

                {/* Task List */}
                <div className="mt-6">
                    {loading ? (
                        <Loading text="Loading tasks..." />
                    ) : filteredTasks.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Plus className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm ? 'No tasks found' : 'No tasks yet'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm
                                    ? 'Try adjusting your search terms or filters'
                                    : 'Get started by creating your first task!'
                                }
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={handleCreateTask}
                                    className="btn-primary"
                                >
                                    Create Your First Task
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTasks.map((task) => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    onEdit={handleEditTask}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Task Modal */}
                <TaskModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    task={editingTask}
                />
            </div>
        </div>
    );
};

export default Dashboard;