import { mockSupabaseClient, mockUser, mockProfile } from './mocks/supabase';
import '@testing-library/jest-dom';
describe('Supabase Authentication', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('signInWithPassword', () => {
        it('should authenticate successfully with valid credentials', async () => {
            const { data, error } = await mockSupabaseClient.auth.signInWithPassword({
                email: 'test@example.com',
                password: 'testpassword123'
            });
            expect(error).toBeNull();
            expect(data.session).toBeDefined();
            expect(data.user).toBeDefined();
            expect(data.user?.id).toBe(mockUser.id);
            expect(data.user?.email).toBe(mockUser.email);
        });
        it('should fail with invalid credentials', async () => {
            const { data, error } = await mockSupabaseClient.auth.signInWithPassword({
                email: 'wrong@example.com',
                password: 'wrongpassword'
            });
            expect(data.session).toBeNull();
            expect(data.user).toBeNull();
            expect(error).toBeDefined();
            expect(error?.message).toBe('Invalid credentials');
        });
    });
    describe('signOut', () => {
        it('should sign out successfully', async () => {
            const { error } = await mockSupabaseClient.auth.signOut();
            expect(error).toBeNull();
        });
    });
    describe('profile retrieval', () => {
        it('should fetch user profile successfully', async () => {
            const { data, error } = await mockSupabaseClient
                .from('profiles')
                .select()
                .eq('id', mockUser.id)
                .single();
            expect(error).toBeNull();
            expect(data).toBeDefined();
            expect(data).toEqual(mockProfile);
        });
    });
});
