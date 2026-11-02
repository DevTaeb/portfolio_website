import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TECH_OPTIONS = [
  'Go', 'Rust', 'TypeScript', 'Python', 'Java', 'C++',
  'React', 'Next.js', 'Vue', 'Node.js',
  'PostgreSQL', 'Redis', 'ClickHouse', 'MongoDB',
  'Kubernetes', 'Docker', 'AWS'
]

export default function CreateProject() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    long_desc: '',
    live_url: '',
    repo_url: '',
    year: new Date().getFullYear().toString(),
    status: 'In Progress',
    featured: false,
    image_url: '',
    tech: ''
  })
  const [selectedTech, setSelectedTech] = useState([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleTech = (t) =>
    setSelectedTech(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value, }))

  const handleSubmit = async (e) => {
    form.tech = selectedTech;
    e.preventDefault();
    const response = await fetch(`/api/create-project/`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      }).then(res => res.json());
    setSaving(true)
    if (response.ok) {
      setSaving(false); setSaved(true); navigate('/admin');
    } else {
      setSaved(false);
    }
  }

  if (saved) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono-custom)' }}>
          <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>✓</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Project created. Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Admin</p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Create Project</h1>
        </div>
        <button
          onClick={() => navigate('/admin')}
          style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', background: 'none', border: '1px solid var(--border)', padding: '6px 12px', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.15s' }}
          onMouseEnter={e => { (e.currentTarget.style.borderColor = 'var(--muted-foreground)'); (e.currentTarget.style.color = 'var(--foreground)') }}
          onMouseLeave={e => { (e.currentTarget.style.borderColor = 'var(--border)'); (e.currentTarget.style.color = 'var(--muted-foreground)') }}
        >
          ← Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ border: '1px solid var(--border)', background: 'var(--card)' }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '0.75rem 1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.65rem', color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>new-project.json</span>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title */}
          <Field label="Project Title *">
            <input
              required
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Distributed Cache Engine"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          {/* Short description */}
          <Field label="Short Description *">
            <input
              required
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="One-line summary shown in cards"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          {/* Long description */}
          <Field label="Full Description">
            <textarea
              value={form.long_desc}
              onChange={e => handleChange('long_desc', e.target.value)}
              placeholder="Detailed project description, architecture decisions, results..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Live URL">
              <input
                type="url"
                value={form.live_url}
                onChange={e => handleChange('live_url', e.target.value)}
                placeholder="https://..."
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </Field>
            <Field label="Repository URL">
              <input
                type="url"
                value={form.repo_url}
                onChange={e => handleChange('repo_url', e.target.value)}
                placeholder="https://github.com/..."
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Year">
              <input
                value={form.year}
                onChange={e => handleChange('year', e.target.value)}
                placeholder="2026"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={e => handleChange('status', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                {['In Progress', 'Production', 'Open Source', 'Archived', 'Concept'].map(s => (
                  <option key={s} value={s} style={{ background: 'var(--background)' }}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Image URL">
            <input
              type="url"
              value={form.image_url}
              onChange={e => handleChange('image_url', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </Field>

          {/* Tech stack */}
          <Field label={`Tech Stack (${selectedTech.length} selected)`}>
            <div className="flex flex-wrap gap-2 mt-1">
              {TECH_OPTIONS.map(t => {
                const active = selectedTech.includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTech(t)}
                    style={{
                      fontFamily: 'var(--font-mono-custom)',
                      fontSize: '0.65rem',
                      padding: '3px 10px',
                      border: '1px solid',
                      borderColor: active ? 'var(--primary)' : 'var(--border)',
                      color: active ? 'var(--primary)' : 'var(--muted-foreground)',
                      background: active ? 'var(--primary)15' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </Field>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleChange('featured', !form.featured)}
              style={{
                width: 18,
                height: 18,
                border: '1px solid',
                borderColor: form.featured ? 'var(--primary)' : 'var(--border)',
                background: form.featured ? 'var(--primary)' : 'transparent',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
            <label style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.72rem', color: 'var(--muted-foreground)', cursor: 'pointer', userSelect: 'none' }}
              onClick={() => handleChange('featured', !form.featured)}>
              Feature on portfolio homepage
            </label>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', letterSpacing: '0.1em', padding: '8px 16px', border: '1px solid var(--border)', color: 'var(--muted-foreground)', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.15s' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.7rem', letterSpacing: '0.1em', padding: '8px 20px', background: saving ? 'var(--muted)' : 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', textTransform: 'uppercase', transition: 'opacity 0.15s' }}
          >
            {saving ? 'Saving...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ fontFamily: 'var(--font-mono-custom)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  background: 'var(--background)',
  border: '1px solid var(--border)',
  color: 'var(--foreground)',
  fontFamily: 'var(--font-mono-custom)',
  fontSize: '0.8rem',
  outline: 'none',
  transition: 'border-color 0.15s',
}
