import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../utils/api.js';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Set token in axios headers
    useEffect(() => {
        if (state.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [state.token]);

    // Load user on app start
    useEffect(() => {
        if (state.token) {
            loadUser();
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Load user
    const loadUser = async () => {
        try {
            const response = await axios.get('/auth/me');
            dispatch({
                type: 'USER_LOADED',
                payload: response.data.data.user
            });
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    // Register user
    const register = async (formData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await axios.post('/auth/register', formData);

            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: response.data.data
            });

            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            dispatch({ type: 'REGISTER_FAIL' });
            toast.error(message);
            return { success: false, message };
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await axios.post('/auth/login', formData);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data
            });

            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch({ type: 'LOGIN_FAIL' });
            toast.error(message);
            return { success: false, message };
        }
    };

    // Logout user
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        toast.success('Logged out successfully!');
    };

    const value = {
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        register,
        login,
        logout,
        loadUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};