// src/components/pages/auth/LoginForm.tsx
import { useState, ChangeEvent } from 'react';
import './../../styles/login.css';
import { Button, Grid, TextField, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { UsuarioRequests } from '../../data/requests/Login/usuariosRequest';


export const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const navigate = useNavigate();
    const handleLogin = () => {
        const getLoginResponse = async () => {
            try {
            const resp = await UsuarioRequests.RegisterUsuario({
                email: email,
                contrasena: pass,
                nombreUsuario: name,
                telefono:telefono
            });

            navigate('/Login');
            } catch (e: any) {
            console.log(e.message);
            }
        };
        getLoginResponse();
    };
return (
    <div className="login-container-form">
    <form className="login-form">
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <AssignmentIcon sx={{ fontSize: "10rem", marginLeft: '3rem' }} />
            <Typography variant="h6" ml={2} gutterBottom>
            sign up to get started
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Grid item xs={12}>
            <Typography variant="h6" ml={16} gutterBottom>
                Register
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="login-email"
                className="login-input"
                value={email}
                fullWidth
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                label="Correo"
                autoComplete="email"                                  
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="register-name"
                className="login-input"
                value={name}
                fullWidth
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                label="Nombre"
                autoComplete="email"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="register-telefono"
                className="login-input"
                value={telefono}
                fullWidth
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)}
                label="Telefono"
                autoComplete="email"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="login-pass"
                className="login-input"
                type="password"
                value={pass}
                fullWidth
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                label="Password"
                autoComplete="current-password"
            />
            </Grid>
            <Button onClick={handleLogin} variant="contained" fullWidth>
                Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
