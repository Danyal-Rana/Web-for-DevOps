import { createContext, useContext, useReducer } from 'react';
import axios from '../utils/api.js';
import { toast } from 'react-toastify';

const TaskContext = createContext();

const initialState = {
    tasks: [],
    stats: {
        total: 0,
        completed: 0,
        pending: 0,
        high: 0,
        medium: 0,
        low: 0
    },
    loading: false,
    filter: {
        completed: 'all',
        priority: 'all',
        sort: 'createdAt'
    },
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    }
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'GET_TASKS_SUCCESS':
            return {
                ...state,
                tasks: action.payload.tasks,
                pagination: action.payload.pagination,
                loading: false
            };
        case 'GET_STATS_SUCCESS':
            return {
                ...state,
                stats: action.payload
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                stats: {
                    ...state.stats,
                    total: state.stats.total + 1,
                    pending: state.stats.pending + 1,
                    [action.payload.priority]: state.stats[action.payload.priority] + 1
                }
            };
        case 'UPDATE_TASK':
            const updatedTasks = state.tasks.map(task =>
                task._id === action.payload._id ? action.payload : task
            );
            return {
                ...state,
                tasks: updatedTasks
            };
        case 'DELETE_TASK':
            const filteredTasks = state.tasks.filter(task => task._id !== action.payload);
            return {
                ...state,
                tasks: filteredTasks
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: { ...state.filter, ...action.payload }
            };
        case 'TASK_ERROR':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Get all tasks
    const getTasks = async (params = {}) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const queryParams = {
                ...state.filter,
                ...params
            };

            const response = await axios.get('/tasks', { params: queryParams });

            dispatch({
                type: 'GET_TASKS_SUCCESS',
                payload: response.data.data
            });
        } catch (error) {
            dispatch({ type: 'TASK_ERROR' });
            toast.error('Failed to fetch tasks');
        }
    };

    // Get task statistics
    const getTaskStats = async () => {
        try {
            const response = await axios.get('/tasks/stats');
            dispatch({
                type: 'GET_STATS_SUCCESS',
                payload: response.data.data.stats
            });
        } catch (error) {
            console.error('Failed to fetch stats');
        }
    };

    // Create new task
    const createTask = async (taskData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await axios.post('/tasks', taskData);

            dispatch({
                type: 'ADD_TASK',
                payload: response.data.data.task
            });

            dispatch({ type: 'SET_LOADING', payload: false });
            toast.success('Task created successfully!');
            getTaskStats(); // Update stats
            return { success: true };
        } catch (error) {
            dispatch({ type: 'TASK_ERROR' });
            const message = error.response?.data?.message || 'Failed to create task';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Update task
    const updateTask = async (id, taskData) => {
        try {
            const response = await axios.put(`/tasks/${id}`, taskData);

            dispatch({
                type: 'UPDATE_TASK',
                payload: response.data.data.task
            });

            toast.success('Task updated successfully!');
            getTaskStats(); // Update stats
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update task';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);

            dispatch({
                type: 'DELETE_TASK',
                payload: id
            });

            toast.success('Task deleted successfully!');
            getTaskStats(); // Update stats
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete task';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Toggle task completion
    const toggleTask = async (id, completed) => {
        try {
            const response = await axios.put(`/tasks/${id}`, { completed });

            dispatch({
                type: 'UPDATE_TASK',
                payload: response.data.data.task
            });

            getTaskStats(); // Update stats
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update task';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Set filter
    const setFilter = (filterData) => {
        dispatch({
            type: 'SET_FILTER',
            payload: filterData
        });
    };

    const value = {
        tasks: state.tasks,
        stats: state.stats,
        loading: state.loading,
        filter: state.filter,
        pagination: state.pagination,
        getTasks,
        getTaskStats,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
        setFilter
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};