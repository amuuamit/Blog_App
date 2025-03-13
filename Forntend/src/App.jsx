import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AppLayout from './layout/AppLayout';
import { AuthProvider } from './context/AuthContext';
import ArticlesComponent from './component/ArticleComponent';
import ReadMore from './component/ReadMore';
function App() {
  
  return (
    <AuthProvider>
        <Routes>
          {/* <Route path='/' element={ <AppLayout/>} /> */}
          <Route path='/' element={ <Navigate to= '/login' />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />    
            <Route path='/home' element={ <AppLayout/>} />    
            <Route path='/article' element={ <ArticlesComponent />} />
            <Route path='/readmore' element={ <ReadMore />} />
        </Routes>
      </AuthProvider>
    
  );
}

export default App;