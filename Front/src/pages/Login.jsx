import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import styled from "styled-components";

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

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    window.location.href = "/home"; // Redirige a la página de inicio después del login
  };

  return (
    <div className="h-screen flex">
      {/* Lado Izquierdo - Formulario */}
      <div className="w-1/2 flex flex-col justify-center items-center px-16 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Formulario */}
          <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <RoundedInput
                  type="email"
                  className="input input-bordered w-full h-14 pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <RoundedInput
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full h-14 pl-10"
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
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <RoundedButton 
              type="submit" 
              className="btn btn-primary w-full max-w-sm h-14 bg-blue-500 hover:bg-blue-700 text-white"
            >
              Sign in
            </RoundedButton>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/home" className="link text-blue-500 hover:text-blue-700">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Lado Derecho - Mensaje de bienvenida */}
      <div className="w-1/2 flex justify-center items-end bg-gray-100 px-16 py-12">
        <div className="text-center min-w-md">
          <h2 className="text-3xl font-bold">Welcome back!</h2>
          <p className="mt-4 text-lg">
            Sign in to continue your conversations and catch up with your messages.
          </p>
        </div>
      </div>
    </div>
  );
}