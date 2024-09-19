using System;
using System.Collections.Generic;

namespace ReactApp1.Server.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Contrasena { get; set; } = null!;
}
