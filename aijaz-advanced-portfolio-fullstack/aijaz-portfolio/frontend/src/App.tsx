import { Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProjectDetails from './pages/ProjectDetails';
import Recruiter from './pages/Recruiter';
export default function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/projects/:id" element={<ProjectDetails/>}/><Route path="/recruiter" element={<Recruiter/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<NotFound/>}/></Routes>}
