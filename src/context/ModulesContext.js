import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from 'react';
const ModulesContext = createContext(undefined);
export function useModules() {
    const context = useContext(ModulesContext);
    if (context === undefined) {
        throw new Error("useModules must be used within a ModulesProvider");
    }
    return context;
}
export function ModulesProvider({ children }) {
    const [modules, setModules] = useState([
        {
            id: "data-management",
            name: "Data Management",
            isEnabled: true,
            isVisible: true,
            description: "Manage and analyze data",
            category: "core",
            features: {},
        },
        {
            id: "admin",
            name: "Administration",
            isEnabled: true,
            isVisible: true,
            description: "System administration",
            category: "core",
            features: {},
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const enableModule = (id) => {
        setModules((prevModules) => prevModules.map((module) => module.id === id ? { ...module, isEnabled: true, enabled: true } : module));
    };
    const disableModule = (id) => {
        setModules((prevModules) => prevModules.map((module) => module.id === id ? { ...module, isEnabled: false, enabled: false } : module));
    };
    const toggleModule = (id) => {
        setModules((prevModules) => prevModules.map((module) => module.id === id ? {
            ...module,
            isEnabled: !module.isEnabled,
            enabled: !module.isEnabled
        } : module));
    };
    const toggleModuleVisibility = (id) => {
        setModules((prevModules) => prevModules.map((module) => module.id === id ? { ...module, isVisible: !module.isVisible } : module));
    };
    const refreshModules = () => {
        // In a real implementation, this would fetch modules from an API
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    const isFeatureEnabled = (featureId) => {
        // Simple implementation to check if any module has this feature enabled
        return modules.some(module => module.isEnabled && module.features && module.features[featureId] === true);
    };
    return (_jsx(ModulesContext.Provider, { value: {
            modules,
            loading,
            error,
            enableModule,
            disableModule,
            toggleModuleVisibility,
            toggleModule,
            refreshModules,
            isFeatureEnabled
        }, children: children }));
}
