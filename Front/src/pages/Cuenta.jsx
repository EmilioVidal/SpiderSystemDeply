import React, { useState, useRef, useContext } from "react";
import { FiCamera, FiMail, FiLogOut, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { ThemeContext } from "../App"; // Importando el contexto del tema

export function Cuenta() {
  const { theme } = useContext(ThemeContext); // Obteniendo el tema actual
  const isDarkMode = theme === 'dark';

  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    profileImage: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({ ...userData, profileImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Cuenta</h2>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Información</p>

      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <div className={`relative w-20 h-20 rounded-full ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} border overflow-hidden`}>
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <VscAccount className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={40} />
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
        <button 
          onClick={handleProfileImageClick} 
          className={`${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded cursor-pointer`}
        >
          Subir nueva foto
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Borrar</button>
      </div>

      {/* Full Name */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nombre</label>
          <input 
            type="text" 
            value={userData.nombre} 
            onChange={(e) => setUserData({...userData, nombre: e.target.value})} 
            className={`w-full p-2 rounded mt-1 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-white text-gray-900'
            } border`} 
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Apellidos</label>
          <input 
            type="text" 
            value={userData.apellidos} 
            onChange={(e) => setUserData({...userData, apellidos: e.target.value})} 
            className={`w-full p-2 rounded mt-1 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-white text-gray-900'
            } border`} 
          />
        </div>
      </div>

      {/* Email */}
      <div className="mt-6">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Correo</label>
        <div className="relative mt-1">
          <FiMail className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input 
            type="email" 
            value={userData.correo} 
            onChange={(e) => setUserData({...userData, correo: e.target.value})} 
            className={`w-full p-2 pl-10 rounded ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-white text-gray-900'
            } border`} 
          />
        </div>
      </div>

      {/* Role and Phone */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rol asignado</label>
          <input 
            type="text" 
            value="Administrador" 
            className={`w-full p-2 rounded ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 bg-white text-gray-900'
            } border`} 
            readOnly 
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Teléfono</label>
          <input 
            type="text" 
            value={userData.telefono} 
            onChange={(e) => setUserData({...userData, telefono: e.target.value})} 
            className={`w-full p-2 rounded ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
                : 'border-gray-300 bg-white text-gray-900'
            } border`} 
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="mt-6 text-center">
        <button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Guardar cambios</button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6 rounded-lg shadow-lg max-w-sm text-center`}>
            <FiCheckCircle className="text-green-500 mx-auto text-5xl" />
            <h3 className="text-lg font-semibold mt-2">¡Cambios guardados!</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Los cambios se han guardado correctamente.</p>
            <div className="mt-4">
              <button onClick={() => setShowConfirmModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
