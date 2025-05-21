import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Bell, Palette, Shield, Save, Trash2, Download } from 'lucide-react';
// Mock user preferences
const mockUserPreferences = {
    notifications: {
        email: true,
        push: false,
        sms: false
    },
    appearance: {
        theme: 'system',
        compactMode: false,
        animationsEnabled: true
    },
    privacy: {
        shareData: false,
        allowTracking: false
    }
};
const Settings = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [userPrefs, setUserPrefs] = useState(mockUserPreferences);
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const { toast } = useToast();
    const handleSaveAccount = (e) => {
        e.preventDefault();
        // Simulate successful save
        toast.success({
            title: "Account Updated",
            description: "Your account details have been successfully updated."
        });
    };
    const handleChangePassword = (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            toast.error({
                title: "Password Error",
                description: "New passwords do not match. Please try again."
            });
            return;
        }
        if (password.new.length < 8) {
            toast.error({
                title: "Password Error",
                description: "Password must be at least 8 characters long."
            });
            return;
        }
        // Simulate successful password change
        toast.success({
            title: "Password Updated",
            description: "Your password has been successfully changed."
        });
        // Reset the form
        setPassword({ current: '', new: '', confirm: '' });
    };
    const toggleNotificationSetting = (key) => {
        setUserPrefs(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };
    const toggleAppearanceSetting = (key) => {
        setUserPrefs(prev => ({
            ...prev,
            appearance: {
                ...prev.appearance,
                [key]: !prev.appearance[key]
            }
        }));
    };
    const togglePrivacySetting = (key) => {
        setUserPrefs(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: !prev.privacy[key]
            }
        }));
    };
    const handleExportData = () => {
        // Simulate export
        toast.success({
            title: "Data Export Requested",
            description: "Your data export is being processed. You will be notified when it's ready."
        });
    };
    const handleDeleteAccount = () => {
        // This would typically show a confirmation dialog
        toast.error({
            title: "Delete Account",
            description: "Please contact support to delete your account."
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Settings" }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "account", className: "data-[state=active]:bg-muted data-[state=active]:text-foreground", children: [_jsx(User, { className: "mr-2 h-4 w-4" }), "Account"] }), _jsxs(TabsTrigger, { value: "security", className: "data-[state=active]:bg-muted data-[state=active]:text-foreground", children: [_jsx(Lock, { className: "mr-2 h-4 w-4" }), "Security"] }), _jsxs(TabsTrigger, { value: "notifications", className: "data-[state=active]:bg-muted data-[state=active]:text-foreground", children: [_jsx(Bell, { className: "mr-2 h-4 w-4" }), "Notifications"] }), _jsxs(TabsTrigger, { value: "preferences", className: "data-[state=active]:bg-muted data-[state=active]:text-foreground", children: [_jsx(Palette, { className: "mr-2 h-4 w-4" }), "Preferences"] })] }), _jsx(TabsContent, { value: "account", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Account Information" }), _jsx(CardDescription, { children: "Manage your personal account settings" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSaveAccount, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "firstName", children: "First Name" }), _jsx(Input, { type: "text", id: "firstName", defaultValue: "John" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "lastName", children: "Last Name" }), _jsx(Input, { type: "text", id: "lastName", defaultValue: "Doe" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsx(Input, { type: "email", id: "email", defaultValue: "john.doe@example.com", readOnly: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "username", children: "Username" }), _jsx(Input, { type: "text", id: "username", defaultValue: "johndoe" })] }), _jsxs(Button, { type: "submit", children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save Changes"] })] }) })] }) }), _jsxs(TabsContent, { value: "security", className: "space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Change Password" }), _jsx(CardDescription, { children: "Update your account password for enhanced security" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleChangePassword, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "currentPassword", children: "Current Password" }), _jsx(Input, { type: "password", id: "currentPassword", value: password.current, onChange: (e) => setPassword(prev => ({ ...prev, current: e.target.value })) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "newPassword", children: "New Password" }), _jsx(Input, { type: "password", id: "newPassword", value: password.new, onChange: (e) => setPassword(prev => ({ ...prev, new: e.target.value })) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirm New Password" }), _jsx(Input, { type: "password", id: "confirmPassword", value: password.confirm, onChange: (e) => setPassword(prev => ({ ...prev, confirm: e.target.value })) })] }), _jsxs(Button, { type: "submit", children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Change Password"] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Two-Factor Authentication" }), _jsx(CardDescription, { children: "Add an extra layer of security to your account" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { children: "Two-factor authentication is currently disabled." }), _jsxs(Button, { variant: "outline", children: [_jsx(Shield, { className: "mr-2 h-4 w-4" }), "Enable Two-Factor Authentication"] })] })] })] }), _jsx(TabsContent, { value: "notifications", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Notification Preferences" }), _jsx(CardDescription, { children: "Choose how you receive updates and alerts" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "emailNotifications", children: "Email Notifications" }), _jsx(Switch, { id: "emailNotifications", checked: userPrefs.notifications.email, onCheckedChange: () => toggleNotificationSetting('email') })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "pushNotifications", children: "Push Notifications" }), _jsx(Switch, { id: "pushNotifications", checked: userPrefs.notifications.push, onCheckedChange: () => toggleNotificationSetting('push') })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "smsNotifications", children: "SMS Notifications" }), _jsx(Switch, { id: "smsNotifications", checked: userPrefs.notifications.sms, onCheckedChange: () => toggleNotificationSetting('sms') })] })] })] }) }), _jsxs(TabsContent, { value: "preferences", className: "space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Appearance" }), _jsx(CardDescription, { children: "Customize the look and feel of your application" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "theme", children: "Theme" }), _jsxs(Select, { defaultValue: "system", children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select a theme" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "system", children: "System" }), _jsx(SelectItem, { value: "light", children: "Light" }), _jsx(SelectItem, { value: "dark", children: "Dark" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "compactMode", children: "Compact Mode" }), _jsx(Switch, { id: "compactMode", checked: userPrefs.appearance.compactMode, onCheckedChange: () => toggleAppearanceSetting('compactMode') })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "animationsEnabled", children: "Animations Enabled" }), _jsx(Switch, { id: "animationsEnabled", checked: userPrefs.appearance.animationsEnabled, onCheckedChange: () => toggleAppearanceSetting('animationsEnabled') })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Regional Settings" }), _jsx(CardDescription, { children: "Set your preferred language and time zone" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "language", children: "Language" }), _jsxs(Select, { defaultValue: "en", children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select a language" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "en", children: "English" }), _jsx(SelectItem, { value: "es", children: "Spanish" }), _jsx(SelectItem, { value: "fr", children: "French" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "timeZone", children: "Time Zone" }), _jsxs(Select, { defaultValue: "UTC", children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select a time zone" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "UTC", children: "UTC" }), _jsx(SelectItem, { value: "EST", children: "EST" }), _jsx(SelectItem, { value: "PST", children: "PST" })] })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Privacy Settings" }), _jsx(CardDescription, { children: "Control your data sharing and privacy options" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "shareData", children: "Share Usage Data" }), _jsx(Switch, { id: "shareData", checked: userPrefs.privacy.shareData, onCheckedChange: () => togglePrivacySetting('shareData') })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "allowTracking", children: "Allow Tracking" }), _jsx(Switch, { id: "allowTracking", checked: userPrefs.privacy.allowTracking, onCheckedChange: () => togglePrivacySetting('allowTracking') })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Data Management" }), _jsx(CardDescription, { children: "Export or delete your personal data" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs(Button, { onClick: handleExportData, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Data"] }), _jsxs(Button, { variant: "destructive", onClick: handleDeleteAccount, children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete Account"] })] })] })] })] })] }));
};
export default Settings;
