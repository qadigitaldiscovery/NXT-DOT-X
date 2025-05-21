import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import BrandMarketing from './modules/BrandMarketing';
import TradingSystem from './modules/TradingSystem';
import TechHub from './modules/TechHub';
import CustomerManagement from './modules/CustomerManagement';
import SupplierManagement from './modules/SupplierManagement';
import ProjectManagement from './modules/ProjectManagement';
import DataManagement from './modules/DataManagement';
import SystemTechnicalConfig from './modules/SystemTechnicalConfig';
import LoyaltyProgram from './modules/LoyaltyProgram';
import SocialMediaMarketing from './modules/SocialMediaMarketing';
import DotX from './modules/DotX';
import SearchAndFilter from './SearchAndFilter';
import { DeveloperAccess } from './modules/DeveloperAccess';
import Administration from './modules/Administration';
import AiArmy from './modules/AiArmy';
import Communications from './modules/Communications';
import AutomationWorkflow from './modules/AutomationWorkflow';
import Operations from './modules/Operations';
import WebServices from './modules/WebServices';
const DashboardModules = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredModules, setFilteredModules] = useState({
        primary: true,
        secondary: true,
        subcategory: true,
    });
    // Add a state to show/hide the developer access
    const [showDevAccess] = useState(true);
    useEffect(() => {
        // Filter modules based on active category and search term
        let primary = true;
        let secondary = true;
        let subcategory = true;
        if (activeCategory !== 'all') {
            primary = activeCategory === 'primary';
            secondary = activeCategory === 'secondary';
            subcategory = activeCategory === 'subcategory';
        }
        setFilteredModules({
            primary: primary && (searchTerm === '' || 'primary'.includes(searchTerm.toLowerCase())),
            secondary: secondary && (searchTerm === '' || 'secondary'.includes(searchTerm.toLowerCase())),
            subcategory: subcategory && (searchTerm === '' || 'subcategory'.includes(searchTerm.toLowerCase())),
        });
    }, [activeCategory, searchTerm]);
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };
    const handleSearchChange = (term) => {
        setSearchTerm(term.toLowerCase());
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(SearchAndFilter, { activeCategory: activeCategory, onCategoryChange: handleCategoryChange, searchTerm: searchTerm, onSearchChange: handleSearchChange }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: [(activeCategory === 'all' || activeCategory === 'primary') &&
                        filteredModules.primary && (_jsxs(_Fragment, { children: [_jsx(DataManagement, {}), _jsx(SocialMediaMarketing, {}), _jsx(BrandMarketing, {}), _jsx(TradingSystem, {}), _jsx(ProjectManagement, {}), _jsx(DotX, {}), _jsx(TechHub, {}), _jsx(Communications, {}), _jsx(AutomationWorkflow, {}), _jsx(Operations, {}), _jsx(WebServices, {})] })), (activeCategory === 'all' || activeCategory === 'secondary') &&
                        filteredModules.secondary && (_jsxs(_Fragment, { children: [_jsx(CustomerManagement, {}), _jsx(SupplierManagement, {}), _jsx(SystemTechnicalConfig, {}), _jsx(Administration, {})] })), (activeCategory === 'all' || activeCategory === 'subcategory') &&
                        filteredModules.subcategory && (_jsxs(_Fragment, { children: [_jsx(AiArmy, {}), _jsx(LoyaltyProgram, {})] })), showDevAccess && (_jsx(DeveloperAccess, {}))] })] }));
};
export default DashboardModules;
