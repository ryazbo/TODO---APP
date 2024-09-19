import { http } from "../../http/http";
import { Usuario } from "../../models/usuarios/usuario";

const usuarioApi = '/api/Usuarios';

interface LoginData {
    emailUsuarioLogin: string;
    PasswordUsuario: string;
}
interface RegisterData {
    nombreUsuario: string;
    email: string;
    telefono: string;
    contrasena: string;
}
export const UsuarioRequests = {
    LoginUsuario: async (Login : LoginData): Promise<Usuario> => {
        try {
            const response = await http.get<Usuario>(`${usuarioApi}/Login`, Login);
            return response;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },
    RegisterUsuario: async (Register : RegisterData): Promise<Usuario> => {
        try {
            const response = await http.post<Usuario>(`${usuarioApi}`, Register);
            return response;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
};

