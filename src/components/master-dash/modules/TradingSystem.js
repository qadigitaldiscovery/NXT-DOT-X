import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const TradingSystem = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "TRADING SYSTEM", path: "/trading-system", variant: "default", features: [
                { name: 'Dashboard', path: '/trading-system' },
                { name: 'Market Analytics', path: '/trading-system/analytics' },
                { name: 'Trading History', path: '/trading-system/history' },
                { name: 'Settings', path: '/trading-system/settings' }
            ] }) }));
};
export default TradingSystem;
