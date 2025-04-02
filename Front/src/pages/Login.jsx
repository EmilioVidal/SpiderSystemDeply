import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import styled from "styled-components";
import { ThemeContext } from "../App"; // Importando el contexto correcto

// Componentes estilizados para el formulario
const RoundedInput = styled.input`
  border-radius: 12px;
  transition: all 0.3s ease;
  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    outline: none;
  }
`;

const RoundedButton = styled.button`
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Componente para Light Mode
const LightModeLogin = ({ handleSubmit, formData, setFormData, showPassword, setShowPassword }) => {
  return (
    <div className="w-1/2 bg-white flex flex-col justify-center h-screen">
      <div className="mx-auto w-full max-w-md px-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mt-2 text-gray-800">Bienvenido de Nuevo</h1>
            <p className="text-gray-500">Inicia sesión en tu cuenta</p>
          </div>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <RoundedInput
                type="email"
                className="block w-full pl-10 py-3 border border-blue-200 bg-blue-50 text-gray-800 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <RoundedInput
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 py-3 border border-blue-200 bg-blue-50 text-gray-800 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-blue-600" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-600" />
                )}
              </button>
            </div>
          </div>

          <RoundedButton
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md border-0"
          >
            Iniciar Sesión
          </RoundedButton>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link to="/home" className="text-blue-600 hover:text-blue-700">
                Crear cuenta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente para Dark Mode
const DarkModeLogin = ({ handleSubmit, formData, setFormData, showPassword, setShowPassword }) => {
  return (
    <div className="w-1/2 bg-gray-900 flex flex-col justify-center h-screen">
      <div className="mx-auto w-full max-w-md px-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold mt-2 text-white">Bienvenido de Nuevo</h1>
            <p className="text-gray-400">Inicia sesión en tu cuenta</p>
          </div>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <RoundedInput
                type="email"
                className="block w-full pl-10 py-3 border border-blue-800 bg-blue-900/50 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-blue-400" />
              </div>
              <RoundedInput
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 py-3 border border-blue-800 bg-blue-900/50 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-blue-400" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-400" />
                )}
              </button>
            </div>
          </div>

          <RoundedButton
            type="submit"
            className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md border-0"
          >
            Iniciar Sesión
          </RoundedButton>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link to="/home" className="text-blue-400 hover:text-blue-300">
                Crear cuenta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente principal de Login
export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { theme } = useContext(ThemeContext); // Obteniendo el tema actual

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    window.location.href = "/home"; // Redirige a la página de inicio después del login
  };

  const props = {
    handleSubmit,
    formData,
    setFormData,
    showPassword, 
    setShowPassword
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden absolute inset-0 m-0 p-0">
      {/* Panel izquierdo - cambia según el tema */}
      {theme === 'light' ? (
        <LightModeLogin {...props} />
      ) : (
        <DarkModeLogin {...props} />
      )}

      {/* Panel derecho - siempre negro con texto blanco */}
      <div className="w-1/2 bg-gray-900 h-screen flex flex-col">
        <div className="flex-grow"></div>
        <div className="text-center pb-8">
          <h2 className="text-3xl font-bold text-white">¡Bienvenido de nuevo!</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-md mx-auto">
            Inicia sesión para continuar tus conversaciones y ponerte al día con tus mensajes.
          </p>
        </div>
      </div>
    </div>
  );
}