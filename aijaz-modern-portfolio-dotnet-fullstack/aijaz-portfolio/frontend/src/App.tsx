import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProjectDetails from './pages/ProjectDetails';
export default function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/projects/:id" element={<ProjectDetails/>}/><Route path="/admin" element={<Admin/>}/></Routes>}
