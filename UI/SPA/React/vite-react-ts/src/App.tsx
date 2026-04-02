// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import About from './pages/About'
import Settings from './pages/Settings'
import { Counter } from './pages/Counter'
import { CrudSample } from './pages/CrudSample'
import { RedirectOfAuth } from './components/RedirectOfAuth';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="body-container">
          <Sidebar />
          <main className="main-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="/crudsample" element={<CrudSample />} />
              <Route path="/RedirectEndpoint" element={<RedirectOfAuth />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

