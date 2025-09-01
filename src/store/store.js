import { configureStore } from "@reduxjs/toolkit";
import manageServicesReducer from "../features/adminSlice/ManageServices/ManageServicesSlice";
import loginReducer from "../features/adminSlice/auth/loginSlice";
import manageProjectsReducer from "../features/adminSlice/ManageProjects/ManageProjectsSlice";
import manageGalleryReducer from "../features/adminSlice/ManageGallery/ManageGallerySlice";4
import manageJourneyReducer from "../features/adminSlice/ManageJourney/ManageJourneySlice";
import manageTendersReducer from "../features/adminSlice/ManageTenders/ManageTendersSlice";
import manageTestimonialsReducer from "../features/adminSlice/ManageTestimonials/ManageTestimonialsSlice";
import manageInquiriesReducer from "../features/adminSlice/ManageInquiries/ManageInquiriesSlice";
import dashboardReducer from "../features/adminSlice/Dashboard/DashboardSlice";
import settingsReducer from "../features/adminSlice/Settings/SettingsSlice";

export const store = configureStore({
  reducer: {
     manageServices: manageServicesReducer,
    login: loginReducer, // admin login slice
    manageProjects: manageProjectsReducer,
    manageGallery: manageGalleryReducer,
    manageJourney: manageJourneyReducer,
    manageTenders: manageTendersReducer,
    manageTestimonials: manageTestimonialsReducer,
    manageInquiries: manageInquiriesReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
  },
});
