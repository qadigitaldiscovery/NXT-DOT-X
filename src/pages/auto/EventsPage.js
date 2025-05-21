import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { CalendarClock, Calendar, Plus, Clock, Bell } from 'lucide-react';
const EventsPage = () => {
    const eventsNavCategories = [
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
    return (_jsx(MissingPageTemplate, { moduleName: "Events", moduleDescription: "Schedule, manage, and monitor events, appointments, and calendar-based activities.", navCategories: eventsNavCategories, docsLink: "/admin/documentation?section=events" }));
};
export default EventsPage;
