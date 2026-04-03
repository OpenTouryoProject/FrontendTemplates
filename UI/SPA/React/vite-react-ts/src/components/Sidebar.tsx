// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
        About
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
        Settings
      </NavLink>
      <NavLink to="/counter" className={({ isActive }) => isActive ? 'active' : ''}>
        Counter
      </NavLink>
      <NavLink to="/fetchdata" className={({ isActive }) => isActive ? 'active' : ''}>
        FetchData
      </NavLink>
      <NavLink to="/crudsample" className={({ isActive }) => isActive ? 'active' : ''}>
        CrudSample
      </NavLink>
      <NavLink to="/crudsample2" className={({ isActive }) => isActive ? 'active' : ''}>
        CrudSample2
      </NavLink>
    </nav>
  )
}