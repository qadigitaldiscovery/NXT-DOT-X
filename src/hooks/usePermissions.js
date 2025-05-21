export function usePermissions() {
    const user = { role: 'admin' }; // Replace with actual logic from auth/session
    return {
        hasRole: (role) => user.role === role,
    };
}
