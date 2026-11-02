import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <header
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--background)' }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="font-mono text-sm tracking-widest uppercase"
            style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono-custom)', letterSpacing: '0.15em' }}
          >
            devTaeb
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-mono-custom)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                })}
                onMouseEnter={e => { if (!(e.currentTarget).getAttribute('aria-current')) (e.currentTarget).style.color = 'var(--foreground)' }}
                onMouseLeave={e => { if (!(e.currentTarget).getAttribute('aria-current')) (e.currentTarget).style.color = 'var(--muted-foreground)' }}
              >
                {label}
              </NavLink>
            ))}
            <button
              onClick={() => navigate('/login')}
              className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 transition-all duration-150"
              style={{
                fontFamily: 'var(--font-mono-custom)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                border: '1px solid var(--border)',
                color: 'var(--muted-foreground)',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget).style.borderColor = 'var(--primary)'
                  ; (e.currentTarget).style.color = 'var(--primary)'
              }}
              onMouseLeave={e => {
                (e.currentTarget).style.borderColor = 'var(--border)'
                  ; (e.currentTarget).style.color = 'var(--muted-foreground)'
              }}
            >
              Admin
            </button>
          </nav>

          <button
            className="md:hidden"
            style={{ color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--card)' }} className="md:hidden px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-mono-custom)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--primary)' : 'var(--foreground)',
                  textDecoration: 'none',
                })}
              >
                {label}
              </NavLink>
            ))}
            <button
              onClick={() => { setMenuOpen(false); navigate('/login') }}
              style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
            >
              Admin Login
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer style={{ borderTop: '1px solid var(--border)' }} className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>
            © 2026 TAEB EBIETANMI — BUILT WITH REACT + VITE
          </span>
          <div className="flex gap-6">
            {[['Github', 'https://github.com/ebietanmi'], ['LinkedIn', 'https://linkedin.com/in/ebietanmi'], ['Twitter', 'https://x.com/ebietanmi']].map((s) => (
              <a key={s[0]} href={`${s[1]}`} style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >{s[0]}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
