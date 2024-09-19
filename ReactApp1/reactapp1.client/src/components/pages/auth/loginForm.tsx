// src/components/pages/auth/LoginForm.tsx
import { useState, ChangeEvent } from 'react';
import { UsuarioRequests } from '../../data/requests/Login/usuariosRequest';
import { storage } from '../../data/storage/storage';
import { useNavigate } from 'react-router-dom';
import './../../styles/login.css';
import { Button, Grid, TextField, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAuth } from '../../Context/AuthContext';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = () => {
    const getLoginResponse = async () => {
      try {
        const resp = await UsuarioRequests.LoginUsuario({
          emailUsuarioLogin: email,
          PasswordUsuario: pass
        });
        storage.setItem('usr_data_usrName', resp.nombreUsuario);
        storage.setItem('usr_data_usrEmail', resp.email);
        storage.setItem('usr_data_usrTelefono', resp.telefono);
        setIsAuthenticated(true);
        navigate('/vista');
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getLoginResponse();
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container-form">
      <form className="login-form">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AssignmentIcon sx={{ fontSize: "10rem", marginLeft: '3rem' }} />
            <Typography variant="h6" ml={2} gutterBottom>
              Assign and Organize tasks to your team or yourself
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Typography variant="h6" ml={16} gutterBottom>
                Login
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
            <Grid item xs={6} sx={{ marginLeft: '25%' }}>
              <Button onClick={handleLogin} variant="contained" fullWidth>
                Login
              </Button>
              <Grid>
              <Button onClick={handleRegister} variant="outlined" fullWidth>
              registrese
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
