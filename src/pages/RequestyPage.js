import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RequestyKeyForm from '@/components/tech-hub/api-management/requesty/RequestyKeyForm';
import RequestyChatTester from '@/components/tech-hub/api-management/requesty/RequestyChatTester';
const RequestyPage = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Requesty API Integration" }), _jsx("p", { className: "text-muted-foreground", children: "Configure and test your Requesty API integration" })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(RequestyKeyForm, {}), _jsx(RequestyChatTester, {})] })] }));
};
export default RequestyPage;
