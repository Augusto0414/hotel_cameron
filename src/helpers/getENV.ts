export const getENV = () => {
    return {
        VITE_API_URL: window._env_?.API_URL || import.meta.env.VITE_API_URL || "http://localhost:8080",
    };
};