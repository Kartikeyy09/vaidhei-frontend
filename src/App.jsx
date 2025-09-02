import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Layouts
import WebsiteLayout from "./WebsiteLayout";
import AdminLayout from "./admin/layout/AdminLayout";

// Import the Guard Component
import ProtectedRoute from "./components/ProtectedRoute";
 // ⚠️ Adjust this path if necessary

// Import Website Pages
import Home from "./commonPages/pages/Home";
import AboutSection from "./commonPages/components/AboutSection";
import ServicesSection from "./commonPages/components/ServicesSection";
import ServiceDetailPage from "./commonPages/pages/ServiceDetailPage";
import ProjectsSection from "./commonPages/components/ProjectsSection";
import ProjectDetailPage from "./commonPages/pages/ProjectDetailPage";
import TendersSection from "./commonPages/components/TendersSection";
import ContactSection from "./commonPages/components/ContactSection";
// import GetQuotePage from "./commonPages/components/GetQuotePage";
import JourneySection from "./commonPages/components/JourneySection";
import Consultation from "./commonPages/components/Consultation";
import GallerySection from "./commonPages/components/GallerySection";

// Import Admin Pages
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import DashboardHome from "./admin/pages/Dashboard";
import ManageJourney from "./admin/pages/ManageJourney";
import ManageServices from "./admin/pages/ManageServices";
import ManageProjects from "./admin/pages/ManageProjects";
import ManageGallery from "./admin/pages/ManageGallery";
import ManageTenders from "./admin/pages/ManageTenders";
import ManageTestimonials from "./admin/pages/ManageTestimonials";
import ManageInquiries from "./admin/pages/ManageInquiries";
import SettingsPage from "./admin/pages/SettingsPage";
import NotFoundPage from "./commonPages/pages/NotFoundPage";
import PrivacyPolicyPage from "./commonPages/pages/PrivacyPolicyPage";
import AdminProfilePage from "./admin/pages/AdminProfilePage";



const router = createBrowserRouter([
  // --- Group 1: Public Website Routes ---
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutSection /> },
      { path: "services", element: <ServicesSection /> },
      { path: "services/:slug", element: <ServiceDetailPage /> },
      { path: "projects", element: <ProjectsSection /> },
      { path: "projects/:slug", element: <ProjectDetailPage /> },
      { path: "tenders", element: <TendersSection /> },
      { path: "contact", element: <ContactSection /> },
      // { path: "get-quote", element: <GetQuotePage /> },
      { path: "journey", element: <JourneySection /> },
      { path: "consultation", element: <Consultation /> },
      { path: "gallery", element: <GallerySection /> },
      {
        path : "privacy-policy",
        element : <PrivacyPolicyPage/>
      }
      
    ],
  },
  
  // --- Group 2: Public Admin Route (Login Page) ---
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },

  // --- Group 3: Protected Admin Routes ---
  {
    element: <ProtectedRoute />, // This is the guard for all its children
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "journey", element: <ManageJourney /> },
          { path: "services", element: <ManageServices /> },
          { path: "projects", element: <ManageProjects /> },
          { path: "gallery", element: <ManageGallery /> },
          { path: "tenders", element: <ManageTenders /> },
          { path: "testimonials", element: <ManageTestimonials /> },
          { path: "inquiries", element: <ManageInquiries /> },
          { path: "settings", element: <SettingsPage /> },
          {path : "profile", element : <AdminProfilePage />}
        ],
      },
    ],
  },
  
  // --- Group 4: Catch-all 404 Route ---
  {
    path: "*",
    element: <NotFoundPage/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;