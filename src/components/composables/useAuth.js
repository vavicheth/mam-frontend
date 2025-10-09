// composables/useAuth.js
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/api';
import { toast } from 'vue3-toastify';

const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
const token = ref(localStorage.getItem('token') || '');
const isLocked = ref(localStorage.getItem('isLocked') === 'true');

export function useAuth() {
    const router = useRouter();

    const isAuthenticated = computed(() => !!token.value);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            token.value = response.data.token;
            user.value = response.data.user;

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success('Login successful!');
            router.push('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            token.value = response.data.token;
            user.value = response.data.user;

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success('Registration successful!');
            router.push('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            throw error;
        }
    };

    const logout = () => {
        token.value = '';
        user.value = null;
        isLocked.value = false;

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLocked');

        toast.info('Logged out successfully');
        router.push('/login');
    };

    const lockScreen = () => {
        isLocked.value = true;
        localStorage.setItem('isLocked', 'true');
        router.push('/lock');
    };

    const unlockScreen = async (password) => {
        try {
            await authService.unlock(password);
            isLocked.value = false;
            localStorage.setItem('isLocked', 'false');
            toast.success('Screen unlocked!');
            router.push('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid password');
            throw error;
        }
    };

    return {
        user,
        token,
        isLocked,
        isAuthenticated,
        login,
        register,
        logout,
        lockScreen,
        unlockScreen
    };
}