import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebsiteLayout from "./WebsiteLayout";
import Home from "./pages/Home";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ProjectsSection from "./components/ProjectsSection";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TendersSection from "./components/TendersSection";
import ContactSection from "./components/ContactSection";
import GetQuotePage from "./components/GetQuotePage";
import JourneySection from "./components/JourneySection";
import AdminLayout from "./admin/layout/AdminLayout";
import DashboardHome from "./admin/pages/Dashboard";
import ManageJourney from "./admin/pages/ManageJourney";
import Consultation from "./components/Consultation";
import GallerySection from "./components/GallerySection";
import ManageServices from "./admin/pages/ManageServices";
import ManageProjects from "./admin/pages/ManageProjects";
import ManageGallery from "./admin/pages/ManageGallery";
import ManageTenders from "./admin/pages/ManageTenders";
import ManageTestimonials from "./admin/pages/ManageTestimonials";
import ManageInquiries from "./admin/pages/ManageInquiries";
import SettingsPage from "./admin/pages/SettingsPage";
import AdminLoginPage from "./admin/pages/AdminLoginPage";

const router = createBrowserRouter([
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
      { path: "get-quote", element: <GetQuotePage /> },
      { path: "journey", element: <JourneySection /> },
      { path: "consultation", element: <Consultation /> },
      {
        path : "gallery",
        element : <GallerySection/>
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { 
        index: true, 
        element: <DashboardHome /> 

      },
      { 
        path: "journey", 
        element: <ManageJourney /> 

      },
      {
        path: "services", // <-- ADD THIS NEW ROUTE
        element: <ManageServices />,
      },
       {
        path: "projects", // <-- ADD THIS NEW ROUTE
        element: <ManageProjects/>,
      },
       {
        path: "gallery", // <-- ADD THIS NEW ROUTE
        element: <ManageGallery />,
      },
       {
        path: "tenders", // <-- ADD THIS NEW ROUTE
        element: <ManageTenders />,
      },
        {
        path: "testimonials", // <-- ADD THIS NEW ROUTE
        element: <ManageTestimonials />,
      },
      {
        path: "inquiries", // <-- ADD THIS NEW ROUTE
        element: <ManageInquiries />,
      },
      {
        path: "settings", // <-- ADD THIS NEW ROUTE
        element: <SettingsPage />,
      }
    ],
  },
   {
    // --- Group 3: Standalone Routes (like Login) ---
    path: "/adminlogin", // <-- ADD THIS NEW TOP-LEVEL ROUTE
    element: <AdminLoginPage/>,
  },
  {
    path: "*",
    element: <h1>404: Page Not Found</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
