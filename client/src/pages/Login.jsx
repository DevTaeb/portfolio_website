import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('All fields required.')
      return
    }
    setLoading(true)
    const params = new URLSearchParams({email:email, password:password})
    const response = await fetch(`/api/login?${params}`).then(res=>res.json());
      setLoading(false)
      if (response.ok) {
        navigate('/admin')
      } else {
        setError('Invalid credentials.')
      }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6" style={{ background: 'var(--background)' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
          <div style={{ borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', marginLeft: '0.5rem', letterSpacing: '0.08em' }}>
              taeb.dev — admin login
            </span>
          </div>

          <div style={{ padding: '2rem 1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Authentication required
            </p>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
              Admin Login
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@login"
                  autoComplete="email"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-mono-custom)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-mono-custom)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              {error && (
                <div style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: '#ff6b6b', border: '1px solid #ff6b6b33', padding: '0.5rem 0.75rem', background: '#ff6b6b0a' }}>
                  ✕ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: loading ? 'var(--muted)' : 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  fontFamily: 'var(--font-mono-custom)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.15s',
                  marginTop: '0.5rem',
                }}
                onMouseEnter={e => { if (!loading) (e.currentTarget.style.opacity = '0.85') }}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {loading ? '[ authenticating... ]' : '[ sign in ]'}
              </button>
            </form>

          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            ← Back to portfolio
          </button>
        </div>
      </div>
    </div>
  )
}
