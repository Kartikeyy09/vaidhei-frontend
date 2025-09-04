// export const BASE_URL = "https://vaidhei-backend.onrender.com/";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

// ---------------- login ----------------
export const ADMIN_LOGIN_URL = `${BASE_URL}api/auth`;

export const PROFILE_API_URL = `${BASE_URL}api/profile`;

export const SERVICE_URL = `${BASE_URL}api/services`;

export const PROJECT_URL = `${BASE_URL}api/projects`;

export const TENDER_URL = `${BASE_URL}api/tenders`;

export const GALLERY_URL = `${BASE_URL}api/gallery`;


export const INQUIRY_URL = `${BASE_URL}api/inquiries`;

export const DASHBOARD_URL = `${BASE_URL}api/dashboard/stats`; 


export const JOURNEY_URL = `${BASE_URL}api/journey`;

export const TESTIMONIAL_URL = `${BASE_URL}api/testimonials`;

export const SETTINGS_URL = `${BASE_URL}api/settings`;

export const USER_URL = `${BASE_URL}api/users/`;
