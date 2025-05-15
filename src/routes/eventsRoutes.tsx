
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import EventsPage from "@/pages/auto/EventsPage";
import { CalendarClock, Calendar, Plus, Clock, Bell } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const EventsNavCategories: NavCategory[] = [
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
  return (
    <Route path="/events">
      <Route index element={
        <PlatformLayout
          moduleTitle="Events"
          navCategories={EventsNavCategories}
        >
          <EventsPage />
        </PlatformLayout>
      } />
      <Route path="calendar" element={
        <PlatformLayout
          moduleTitle="Events Calendar"
          navCategories={EventsNavCategories}
        >
          <EventsPage />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="Create Event"
          navCategories={EventsNavCategories}
        >
          <EventsPage />
        </PlatformLayout>
      } />
      <Route path="schedule" element={
        <PlatformLayout
          moduleTitle="Event Schedule"
          navCategories={EventsNavCategories}
        >
          <EventsPage />
        </PlatformLayout>
      } />
      <Route path="notifications" element={
        <PlatformLayout
          moduleTitle="Event Notifications"
          navCategories={EventsNavCategories}
        >
          <EventsPage />
        </PlatformLayout>
      } />
    </Route>
  );
};
