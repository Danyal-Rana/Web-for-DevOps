import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns';

export const formatDate = (date) => {
    if (!date) return '';

    const dateObj = new Date(date);

    if (isToday(dateObj)) {
        return 'Today';
    } else if (isTomorrow(dateObj)) {
        return 'Tomorrow';
    } else if (isYesterday(dateObj)) {
        return 'Yesterday';
    } else {
        return format(dateObj, 'MMM dd, yyyy');
    }
};

export const formatDateTime = (date) => {
    if (!date) return '';
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date) => {
    if (!date) return '';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !isToday(new Date(dueDate));
};

export const getPriorityColor = (priority) => {
    const colors = {
        high: 'text-red-600 bg-red-100',
        medium: 'text-yellow-600 bg-yellow-100',
        low: 'text-green-600 bg-green-100'
    };
    return colors[priority] || colors.medium;
};

export const getPriorityBadgeClass = (priority) => {
    const classes = {
        high: 'priority-high',
        medium: 'priority-medium',
        low: 'priority-low'
    };
    return classes[priority] || classes.medium;
};