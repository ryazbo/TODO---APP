using ReactApp1.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactApp.Infraestructura.Entities
{
    public class UsuarioEntity
    {
        public int IdUsuarios { get; set; }

        public string? NombreUsuario { get; set; }

        public string? Email { get; set; }

        public string? Telefono { get; set; }

        public string? Contrasena { get; set; }

        public UsuarioEntity()
        {
            this.IdUsuarios = 0;
            this.NombreUsuario = string.Empty;
            this.Email = string.Empty;  
            this.Telefono = string.Empty;
            this.Contrasena = string.Empty;
        }

        public UsuarioEntity(Usuario mdl)
        {
            this.IdUsuarios = mdl.IdUsuario;
            this.NombreUsuario = mdl.NombreUsuario;
            this.Email = mdl.Email;
            this.Telefono = mdl.Telefono;
            this.Contrasena = mdl.Contrasena;
        }
    }
}
