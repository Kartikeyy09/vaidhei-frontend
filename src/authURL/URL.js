export const BASE_URL = "https://vaidhei-backend.onrender.com/";

// export const BASE_URL = "http://localhost:3000/";

// ---------------- login ----------------
export const ADMIN_LOGIN_URL = `${BASE_URL}api/auth/login`;

// ---------------- Services ----------------
export const ADMIN_SERVICES_URL = `${BASE_URL}api/services`;
export const ADMIN_SERVICES_CREATE_URL = `${ADMIN_SERVICES_URL}`; // POST
export const ADMIN_SERVICES_GET_BY_ID_URL = (id) => `${ADMIN_SERVICES_URL}/${id}`; // GET by ID
export const ADMIN_SERVICES_UPDATE_URL = (id) => `${ADMIN_SERVICES_URL}/${id}`; // PUT
export const ADMIN_SERVICES_DELETE_URL = (id) => `${ADMIN_SERVICES_URL}/${id}`; // DELETE

// ---------------- Tenders ----------------
export const ADMIN_TENDERS_URL = `${BASE_URL}api/tenders`;
export const ADMIN_TENDERS_CREATE_URL = `${ADMIN_TENDERS_URL}`; 
export const ADMIN_TENDERS_GET_BY_ID_URL = (id) => `${ADMIN_TENDERS_URL}/${id}`;
export const ADMIN_TENDERS_UPDATE_URL = (id) => `${ADMIN_TENDERS_URL}/${id}`;
export const ADMIN_TENDERS_DELETE_URL = (id) => `${ADMIN_TENDERS_URL}/${id}`;

// ---------------- Inquiries ----------------
export const ADMIN_INQUIRIES_URL = `${BASE_URL}api/inquiries`;
export const ADMIN_INQUIRIES_CREATE_URL = `${ADMIN_INQUIRIES_URL}`;
export const ADMIN_INQUIRIES_GET_BY_ID_URL = (id) => `${ADMIN_INQUIRIES_URL}/${id}`;
export const ADMIN_INQUIRIES_UPDATE_URL = (id) => `${ADMIN_INQUIRIES_URL}/${id}`;
export const ADMIN_INQUIRIES_DELETE_URL = (id) => `${ADMIN_INQUIRIES_URL}/${id}`;

// ---------------- Testimonials ----------------
export const ADMIN_TESTIMONIALS_URL = `${BASE_URL}api/testimonials`;
export const ADMIN_TESTIMONIALS_CREATE_URL = `${ADMIN_TESTIMONIALS_URL}`;
export const ADMIN_TESTIMONIALS_GET_BY_ID_URL = (id) => `${ADMIN_TESTIMONIALS_URL}/${id}`;
export const ADMIN_TESTIMONIALS_UPDATE_URL = (id) => `${ADMIN_TESTIMONIALS_URL}/${id}`;
export const ADMIN_TESTIMONIALS_DELETE_URL = (id) => `${ADMIN_TESTIMONIALS_URL}/${id}`;

// ---------------- Projects ----------------
export const ADMIN_PROJECTS_URL = `${BASE_URL}api/projects`;
export const ADMIN_PROJECTS_CREATE_URL = `${ADMIN_PROJECTS_URL}`;
export const ADMIN_PROJECTS_GET_BY_ID_URL = (id) => `${ADMIN_PROJECTS_URL}/${id}`;
export const ADMIN_PROJECTS_UPDATE_URL = (id) => `${ADMIN_PROJECTS_URL}/${id}`;
export const ADMIN_PROJECTS_DELETE_URL = (id) => `${ADMIN_PROJECTS_URL}/${id}`;

// ---------------- Gallery ----------------
export const ADMIN_GALLERY_URL = `${BASE_URL}api/gallery`;
export const ADMIN_GALLERY_CREATE_URL = `${ADMIN_GALLERY_URL}`;
export const ADMIN_GALLERY_GET_BY_ID_URL = (id) => `${ADMIN_GALLERY_URL}/${id}`;
export const ADMIN_GALLERY_UPDATE_URL = (id) => `${ADMIN_GALLERY_URL}/${id}`;
export const ADMIN_GALLERY_DELETE_URL = (id) => `${ADMIN_GALLERY_URL}/${id}`;
