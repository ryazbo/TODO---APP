using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow;
using Microsoft.EntityFrameworkCore;
using ReactApp.Infraestructura.Filters.NewFolder;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly TodoappContext _context;

        public UsuariosController(TodoappContext context)
        {
            _context = context;
        }


        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios([FromQuery] UsuarioFilter filter)
        {
            var usr = await _context.Usuarios
                .Where(x => x.IdUsuario == filter.idUsuario || filter.idUsuario == 0 || filter.idUsuario == default)
                .Where(x => x.NombreUsuario.Contains(filter.Name) || filter.Name == null || filter.Name == string.Empty)
                .ToListAsync();
            return Ok(usr);
        }
        [HttpGet("~/api/Usuarios/Login")]
        public async Task<ActionResult<Usuario>> LoginUsuario([FromQuery] UsuarioDta login)
        {
            try
            {
                var usr = await _context.Usuarios
                    .Where(x => x.Email == login.EmailUsuarioLogin || login.EmailUsuarioLogin == null || login.EmailUsuarioLogin == string.Empty)
                    .Where(x => x.Contrasena.Contains(login.PasswordUsuario) || login.PasswordUsuario == null || login.PasswordUsuario == string.Empty)
                    .FirstAsync();
                Usuario loginUsur = new()
                {
                    IdUsuario = 423,
                    Contrasena = "noaccesible",
                    Email = login.EmailUsuarioLogin,
                    NombreUsuario = usr.NombreUsuario,
                    Telefono = usr.Telefono
                };
                return loginUsur;
            } catch (Exception ex)
            {
                return BadRequest(new { error = "Correo o contrasena no coinciden", errorId = 405 });
            }
        }
        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarios(int id)
        {
            var usuarios = await _context.Usuarios.FindAsync(id);

            if (usuarios == null)
            {
                return NotFound();
            }

            return usuarios;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarios(int id, Usuario usuarios)
        {
            if (id != usuarios.IdUsuario)
            {
                return BadRequest();
            }


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostUsuarios(Usuario usuarios)
        {
            if ( usuarios != null)
            {
                bool resp = await _context.Usuarios.Where(x => x.Email == usuarios.Email).AnyAsync();
                if(resp == true)
                {
                    return BadRequest(new { error = "Email ya esta registrado porfavor use otro" });
                }
                else {
                    _context.Usuarios.Add(usuarios);
                    await _context.SaveChangesAsync();
                }
            }
            return Ok("Usuario creado correctamente");
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarios(int id)
        {
            var usuarios = await _context.Usuarios.FindAsync(id);
            if (usuarios == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuarios);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuariosExists(int id)
        {
            return _context.Usuarios.Any(e => e.IdUsuario == id);
        }
    }
}
