// ✅ FILE: AdminLoginPage.jsx (UPDATED)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowPathIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { adminLoginAsync } from "../../features/adminSlice/auth/loginSlice";
import ForgotPasswordModal from "../components/password/ForgotPasswordModal"; // <-- NUEVA IMPORTACIÓN

// ... (El componente FloatingLabelInput no cambia)
const FloatingLabelInput = ({ id, label, type, value, onChange, hasError }) => (
    <div className="relative">
      <input id={id} type={type} value={value} onChange={onChange} placeholder=" " className={`peer w-full rounded-lg border px-3 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 ${hasError ? "border-red-500" : "border-gray-300"}`} required />
      <label htmlFor={id} className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-red-500 peer-focus:text-sm">{label}</label>
    </div>
);

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- NUEVO ESTADO PARA EL MODAL

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(adminLoginAsync({ email, password }));
    if (adminLoginAsync.fulfilled.match(resultAction)) {
      navigate("/admin");
    }
  };

  return (
    <> {/* <-- Fragment para envolver todo */}
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800">Vaidehi Admin</h1>
              <p className="text-slate-500 mt-2">Sign in to manage your website</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... Inputs de email y password sin cambios ... */}
               <FloatingLabelInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" hasError={!!error}/>
               <div className="relative">
                 <FloatingLabelInput id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} label="Password" hasError={!!error}/>
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700">
                   {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                 </button>
               </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex items-center justify-end">
                {/* ✅ ENLACE ACTUALIZADO PARA ABRIR EL MODAL */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm text-red-600 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors">
                  {loading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* ✅ RENDERIZAR EL MODAL */}
      <ForgotPasswordModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AdminLoginPage;