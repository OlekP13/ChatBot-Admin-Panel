import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import HomePage from './pages/HomePage';
import ProjectList from './pages/ProjectList';
import ChatBotAdminPanel from './pages/ChatBotAdminPanel';
import ChatBotEdit from './pages/ChatBotEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<HomePage/>} />
        <Route path='/list'  element={<ProjectList/>} />
        <Route path='/create'  element={<ChatBotAdminPanel/>} />
        <Route path='/edit/:id'  element={<ChatBotEdit/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
