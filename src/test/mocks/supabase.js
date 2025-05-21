class CustomAuthError extends Error {
    constructor(message, status = 400, code = 'invalid_credentials') {
        super(message);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'AuthApiError'
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "__isAuthError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        this.status = status;
        this.code = code;
    }
}
// Mock user data
const mockUser = {
    id: 'test-user-id',
    app_metadata: {
        provider: 'email',
        providers: ['email']
    },
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    phone: '',
    role: 'authenticated',
    updated_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    phone_confirmed_at: null,
    last_sign_in_at: new Date().toISOString(),
    factors: null,
    identities: []
};
const mockProfile = {
    id: 'test-user-id',
    username: 'testuser',
    email: 'test@example.com',
    role: 'user',
    permissions: ['users.view', 'settings.access'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
};
// Mock session data
const mockSession = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    user: mockUser
};
// Create mock Supabase client
export const mockSupabaseClient = {
    auth: {
        signInWithPassword: jest.fn(async ({ email, password }) => {
            if (email === 'test@example.com' && password === 'testpassword123') {
                return {
                    data: { session: mockSession, user: mockUser },
                    error: null
                };
            }
            return {
                data: { session: null, user: null },
                error: new CustomAuthError('Invalid credentials')
            };
        }),
        signOut: jest.fn(async () => ({ error: null })),
        getSession: jest.fn(async () => ({
            data: { session: mockSession },
            error: null
        })),
        onAuthStateChange: jest.fn((callback) => ({
            subscription: { unsubscribe: jest.fn() },
            data: { subscription: { unsubscribe: jest.fn() } }
        }))
    },
    from: jest.fn((table) => ({
        select: jest.fn(() => ({
            eq: jest.fn(() => ({
                single: jest.fn(async () => {
                    if (table === 'profiles') {
                        return { data: mockProfile, error: null };
                    }
                    return { data: null, error: new CustomAuthError('Table not found') };
                })
            }))
        }))
    }))
};
// Mock the supabase module
jest.mock('../../integrations/supabase/client', () => ({
    supabase: mockSupabaseClient
}));
export { mockUser, mockProfile, mockSession };
