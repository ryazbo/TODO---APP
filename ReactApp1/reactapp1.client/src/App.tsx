// src/App.tsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Context/AuthContext';
import { LoginForm } from './components/pages/auth/loginForm';
import { Dashboard } from './components/pages/welcomeDashboard/dashboard';
import { Register } from './components/pages/register/registerForm'
import { Navbar } from './components/transversales/navBar';
import { SideBarProvider } from './components/hooks/SideBarContext';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/vista" /> : <LoginForm />}
      />
      <Route
        index
        element={isAuthenticated ? <Navigate to="/vista" /> : <Navigate to="/login" />}
      />
      <Route
        index
        element={<Navigate to="/register" /> }
      />
      <Route
        path="/register"
        element={
        <Register />        
          
}
      />
      <Route
        path="/vista"
        element={isAuthenticated ? (
          <div style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
            <Navbar />
              <Dashboard />          
          </div>
        ) : (
          <Navigate to="/login" />
        )}
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <SideBarProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SideBarProvider>

  );
};

export default App;
