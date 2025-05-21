import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { SetupTestUser } from '../components/SetupTestUser';
import { PartnersList } from '../components/unified/PartnersList';
const Landing = () => {
    const [email, setEmail] = useState('admin@example.com'); // Pre-fill with test credentials
    const [password, setPassword] = useState('Pass1'); // Pre-fill with test credentials
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn, isAuthenticated, loading } = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            console.log("Landing: User is authenticated, redirecting to master");
            navigate('/master');
        }
    }, [navigate, isAuthenticated]);
    const validateEmail = (email) => {
        const trimmedEmail = email.trim();
        // Enhanced email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(trimmedEmail);
    };
    const validatePassword = (password) => {
        if (!password)
            return {
                valid: false,
                message: 'Password is required'
            };
        if (password.length < 4)
            return {
                valid: false,
                message: 'Password must be at least 4 characters'
            };
        // For test account, always valid
        if (email.trim().toLowerCase() === 'admin@example.com' && password === 'Pass1') {
            return {
                valid: true
            };
        }
        return {
            valid: true
        };
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        // Prevent multiple submissions
        if (isLoading || loading) {
            console.log("Landing: Login request already in progress");
            return;
        }
        // Form validation
        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            toast.error(passwordValidation.message || 'Invalid password');
            return;
        }
        setIsLoading(true);
        console.log("Landing: Login attempt with:", email.trim().toLowerCase());
        try {
            await signIn(email, password);
            // Navigation is handled in AuthContext upon successful login
        }
        catch (error) {
            // Error handling is done in AuthContext
            console.error("Landing: Login error:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "h-screen w-full flex flex-col items-center justify-center relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 z-0", style: {
                    backgroundColor: '#111',
                    backgroundImage: `url('/lovable-uploads/2e3907f2-88a5-400f-a09d-cd865295f449.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                } }), _jsx("div", { className: "absolute inset-0 z-10 bg-black bg-opacity-25" }), _jsx("div", { className: "relative z-20 mb-16 pt-10" }), _jsxs("div", { className: "relative z-20 flex flex-col items-center justify-center -mt-12", children: [_jsxs("div", { className: "flex flex-col items-center justify-center w-[340px]", children: [_jsxs("div", { className: "mb-3", children: [_jsx("h1", { className: "bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-center text-zinc-600 font-bold px-[3px] py-0 my-[5px] mx-0 text-4xl", children: "NXT LEVEL TECH" }), _jsx("p", { className: "text-center text-gray-200 mt-0.5 text-xs my-0 px-px", children: "AI Powered Business Management" })] }), _jsxs("form", { onSubmit: handleLogin, className: "w-full space-y-3 mt-6", children: [_jsx("div", { className: "space-y-1", children: _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "email", type: "email", placeholder: "Email", value: email, onChange: e => setEmail(e.target.value), required: true, className: "bg-black/50 border-gray-600 focus:border-purple-400 h-8 pl-8 text-white text-sm rounded-lg", autoComplete: "email", disabled: isLoading || loading }), _jsx("div", { className: "absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none", children: _jsx("span", { className: "text-gray-400 text-xs", children: "\uD83D\uDC64" }) })] }) }), _jsx("div", { className: "space-y-1", children: _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "password", type: "password", placeholder: "Password", value: password, onChange: e => setPassword(e.target.value), required: true, className: "bg-black/50 border-gray-600 focus:border-purple-400 h-8 pl-8 text-white text-sm rounded-lg", autoComplete: "current-password", disabled: isLoading || loading }), _jsx("div", { className: "absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none", children: _jsx("span", { className: "text-gray-400 text-xs", children: "\uD83D\uDD12" }) })] }) }), _jsx(Button, { type: "submit", disabled: isLoading || loading, className: "w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 h-8 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md hover:shadow-lg bg-zinc-600 hover:bg-zinc-500", children: isLoading || loading ? 'SIGNING IN...' : 'LOGIN' })] }), _jsx("div", { className: "mt-3 w-full flex justify-center", children: _jsx(SetupTestUser, {}) })] }), _jsx("div", { className: "absolute bottom-8 text-center text-white/80 z-20", children: _jsx(PartnersList, {}) })] })] }));
};
export default Landing;
