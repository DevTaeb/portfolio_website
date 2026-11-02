import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import CreateProject from './pages/CreateProject'
import CreateBlog from './pages/CreateBlog'

function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' }}>
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--primary)', textTransform: 'uppercase' }}>
            taeb.dev / admin
          </span>
          <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', letterSpacing: '0.08em' }}>
            taeb.dev
          </span>
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Portfolio /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route
          path="/admin"
          element={<AdminLayout><AdminDashboard /></AdminLayout>}
        />
        <Route
          path="/admin/create-project"
          element={<AdminLayout><CreateProject /></AdminLayout>}
        />
        <Route
          path="/admin/create-blog"
          element={<AdminLayout><CreateBlog /></AdminLayout>}
        />
      </Routes>
    </BrowserRouter>
  )
}
