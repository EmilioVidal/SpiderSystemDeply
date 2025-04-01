import { useState, useEffect, useContext } from "react";
import { Users } from "lucide-react";
import { ThemeContext } from "../../App";

const dummyUsers = [
  { Id: 1, Name: "Juan Perez", ProfilePic: "https://via.placeholder.com/50" },
  { Id: 2, Name: "Maria Gonzalez", ProfilePic: "https://via.placeholder.com/50" },
];

const Sidebar = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const { theme } = useContext(ThemeContext); // Obtiene el tema actual

  useEffect(() => {
    setTimeout(() => {
      setUsers(dummyUsers);
    }, 1500);
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <aside
      className={`h-full w-64 border-r ${
        theme === "light" ? "border-gray-300 bg-gray-100 text-gray-900" : "border-gray-700 bg-gray-900 text-white"
      } flex flex-col p-4`}
    >
      {/* Encabezado con Ícono y Título */}
      <div className={`flex items-center gap-2 border-b pb-2 ${theme === "light" ? "border-gray-400" : "border-gray-600"}`}>
        <Users className={`size-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
        <span className="font-medium text-lg">Contacts</span>
      </div>

      {/* Lista de Contactos */}
      <div className="overflow-y-auto py-3">
        {users.length === 0 ? (
          <p className={`text-center mt-4 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
            Cargando usuarios...
          </p>
        ) : (
          users.map((user) => (
            <button
              key={user.Id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-lg transition ${
                theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-800"
              }`}
            >
              <img
                    src={imageErrors[user.Id] ? "/default-avatar.png" : user.ProfilePic}
                    alt={user.Name}
                    className={`size-10 rounded-full border ${
                        theme === "light" ? "border-gray-300 bg-gray-100 text-gray-900" : "border-gray-400 bg-gray-600 text-white"
                    }`}
                    onError={() => handleImageError(user.Id)}
                />
                            <span className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>{user.Name}</span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
