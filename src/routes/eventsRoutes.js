import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import EventsPage from "@/pages/auto/EventsPage";
import { CalendarClock, Calendar, Plus, Clock, Bell } from 'lucide-react';
export const EventsNavCategories = [
    {
        name: "Events",
        label: "Events",
        items: [
            { label: "Dashboard", path: "/events", icon: CalendarClock },
            { label: "Calendar", path: "/events/calendar", icon: Calendar },
            { label: "Create Event", path: "/events/new", icon: Plus },
            { label: "Schedule", path: "/events/schedule", icon: Clock },
            { label: "Notifications", path: "/events/notifications", icon: Bell }
        ]
    }
];
export const EventsRoutes = () => {
    return [
        _jsxs(Route, { path: "/events", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Events", navCategories: EventsNavCategories, children: _jsx(EventsPage, {}) }) }), _jsx(Route, { path: "calendar", element: _jsx(PlatformLayout, { moduleTitle: "Events Calendar", navCategories: EventsNavCategories, children: _jsx(EventsPage, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "Create Event", navCategories: EventsNavCategories, children: _jsx(EventsPage, {}) }) }), _jsx(Route, { path: "schedule", element: _jsx(PlatformLayout, { moduleTitle: "Event Schedule", navCategories: EventsNavCategories, children: _jsx(EventsPage, {}) }) }), _jsx(Route, { path: "notifications", element: _jsx(PlatformLayout, { moduleTitle: "Event Notifications", navCategories: EventsNavCategories, children: _jsx(EventsPage, {}) }) })] }, "events-index")
    ];
};
