
import { Route } from "react-router-dom";
import SocialMediaDashboard from "@/pages/social-media/Dashboard";

export const SocialMediaRoutes = () => {
  return (
    <Route path="/social-media">
      <Route index element={<SocialMediaDashboard />} />
      {/* Additional social media routes would go here */}
    </Route>
  );
};
