
export function usePermissions() {
  // No security restrictions - everyone is admin
  return {
    hasRole: (role: string) => true,
    hasPermission: (permission: string) => true,
    hasAnyPermission: (permissions: string[]) => true,
  };
}
